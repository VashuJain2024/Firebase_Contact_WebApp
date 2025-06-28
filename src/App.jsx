import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          // console.log(contactLists);
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      // console.log(contactLists);
      const filteredContacts = contactLists.filter((contact) => {
        return contact.name.toLowerCase().includes(value.toLowerCase());
      });
      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px]">
        <Navbar />
        <Search
          contacts={contacts}
          onOpen={onOpen}
          filterContacts={filterContacts}
        />
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
