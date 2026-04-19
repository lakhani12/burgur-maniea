import React, { useState, useEffect, Fragment } from "react";
import SideBarA from "../components/SideBarA";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import pizza from "../apis/pizza";
import "../styles/deliverymen.css";
import ReadOnlyRowD from "../components/ReadOnlyRowD";
import EditableRow from "../components/EditableRow";

const Delivery = () => {
  const [contacts, setContacts] = useState([]);
  const user = useSelector((state) => state.user.user);

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

  const fetchDeliveryMen = async () => {
    try {
      if (user && user.isAdmin) {
        const { data } = await pizza.get("/api/deliverymen", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setContacts(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDeliveryMen();
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
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };
    try {
      await pizza.post("/api/deliverymen", newContact, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchDeliveryMen();
      setAddFormData({ fullName: "", address: "", phoneNumber: "", email: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const editedContact = {
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };
    try {
      await pizza.put(`/api/deliverymen/${editContactId}`, editedContact, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchDeliveryMen();
      setEditContactId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact._id);

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

  const handleDeleteClick = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this delivery man?")) {
      try {
        await pizza.delete(`/api/deliverymen/${contactId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        fetchDeliveryMen();
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

        <h1 style={{ textAlign: "center" }}>List of Delivery Man</h1>

        <div className="app-container">
          <form onSubmit={handleEditFormSubmit}>
            <table>
              <thead>
                <tr id="abc">
                  <th style={{ backgroundColor: "#810CA8" }}>Name</th>
                  <th style={{ backgroundColor: "#810CA8" }}>Address</th>
                  <th style={{ backgroundColor: "#810CA8" }}>Mobile Number</th>
                  <th style={{ backgroundColor: "#810CA8" }}>Gmail</th>
                  <th style={{ backgroundColor: "#810CA8" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <Fragment key={contact._id}>
                    {editContactId === contact._id ? (
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
            <input style={{ backgroundColor: "white" }}
              type="text"
              name="fullName"
              required="required"
              placeholder="Full Name "
              value={addFormData.fullName}
              onChange={handleAddFormChange}
            />
            <input style={{ backgroundColor: "white" }}
              type="text"
              name="address"
              required="required"
              placeholder="Address"
              value={addFormData.address}
              onChange={handleAddFormChange}
            />
            <input style={{ backgroundColor: "white" }}
              type="text"
              name="phoneNumber"
              required="required"
              placeholder="Mobile Number"
              value={addFormData.phoneNumber}
              onChange={handleAddFormChange}
            />
            <input style={{ backgroundColor: "white" }}
              type="email"
              name="email"
              required="required"
              placeholder="Gmail"
              value={addFormData.email}
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
