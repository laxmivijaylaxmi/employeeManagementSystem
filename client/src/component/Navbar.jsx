import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();  
  const navigate = useNavigate();  

  const handleLogout = () => {
    logout();  
    navigate("/login");  
  };

  return (
    <div className="flex justify-between text-white items-center h-12 bg-teal-600">
      <p className="flex-1 text-2xl text-center font-pacific">
        Welcome {user ? user.name : "Guest"}
      </p>
      <div className="flex space-x-4">
        <NavLink
          to="/home"
          className="text-white hover:bg-teal-700 hover:text-gray-200 transition-all duration-300 py-2 px-4 rounded-lg"
          activeClassName="bg-teal-700 text-gray-200"
        >
          Home
        </NavLink>
        <NavLink
          to="/employee-list"
          className="text-white hover:bg-teal-700 hover:text-gray-200 transition-all duration-300 py-2 px-4 rounded-lg"
          activeClassName="bg-teal-700 text-gray-200"
        >
          Employee List
        </NavLink>
        <button
          onClick={handleLogout}  
          className="mr-12 hover:bg-teal-700 hover:text-gray-200 transition-all duration-300 py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
