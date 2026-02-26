import React, { useState, Fragment } from "react";
import SideBarA from "../components/SideBarA";
import Header from "../components/Header";


import "../styles/deliverymen.css";
import { nanoid } from "nanoid";
import data from "../data/mock-data.json";
import ReadOnlyRowD from "../components/ReadOnlyRowD";
import EditableRow from "../components/EditableRow";

const Delivery = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });


  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <>
      <SideBarA />
      <div className="mainarea admin ">
        <Header /> 
        
        <h1 style={{ textalign: "center" }}>List of Delivery Man</h1>
        
        <div className="app-container">
          <form onSubmit={handleEditFormSubmit}>
            <table>
              <thead>
                <tr id="abc">
                  <th style={{backgroundColor:"#810CA8"}}>Name</th>
                  <th style={{backgroundColor:"#810CA8"}}>Address</th>
                  <th style={{backgroundColor:"#810CA8"}}>Mobile Number</th>
                  <th style={{backgroundColor:"#810CA8"}}>Gmail</th>
                  <th style={{backgroundColor:"#810CA8"}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <Fragment>
                    {editContactId === contact.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRowD
                        contact={contact}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>

          <h2>Add a Delivery Man</h2>
          <form onSubmit={handleAddFormSubmit}>
            <input style={{backgroundColor: "white"}}
              type="text"
              name="fullName"
              required="required"
              placeholder="Full Name "
              onChange={handleAddFormChange}
            />
            <input style={{backgroundColor: "white"}}
              type="text"
              name="address"
              required="required"
              placeholder="Address"
              onChange={handleAddFormChange}
            />
            <input style={{backgroundColor: "white"}}
              type="text"
              name="phoneNumber"
              required="required"
              placeholder="Mobile Number"
              onChange={handleAddFormChange}
            />
            <input style={{backgroundColor: "white"}}
              type="email"
              name="email"
              required="required"
              placeholder="Gmail"
              onChange={handleAddFormChange}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>

      
    </>
  );
};

export default Delivery;
