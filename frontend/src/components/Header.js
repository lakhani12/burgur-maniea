import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiMenuAlt1 } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts, showSideBar } from "../actions";
import Spinner from "./Spinner";
import bgicon from '../assests/burger-icon.png'

const Header = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const myStyle = {
    width: "80px",
    height: "80px",  
  
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchProducts(name));
    navigate(`/search?=${name}`);

    
  };
  return (
    <div className="header">
      <div className="logo">
        <div className="burger" onClick={() => dispatch(showSideBar(true))}>
          <HiMenuAlt1 />
        </div>

        <Link to="/"><img style={myStyle} src={bgicon} alt="" /></Link>

      </div>
      {/* <form onSubmit={handleSearch} className="search-bar">
        <div className="input">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Search For Food"
          />
          {search?.loading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <FiSearch onClick={handleSearch} />
          )}
        </div>
      </form> */}
    </div>
  );
};

export default Header;
