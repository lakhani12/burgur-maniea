import React, { useState, useEffect, Fragment } from "react";
import SideBarA from "../components/SideBarA";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import pizza from "../apis/pizza";
import "../styles/admin.css";

import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRowP from "../components/EditableRowP";

const Admin = () => {
  const [contacts, setContacts] = useState([]);
  const user = useSelector((state) => state.user.user);

  const [addFormData, setAddFormData] = useState({
    name: "",
    priceRange: "",
    description: "",
    categoryName: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    priceRange: "",
    description: "",
    categoryName: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const fetchCategories = async () => {
    try {
      if (user && user.isAdmin) {
        const { data } = await pizza.get("/api/categories", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setContacts(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [user]);

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

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
    const newContact = {
      name: addFormData.name,
      priceRange: addFormData.priceRange,
      description: addFormData.description,
      categoryName: addFormData.categoryName,
    };
    try {
      await pizza.post("/api/categories", newContact, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchCategories();
      setAddFormData({ name: "", priceRange: "", description: "", categoryName: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const editedContact = {
      name: editFormData.name,
      priceRange: editFormData.priceRange,
      description: editFormData.description,
      categoryName: editFormData.categoryName,
    };
    try {
      await pizza.put(`/api/categories/${editContactId}`, editedContact, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchCategories();
      setEditContactId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact._id);

    const formValues = {
      name: contact.name,
      priceRange: contact.priceRange,
      description: contact.description,
      categoryName: contact.categoryName,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await pizza.delete(`/api/categories/${contactId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        fetchCategories();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <SideBarA />
      <div className="mainarea admin ">
        <Header />

        <h1 style={{ textAlign: "center" }}>Product Category</h1>

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
                  <Fragment key={contact._id}>
                    {editContactId === contact._id ? (
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

          <h2>Add a Product Cat.</h2>
          <form onSubmit={handleAddFormSubmit}>
            <input style={{ backgroundColor: "white" }}
              type="text"
              name="name"
              required="required"
              placeholder="Product Name"
              value={addFormData.name}
              onChange={handleAddFormChange}
            />
            <input style={{ backgroundColor: "white" }}
              type="text"
              name="priceRange"
              required="required"
              placeholder="Price Range"
              value={addFormData.priceRange}
              onChange={handleAddFormChange}
            />
            <input style={{ backgroundColor: "white" }}
              type="text"
              name="description"
              required="required"
              placeholder="Desc"
              value={addFormData.description}
              onChange={handleAddFormChange}
            />
            <input style={{ backgroundColor: "white" }}
              type="text"
              name="categoryName"
              required="required"
              placeholder="Category"
              value={addFormData.categoryName}
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