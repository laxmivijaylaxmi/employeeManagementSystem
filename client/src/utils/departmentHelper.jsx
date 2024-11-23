import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import { useState } from "react";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
  },
  {
    name: "Action",
    selector: (row) =>  row.action
  },
];

export const DepartmentButton = ({ departmentId ,onDeleteDepartment }) => {
  const navigate = useNavigate();



  const handleDelete = async (departmentId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token is missing!");
      return;
    }
  
    try {
      const response = await axios.delete(
        `http://localhost:7000/admin/department-delete/${departmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data?.success) {
        toast.success("Department deleted successfully!");
        onDeleteDepartment(departmentId); // Update local state
      } else {
        toast.error(response.data?.message || "Failed to delete the department.");
      }
    } catch (err) {
      console.error(
        "Error deleting department:",
        err.response ? err.response.data : err.message
      );
      toast.error(
        err.response?.data?.message || "An error occurred while deleting the department."
      );
    }
  };
  

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded-md"
        onClick={() => navigate(`/admin-dashboard/department/${departmentId}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded-md"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this department?")) {
            handleDelete(departmentId);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};
