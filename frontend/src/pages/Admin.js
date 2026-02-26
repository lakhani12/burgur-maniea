
import React, { useState, Fragment } from "react";
import SideBarA from "../components/SideBarA";
import Header from "../components/Header";
import "../styles/admin.css";

import { nanoid } from "nanoid";
import data from "../data/productcat.json";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRowP from "../components/EditableRowP";

const Admin = () => {
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
        
        <h1 style={{ textalign: "center" }}>Product Category</h1>
        
        <div className="app-container">
            
          <form onSubmit={handleEditFormSubmit} >
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price Range ₹</th>
                  <th>Desc</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <Fragment>
                    {editContactId === contact.id ? (
                      <EditableRowP
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
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

          <h2>Add a Product Cate..</h2>
          <form onSubmit={handleAddFormSubmit}>
            <input style={{backgroundColor: "white"}}
              type="text"
              name="fullName"
              required="required"
              placeholder="Product Name"
              onChange={handleAddFormChange}
            />
            <input style={{backgroundColor: "white"}}
              type="text"
              name="address"
              required="required"
              placeholder="Price"
              onChange={handleAddFormChange}
            />
            <input style={{backgroundColor: "white"}}
              type="text"
              name="phoneNumber"
              required="required"
              placeholder="Desc"
              onChange={handleAddFormChange}
            />
            <input style={{backgroundColor: "white"}}
              type="text"
              name="email"
              required="required"
              placeholder="Category"
              onChange={handleAddFormChange}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>

      
    </>
  );
};

export default Admin;