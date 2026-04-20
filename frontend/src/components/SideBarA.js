import React, { useState } from "react";
import "../styles/sidebar.css";
import { FaHome, FaBoxOpen, FaTimes, FaPlus, FaPersonBooth, FaUsers } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { showSideBar } from "../actions";

const SideBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const show = useSelector((state) => state.sidebar.show);

  const location = useLocation();
  const path = location.pathname;

  const handleSignOut = () => {
    dispatch(logout());
  };
  return (
    <div className={`sidebar ${show ? "showSideBar" : ""}`}>
      <div className="close" onClick={() => dispatch(showSideBar(false))}>
        <FaTimes />
      </div>
      <div className="top-icons">
        <Link to="/admin-side">
          <div className={`icon ${path === "/admin-side" ? "active" : ""}`} title="Product Categories">
            <FaHome />
          </div>
        </Link>

        <Link to="/admin-orders">
          <div className={`icon ${path === "/admin-orders" ? "active" : ""}`} title="Orders">
            <FaBoxOpen />
          </div>
        </Link>

        <Link to="/admin-products">
          <div className={`icon ${path === "/admin-products" ? "active" : ""}`} title="Products List">
            <CgFileDocument />
          </div>
        </Link>

        <Link to="/add-product">
          <div className={`icon ${path === "/add-product" ? "active" : ""}`} title="Add Product">
            <FaPlus />
          </div>
        </Link>

        <Link to="/delivery-men">
          <div className={`icon ${path === "/delivery-men" ? "active" : ""}`} title="Delivery Men">
            <FaPersonBooth />
          </div>
        </Link>

        <Link to="/admin-users">
          <div className={`icon ${path === "/admin-users" ? "active" : ""}`} title="User Management">
            <FaUsers />
          </div>
        </Link>

        {/* <Link to="/">
          {" "}
          <div className={`icon ${path === "/" && "active"}`}>
            < />
          </div>
        </Link>

        <Link to="/">
          <div className={`icon ${path === "/" && "active"}`}>
            <BsGear />
          </div>
        </Link> */}

      </div>
      <Link to="/">
        <div className="bottom-icon">
          <div className="icon" onClick={handleSignOut}>
            <FiLogOut />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SideBar;
