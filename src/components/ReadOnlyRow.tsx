import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useMutation } from "react-query";

interface Contact {
  id: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
}

interface ReadOnlyRowProps {
  contact: Contact;
  index: number;
  handleEditClick: (event: React.MouseEvent, contact: Contact) => void;
  togglePopup: () => void;
  setRow: (row: string) => void;
  setdeletingContactName: (name: string) => void;
}

const ReadOnlyRow: React.FC<ReadOnlyRowProps> = ({
  contact,
  index,
  handleEditClick,
  togglePopup,
  setRow,
  setdeletingContactName,
}) => {

  // delete contact
  const deleteContact = async (contact: Contact) => {
      setdeletingContactName(contact.name);
      setRow("ReadOnlyRow");
      togglePopup();

      const token = Cookies.get("jwtToken"); // Retrieve the JWT token from cookies
      const headers = { Authorization: `Bearer ${token}` }; // Set the Authorization header

      await axios.delete(`http://localhost:3000/contacts/${contact.id}`, {
        headers,
      });
      console.log(`${contact.name} deleted}`);
  };

  const mutation = useMutation(deleteContact)

  const onClickDelete = async (e: React.MouseEvent, contact: Contact) => {
    mutation.mutate(contact);
  };

  return (
    <tr className="bg-white border-b hover:text-[#083F46]" key={index}>
      <td className="flex justify-center px-2">
        {contact.gender === "female" ? (
          <img src="/img/girl.png" width={40} height={40} />
        ) : (
          <img src="/img/boy.png" width={40} height={40} />
        )}
      </td>
      <td className="px-6 py-4 font-medium text-[#083F46] whitespace-nowrap">
        {contact.name}
      </td>
      <td className="px-6 py-4">{contact.gender}</td>
      <td className="px-6 py-4">{contact.email}</td>
      <td className="px-6 py-4">{contact.phone}</td>
      <td className="px-6 py-4">
        <button type="button" onClick={(e) => handleEditClick(e, contact)}>
          <img
            src={"/img/material-symbols_edit-rounded.svg"}
            width={20}
            height={20}
          />
        </button>
      </td>
      <td className="px-6 py-4">
        <button type="button" onClick={(e) => onClickDelete(e, contact)}>
          <img
            src={"/img/material-symbols_delete-outline.svg"}
            width={20}
            height={20}
          />
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
