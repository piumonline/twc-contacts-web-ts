import React, { useState, useEffect } from "react";
import axios from "axios";
import Logout from "../components/Logout";
import EditableRow from "../components/EditableRow";
import ReadOnlyRow from "../components/ReadOnlyRow";
import AddContact from "../components/AddContact";
import PopupWindow from "../components/PopupWindow";
import Cookies from "js-cookie";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
}

function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editContactId, setEditContactId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [row, setRow] = useState<string>(""); // table view type state
  const [deletingContactName, setDeletingContactName] = useState<string>("");

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleConfirm = () => {
    setShowPopup(false);
    //  delete logic
  };

  const handleEditClick = (event: React.MouseEvent, contact: Contact) => {
    event.preventDefault();
    setEditContactId(contact.id);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  useEffect(() => {
    const getAllContact = async () => {
      try {
        const token = Cookies.get("jwtToken"); // Retrieve the JWT token from cookies
        const headers = { Authorization: `Bearer ${token}` }; // Set the Authorization header

        const response = await axios.get<Contact[]>("http://localhost:3000/contacts/",{ headers }); // send with authorization headers
        setContacts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllContact();
  }, []);

  useEffect(() => {
    // Add any logic that needs to be executed when contacts change
  }, [contacts]);

  return (
      <div className="background_home min-h-screen">
  <section className="flex h-screen flex-col">
    {/* <Logo /> */}
    <div className="grow flex-col px-[204px] flex justify-center">
    <div className="flex gap-1 flex-col">
      <div className="mb-20 lg:mb-[23px] flex flex-col lg:flex-row justify-between h-16 items-center ">
        <h2 className="mb-6 lg:my-[23px] text-slate-50 md:text-5xl font-bold leading-8 font-FutuBold flex text-center items-center justify-center">
          Contacts
        </h2>
        <div>
          <AddContact name="add new contact" />
        </div>
      </div>
      <div className="bg-white md:rounded-3xl w-full md:px-4 py-4 text-primary h-[45vh] overflow-y-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
            <form>
              <table className="w-full text-sm text-left text-[#083F46]">
                <thead className="text-[#083F46] uppercase bg-white">
                  <tr>
                    <th></th>
                    <th scope="col" className="px-6 py-3">
                      full name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      gender
                    </th>
                    <th scope="col" className="px-6 py-3">
                      email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      phone
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* map through the contacts array and render the ReadOnlyRow component
                      if the editContactId is not equal to the contact id, otherwise render the EditableRow component */}
                  {contacts.map((contact, index) => (
                    <React.Fragment key={contact.id}>
                      {editContactId === contact.id ? (
                        <EditableRow
                          contact={contact}
                          handleCancelClick={handleCancelClick}
                          togglePopup={togglePopup}
                          setRow={setRow}
                          confirm={true} 
                        />
                      ) : (
                        <ReadOnlyRow
                          contact={contact}
                          index={index}
                          handleEditClick={handleEditClick}
                          togglePopup={togglePopup}
                          setRow={setRow}
                          setdeletingContactName={setDeletingContactName}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
      {showPopup && (
        <PopupWindow
          isVisible={showPopup}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          deletingContactName={deletingContactName}
          tableRow={row}
        />
      )}
    </div>
        </div>
    <Logout/>
  </section>
</div>
  );
}

//   return(
//   <main className="background_home min-h-screen">
//   <section className="flex h-screen flex-col">
//     {/* <Logo /> */}
//     <div className="grow flex-col px-[204px] flex justify-center">
//     <div className="flex gap-1 flex-col">
//       <div className="mb-20 lg:mb-[23px] flex flex-col lg:flex-row justify-between h-16 items-center ">
//         <h2 className="mb-6 lg:my-[23px] text-slate-50 md:text-5xl font-bold leading-8 font-FutuBold flex text-center items-center justify-center">
//           Contacts
//         </h2>
//         <div>
//           {/* <AddContactButton currentPage="contacts" /> */}
//         </div>
//       </div>
//       <div className="bg-white md:rounded-3xl w-full  md:px-4 py-4 text-primary  h-[45vh]  overflow-y-auto ">
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//           <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
//             <table className="w-full text-sm text-left text-[#083F46]">
//               <thead className="text-xstext-[#083F46] uppercase bg-white">
//                 <tr>
//                   <th scope="col" className="px-6 py-3">
//                     full name
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     gender
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     email
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     phone
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {contacts.map((contact, index) => (
//                   <tr
//                     className="bg-white border-b hover:text-[#083F46]"
//                     key={index}
//                   >
//                     <td className="px-6 py-4 font-medium text-[#083F46] whitespace-nowrap">
//                       {contact.name}
//                     </td>
//                     <td className="px-6 py-4">{contact.gender}</td>
//                     <td className="px-6 py-4">{contact.email}</td>
//                     <td className="px-6 py-4">{contact.phone}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
      
//     </div>
//     <Logout/>
//   </section>
// </main>
//   )


export default Contacts