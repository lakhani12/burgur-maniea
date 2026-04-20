import React from "react";

const EditableUserRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter name..."
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
          style={{ width: "100%" }}
        />
      </td>
      <td>
        <input
          type="email"
          required="required"
          placeholder="Enter email..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
          style={{ width: "100%" }}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="Enter mobile..."
          name="mobNo"
          value={editFormData.mobNo || ""}
          onChange={handleEditFormChange}
          style={{ width: "100%" }}
        />
      </td>
      <td>
        {/* We keep admin toggle separate as an explicit button from the other UI */}
        <span>{editFormData.isAdmin ? "Admin" : "User"}</span>
      </td>
      <td>
        <button type="submit" style={{ marginRight: "10px", backgroundColor: "#2ecc71" }}>
          Save
        </button>
        <button type="button" onClick={handleCancelClick} style={{ backgroundColor: "#95a5a6" }}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableUserRow;
