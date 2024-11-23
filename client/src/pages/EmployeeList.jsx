import React, { useEffect, useState } from "react";
import AdminSidebar from "../component/dashboard/AdminSidebar";
import Navbar from "../component/Navbar";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = user?.token || localStorage.getItem("token");
      if (!token) {
        console.log("Token not found in context or localStorage");
        return;
      }

      console.log("Using token:", token);
      try {
        const response = await axios.get(
          "http://localhost:7000/admin/all-employee",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Employee List Response:", response);
        setEmployees(response.data.employees);
      } catch (err) {
        console.error(
          "Error fetching employees:",
          err.response ? err.response.data : err.message
        );
      }
    };

    const fetchStatus = async () => {
      const token = user?.token || localStorage.getItem("token");
      if (!token) {
        console.log("Token not found");
        return;
      }
      try {
        const response = await axios.get("http://localhost:7000/admin/status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response);
        if (response.data && response.data.status) {
          setStatus(response.data.status);
        } else {
          console.error("Invalid response structure:", response.data);
        }
      } catch (err) {
        console.error(
          "Error fetching status:",
          err.response ? err.response.data : err.message
        );
      }
    };

    fetchStatus();
    fetchEmployees();
  }, [user]);

 

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this employee?");
    if (!confirm) return;

    const token = user?.token || localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:7000/admin/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees((prev) => prev.filter((employee) => employee._id !== id));
      alert("Employee deleted successfully");
    } catch (err) {
      console.error(
        "Error deleting employee:",
        err.response ? err.response.data : err.message
      );
      alert("Failed to delete employee");
    }
  };
  

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 flex-1 bg-gray-100 h-full text-gray-800">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Employee List</h1>
          {status && (
            <button className="bg-teal-600 text-white p-4 mb-4 border-0 rounded-[6px]">
              Total Employees: {status.totalemployee}
            </button>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg text-sm">
              <thead>
                <tr className="bg-gray-200 text-center text-sm leading-normal">
                  <th className="py-1 px-2">ID</th>
                  <th className="py-1 px-2">Name</th>
                  <th className="py-1 px-2">Email</th>
                  <th className="py-1 px-2">Number</th>
                  <th className="py-1 px-2">Designation</th>
                  <th className="py-1 px-2">Courses</th>
                  <th className="py-1 px-2">Gender</th>
                  <th className="py-1 px-2">Image</th>
                  <th className="py-1 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  
                  <tr
                    key={employee._id}
                    className="border-b border-gray-200 hover:bg-gray-100 text-sm"
                  >
                    <td className="py-1 px-2">{employee._id}</td>
                    <td className="py-1 px-2">{employee.name}</td>
                    <td className="py-1 px-2">{employee.email}</td>
                    <td className="py-1 px-2">{employee.number}</td>
                    <td className="py-1 px-2">{employee.designation}</td>
                    <td className="py-1 px-2">{employee.courses.join(", ")}</td>
                    <td className="py-1 px-2">{employee.gender}</td>
                    <td className="py-1 px-2">
                    <img
                         src={`http://localhost:7000/${employee.image}`}
                                     alt={employee.name}
                                       className="w-10 h-10 rounded-full"
                                                                   />
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        onClick={() => navigate(`/edit-employee/${employee._id}`) }
                        className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => navigate(`/salary/${employee._id}`)}
                        className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                      >
                        Salary
                      </button>
                      <button
                        onClick={() => navigate(`/leave/${employee._id}`)}
                        className="bg-pink-500 text-white py-1 px-2 rounded hover:bg-pink-600"
                      >
                        Leave
                      </button>
                      
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
