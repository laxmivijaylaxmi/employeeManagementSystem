import React from "react";
import AdminSidebar from "../component/dashboard/AdminSidebar";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";

const AdminDashBoard = () => {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="ml-64 flex-1 bg-gray-100 h-screen text-gray-800">
        <Navbar />

        {/* <div className="flex items-center justify-center mt-10 p-6 bg-teal-500 font-pacific text-white rounded font-profic">
  <div className="text-center max-w-2xl ">
    <h1 className="text-3xl font-bold text-white">Welcome to the Admin Dashboard</h1>
    <p className="mt-6 text-lg">
      Here you can manage your departments, users, and other admin functionalities.
    </p>
  </div>
</div> */}

        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashBoard;
