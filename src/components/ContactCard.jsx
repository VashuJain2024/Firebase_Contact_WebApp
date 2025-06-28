import { deleteDoc, doc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import useDisclouse from "../hooks/useDisclouse";
import AddAndUpdateContact from "./AddAndUpdateContact";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onOpen, onClose } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await deleteDoc(contactRef);
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="flex items-center justify-between rounded-lg bg-[#FFEAAE] p-2"
      >
        <div className="flex gap-1">
          <HiOutlineUserCircle className="text-4xl text-orange-700" />
          <div className="">
            <h2 className="text-b font-medium">{contact.name}</h2>
            <p className="text-sm text-gray-600">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            className="text-orange cursor-pointer text-orange-700"
            onClick={() => deleteContact(contact.id)}
          />
        </div>
      </div>
      <AddAndUpdateContact
        isOpen={isOpen}
        onClose={onClose}
        isUpdate
        contact={contact}
      />
    </>
  );
};

export default ContactCard;
