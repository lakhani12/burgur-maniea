import React, { useState, useEffect, Fragment } from "react";
import pizza from "../apis/pizza";
import SideBarA from "../components/SideBarA";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import EditableProductRow from "../components/EditableProductRow";

const AdminProductsList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const user = useSelector((state) => state.user.user);

    const [editProductId, setEditProductId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
        category: "",
        price: "",
        image: "",
    });

    const getProducts = async () => {
        try {
            const { data } = await pizza.get("/api/products/admin", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setProducts(data);
            setMessage(`Success! Loaded ${data.length} products.`);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products", error);
            setMessage(`FAIL: ${error.message} - ${error.response?.data?.message || 'Unknown network error'}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.isAdmin) {
            getProducts();
        } else {
            setLoading(false);
            if (!user) {
                setMessage("Please log in to view products.");
            } else {
                setMessage("You do not have Admin privileges to view this page.");
            }
        }
    }, [user]);

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const { data } = await pizza.delete(`/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setMessage(data.message);
                getProducts();
            } catch (error) {
                console.error("Error deleting product", error);
                setMessage(error.response?.data?.message || "Failed to delete product.");
            }
        }
    };

    const handleEditClick = (event, product) => {
        event.preventDefault();
        setEditProductId(product._id);
        const formValues = {
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
        };
        setEditFormData(formValues);
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
        const editedProduct = {
            name: editFormData.name,
            category: editFormData.category,
            price: Number(editFormData.price),
            image: editFormData.image,
        };
        try {
            await pizza.put(`/api/products/${editProductId}`, editedProduct, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setMessage("Product updated successfully!");
            getProducts();
            setEditProductId(null);
        } catch (error) {
            console.error("Error updating product", error);
            setMessage("Failed to update product.");
        }
    };

    const handleCancelClick = () => {
        setEditProductId(null);
    };

    return (
        <>
            <SideBarA />
            <div className="mainarea admin">
                <Header />
                <div className="all-orders-area">
                    <h2>Admin Products List</h2>
                    {message && <div style={{ color: message.includes("success") || message.includes("Deleted") || message.includes("Updated") ? "green" : "red", margin: "10px 0", fontWeight: "bold" }}>{message}</div>}

                    <div className="display-orders" style={{ display: 'block' }}>
                        {loading ? (
                            <p>Loading products...</p>
                        ) : products.length > 0 ? (
                            <form onSubmit={handleEditFormSubmit}>
                                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
                                            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Image</th>
                                            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Name</th>
                                            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Category</th>
                                            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Price</th>
                                            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <Fragment key={product._id}>
                                                {editProductId === product._id ? (
                                                    <EditableProductRow
                                                        editFormData={editFormData}
                                                        handleEditFormChange={handleEditFormChange}
                                                        handleCancelClick={handleCancelClick}
                                                    />
                                                ) : (
                                                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                                                        <td style={{ padding: "10px" }}>
                                                            <img src={product.image} alt={product.name} loading="lazy" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
                                                        </td>
                                                        <td style={{ padding: "10px" }}>{product.name}</td>
                                                        <td style={{ padding: "10px" }}>{product.category || 'N/A'}</td>
                                                        <td style={{ padding: "10px" }}>₹{product.price}</td>
                                                        <td style={{ padding: "10px" }}>
                                                            <button
                                                                type="button"
                                                                onClick={(event) => handleEditClick(event, product)}
                                                                style={{
                                                                    backgroundColor: "#2196F3",
                                                                    color: "white",
                                                                    border: "none",
                                                                    padding: "8px 12px",
                                                                    borderRadius: "4px",
                                                                    cursor: "pointer",
                                                                    marginRight: "5px"
                                                                }}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => deleteProduct(product._id)}
                                                                style={{
                                                                    backgroundColor: "#ff4d4f",
                                                                    color: "white",
                                                                    border: "none",
                                                                    padding: "8px 12px",
                                                                    borderRadius: "4px",
                                                                    cursor: "pointer"
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </form>
                        ) : (
                            <h3>No Products Found!</h3>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminProductsList;
