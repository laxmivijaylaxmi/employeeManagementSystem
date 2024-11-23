import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaTachometerAlt,
  FaUserPlus,
  FaUsers,
  FaCalendarCheck,
  FaDollarSign,
  FaCog,
  FaDesktop,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h2 className="text-2xl text-center font-pacific">Employee MS</h2>
      </div>
      <div className="px-4">
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          to="/admin-dashboard"
        style={{ textDecoration: "none", color: "inherit" }}
      end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          to="/home"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <FaUserPlus />
          <span>Create Employee</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          to="/employee-list"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <FaUsers />
          <span>Employee List</span>
        </NavLink>

        {/*  */}

        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          to="/admin-dashboard/department"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          to="/leave"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <FaCalendarCheck />
          <span>Leave</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          to="/salary"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <FaDollarSign />
          <span>Salary</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          to="/settings"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
