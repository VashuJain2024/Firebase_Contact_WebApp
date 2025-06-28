import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
});

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactsRef = collection(db, "contacts");
      await addDoc(contactsRef, contact);
      onClose();
      toast.success("Contact added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactsRef = doc(db, "contacts", id);
      await updateDoc(contactsRef, contact);
      onClose();
      toast.success("Contact updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? { name: contact.name, email: contact.email }
              : { name: "", email: "" }
          }
          onSubmit={(values) => {
            // console.log(values);
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name : </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Enter your Name..."
                className="h-10 border p-2"
                autoComplete="on"
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email : </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your Email..."
                className="h-10 border p-2"
                autoComplete="on"
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button
              className="self-end border bg-[#FFEAAE] px-3 py-1.5"
              type="submit"
            >
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default AddAndUpdateContact;
