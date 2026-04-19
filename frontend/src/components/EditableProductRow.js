import React from "react";

const EditableProductRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    return (
        <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "10px" }}>
                <input
                    type="text"
                    required="required"
                    placeholder="Image URL..."
                    name="image"
                    value={editFormData.image}
                    onChange={handleEditFormChange}
                />
            </td>
            <td style={{ padding: "10px" }}>
                <input
                    type="text"
                    required="required"
                    placeholder="Name..."
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td style={{ padding: "10px" }}>
                <input
                    type="text"
                    required="required"
                    placeholder="Category..."
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditFormChange}
                />
            </td>
            <td style={{ padding: "10px" }}>
                <input
                    type="number"
                    required="required"
                    placeholder="Price..."
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditFormChange}
                />
            </td>
            <td style={{ padding: "10px" }}>
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginRight: "5px"
                    }}
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={handleCancelClick}
                    style={{
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Cancel
                </button>
            </td>
        </tr>
    );
};

export default EditableProductRow;
