import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if(!department.dep_name || !department.description){
        toast.error("please fill out all fields")

        return;
      }

      const token = localStorage.getItem("token")
     

    try {
      const response = await axios.post(
        "http://localhost:7000/admin/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
      toast.success("Department added successfully!");
      
        setDepartment({ dep_name: "", description: "" }); 
        navigate("/admin-dashboard/department")
      }
    } catch (err) {
      toast.error("Error adding department");
      console.error(err);
    }
  };

  return (<div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Department
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="dep_name"
              className="block text-sm font-medium text-gray-700"
            >
              Department Name
            </label>
            <input
              name="dep_name"
              value={department.dep_name}
              onChange={handleChange}
              id="dep_name"
              type="text"
              placeholder="Enter Department Name"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              value={department.description}
              onChange={handleChange}
              id="description"
              placeholder="Enter Department Description"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
              rows="4"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-40 px-2 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
            >
              Add Department
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
    
  );
};

export default AddDepartment;
