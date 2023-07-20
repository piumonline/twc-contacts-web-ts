import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Contact {
  id?: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
}

interface EditableRowProps {
  contact: Contact;
  handleCancelClick: () => void;
  togglePopup: () => void;
  confirm: boolean;
  setRow: (row: string) => void;
}

const EditableRow: React.FC<EditableRowProps> = ({
  contact,
  handleCancelClick,
  togglePopup,
  setRow,
}) => {
  const [contactData, setContactData] = useState<Contact>({
    name: contact.name,
    gender: contact.gender,
    email: contact.email,
    phone: contact.phone,
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // handleOnChange is called when the user types in the input field
    setContactData({ ...contactData, [event.target.name]: event.target.value });
  };

  // update contact
  const handleSaveClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    contact: Contact,
  ) => {
    setRow("EditOnlyRow");
    togglePopup();

    try {
      const token = Cookies.get("jwtToken"); // Retrieve the JWT token from cookies
      const headers = { Authorization: `Bearer ${token}` }; // Set the Authorization header

      const response = await axios.put(
        `http://localhost:3000/contacts/${contact.id}`,
        {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          gender: contactData.gender,
        },
        { headers },
      );
      console.log("updated");
      handleCancelClick();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr className="bg-white border-b hover:text-[#083F46]">
      <td className="flex justify-center px-2">
        {contact.gender === "female" ? (
          <img src="/img/girl.png" width={40} height={40} />
        ) : (
          <img src="/img/boy.png" width={40} height={40} />
        )}
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          required
          value={contactData.name}
          name="name"
          onChange={handleOnChange}
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          required
          value={contactData.gender}
          name="gender"
          onChange={handleOnChange}
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          required
          value={contactData.email}
          name="email"
          onChange={handleOnChange}
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          required
          value={contactData.phone}
          name="phone"
          onChange={handleOnChange}
        />
      </td>
      <td className="px-6 py-4">
        <button type="button" onClick={(e) => handleSaveClick(e, contact)}>
          save
        </button>
      </td>
      <td className="px-6 py-4">
        <button type="button" onClick={handleCancelClick}>
          cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
