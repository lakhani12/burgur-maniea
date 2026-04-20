import React, { useState, useEffect } from "react";
import SideBarA from "../components/SideBarA";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import pizza from "../apis/pizza";
import "../styles/admin.css";
import EditableUserRow from "../components/EditableUserRow";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const currentUser = useSelector((state) => state.user.user);

  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    mobNo: "",
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      if (currentUser && currentUser.isAdmin) {
        const { data } = await pizza.get("/api/users", {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        setUsers(data);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUser]);

  const handleDeleteClick = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await pizza.delete(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        fetchUsers();
      } catch (err) {
        console.log(err);
        alert(err.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const handleToggleAdmin = async (userId) => {
    if (window.confirm("Are you sure you want to toggle the admin status for this user?")) {
      try {
        await pizza.put(
          `/api/users/${userId}/admin`,
          {},
          {
            headers: { Authorization: `Bearer ${currentUser.token}` },
          }
        );
        fetchUsers();
      } catch (err) {
        console.log(err);
        alert(err.response?.data?.message || "Failed to update user");
      }
    }
  };

  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditUserId(user._id);

    const formValues = {
      name: user.name,
      email: user.email,
      mobNo: user.mobNo || "",
      isAdmin: user.isAdmin,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditUserId(null);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await pizza.put(
        `/api/users/${editUserId}`,
        editFormData,
        {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        }
      );
      fetchUsers();
      setEditUserId(null);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to update user");
    }
  };

  return (
    <>
      <SideBarA />
      <div className="mainarea admin">
        <Header />
        <h1 style={{ textAlign: "center" }}>User Management</h1>
        
        <div className="app-container">
          {error && <p className="error" style={{color: 'red', textAlign: 'center'}}>{error}</p>}
          {loading ? (
            <p style={{textAlign: 'center'}}>Loading users...</p>
          ) : (
            <form onSubmit={handleEditFormSubmit}>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Admin Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <React.Fragment key={user._id}>
                      {editUserId === user._id ? (
                        <EditableUserRow
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <tr>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.mobNo || "N/A"}</td>
                          <td>{user.isAdmin ? "Admin" : "User"}</td>
                          <td>
                            <button
                              type="button"
                              onClick={(e) => handleEditClick(e, user)}
                              style={{ marginRight: "10px", backgroundColor: "#2ecc71" }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleAdmin(user._id)}
                              style={{ marginRight: "10px", backgroundColor: user.isAdmin ? "#f39c12" : "#3498db" }}
                            >
                              {user.isAdmin ? "Remove Admin" : "Make Admin"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteClick(user._id)}
                              style={{ backgroundColor: "#e74c3c" }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
