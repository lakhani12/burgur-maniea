import React, { useState } from "react";
import "../styles/sidebar.css";
import { FaHome, FaBoxOpen, FaPizzaSlice, FaTimes } from "react-icons/fa";
import { BsHeartHalf, BsGear } from "react-icons/bs";
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
    <div className={`sidebar  ${show && "showSideBar"}`}>
      <div className="close" onClick={() => dispatch(showSideBar(false))}>
        <FaTimes />
      </div>
      <div className="top-icons">
        
        <Link to="/">
          <div className={`icon side ${path === "/" && "active"}`}>
            <FaHome />
          </div>
          {/* <h3 className="side">Home</h3> */}
        </Link>
        <Link to="/orders">
          <div className={`icon ${path === "/orders" && "active"}`}>
            <FaBoxOpen />
          </div>
          {/* <h3 className="side">Order</h3> */}
        </Link>
        <Link to="/wishlist">
          {" "}
          <div className={`icon ${path === "/wishlist" && "active"}`}>
            <BsHeartHalf />
          </div>
          {/* <h3 className="side">Wishlist</h3> */}
        </Link>

        <Link to="/custom-pizza">
          <div className={`icon ${path === "/custom-pizza" && "active"}`}>
            <FaPizzaSlice />
          </div>
          {/* <h3 className="side">Pizza</h3> */}
        </Link>

        <Link to="/your-address">
          {" "}
          <div className={`icon ${path === "/your-address" && "active"}`}>
            <CgFileDocument />
          </div>
          {/* <h3 className="side">Address</h3> */}
        </Link>

        <Link to="/profile">
          <div className={`icon ${path === "/profile" && "active"}`}>
            <BsGear />
          </div>
          {/* <h3 className="side">Profile </h3> */}
        </Link>
      </div>
      <div className="bottom-icon">
        {user && (
          <div className="icon" onClick={handleSignOut}>
            <FiLogOut />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
