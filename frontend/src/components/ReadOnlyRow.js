import React from "react";

const ReadOnlyRowD = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr >
      <td>{contact.name || contact.fullName}</td>
      <td>{contact.priceRange || contact.address}</td>
      <td>{contact.description || contact.phoneNumber}</td>
      <td>{contact.categoryName || contact.email}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact._id || contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRowD;
