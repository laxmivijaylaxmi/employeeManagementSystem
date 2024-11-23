import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';  
import { useAuth } from '../../context/authContext';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom';

const EditDepartment = () => {
  const { id } = useParams(); 
  const { user } = useAuth(); 
  const [department, setDepartment] = useState({ dep_name: '', description: '' });
  const [loading, setLoading] = useState(true);

 const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
    console.error("No department ID found");
    return;
  }
    const fetchDepartment = async () => {
      const token = user?.token || localStorage.getItem("token");
      if (!token) {
        console.log("Token not found in context or localStorage");
        setLoading(false);
        return;
      }
      console.log("using token", token);

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:7000/admin/department/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API response:", response);

        if (response.data.department) {
          setDepartment(response.data.department); 
        } else {
          console.error("No department data found in the response:", response.data);
        }
      } catch (err) {
        console.error("Error fetching department data:", err.response ? err.response.data : err.message);
    
      } finally {
        setLoading(false);
      }
    };
    fetchDepartment();
  }, [id, user]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = user?.token || localStorage.getItem("token");
    if (!token) {
      toast.error("Token is required");
      return;
    }
  
    console.log("Department ID on submit:", id);  
    if (!id) {
      toast.error("Department ID is missing");
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:7000/admin/department/${id}`, department, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
     
      //console.log("Department updated successfully", response);
      toast.success("Department updated successfully");
      navigate("/admin-dashboard/department")
    } catch (err) {
      console.error("Error updating department:", err.response ? err.response.data : err.message);
      toast.error("Error updating department");
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Department
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
              Edit Department
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditDepartment;
