import React from "react";
import AdminSidebar from "../component/dashboard/AdminSidebar";
import Navbar from "../component/Navbar";

const AdminDashBoard = () => {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="ml-64 flex-1 bg-gray-100 h-screen text-gray-800">
        <Navbar />

        <div className="flex justify-center items-center h-full">
          <div className="bg-teal-600 text-white p-10 rounded-lg shadow-lg max-w-3xl w-full mx-4">
            <h2 className="text-4xl font-bold text-center font-pacific">
              Welcome to the Admin Panel
            </h2>
            <p className="mt-4 text-lg text-center">
              Manage the system, monitor activities, and control user settings
              from this dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
