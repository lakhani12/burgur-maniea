import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr >
      <td style={{backgroundColor:"#E5B8F4"}}>{contact.fullName}</td>
      <td style={{backgroundColor:"#E5B8F4"}}>{contact.address}</td>
      <td style={{backgroundColor:"#E5B8F4"}}>{contact.phoneNumber}</td>
      <td style={{backgroundColor:"#E5B8F4"}}>{contact.email}</td>
      <td style={{backgroundColor:"#E5B8F4"}}>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
