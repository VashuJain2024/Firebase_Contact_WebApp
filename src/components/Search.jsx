import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import NotFoundContact from "./NotFoundContact";
import ContactCard from "./ContactCard";

const Search = ({ contacts, onOpen, filterContacts }) => {
  return (
    <>
      <div className="flex gap-2">
        <div className="relative flex flex-grow items-center">
          <FiSearch className="absolute ml-1 text-3xl text-white" />
          <input
            type="text"
            className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            onChange={filterContacts}
            id="search"
            autoComplete="on"
          />
        </div>
        <AiFillPlusCircle
          onClick={onOpen}
          className="cursor-pointer text-5xl text-white"
        />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {contacts.length <= 0 ? (
          <NotFoundContact />
        ) : (
          contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        )}
      </div>
    </>
  );
};

export default Search;
