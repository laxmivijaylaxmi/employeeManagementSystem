import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import AdminSidebar from "../component/dashboard/AdminSidebar";
import Navbar from "../component/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { user } = useAuth();
  const{id} = useParams()
  console.log("Id from URL:",id)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    designation: "",
    gender: "",
    courses: "",
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const coursesOptions = [".Net server side", "JavaScript", "J-Query"];

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData({ ...formData, image: files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      courses: checked
        ? [...prevData.courses, value]
        : prevData.courses.filter((course) => course !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = user?.token || localStorage.getItem("token")
    if (!token) {
   toast.error("Token is required")
      return;
    }
    console.log("Employee ID on submit:", id);  
    if(!id){
      toast.error("Employee ID is missing");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("number", formData.number);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("courses", JSON.stringify(formData.courses));
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
    const response = await axios.put(
        `http://localhost:7000/admin/update-employee/${id}`,
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'multipart/form-data', 
          },
        }
      );
      toast.success("Employee updated successfully:")
      console.log('Employee updated successfully:', response.data);
          navigate("/employee-list")
   
    } 
    catch (error) {
      console.log("Error updating employee:", error);
      alert(error.response?.data?.message || "Failed to update employee. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 flex-1 bg-gray-100 h-full text-gray-800">
        <Navbar />
        <div className="flex justify-center items-center h-full mt-10">
          <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm">
            <h1 className= "text-2xl font-semibold text-center mb-4 text-teal-600">Edit Employee</h1>
            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              <div>
                <label htmlFor="name" className="block font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="number" className="block font-medium">
                  Mobile No
                </label>
                <input
                  id="number"
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Enter number"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="designation" className="block font-medium">
                  Designation
                </label>
                <select
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                >
                  <option value="" disabled>
                    Select Designation
                  </option>
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Gender</label>
                <div className="flex space-x-4">
                  {["male", "female"].map((gender) => (
                    <label key={gender} className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        className="mr-2"
                        required
                      />
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium">Courses</label>
                <div className="flex flex-wrap gap-2">
                  {coursesOptions.map((course) => (
                    <label key={course} className="flex items-center">
                      <input
                        type="checkbox"
                        name="courses"
                        value={course}
                        checked={formData.courses.includes(course)}
                        onChange={handleCheckboxChange}
                        className="mr-1"
                      />
                      {course}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="mt-1 p-1 border border-gray-300 rounded w-full"
                />
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className={`bg-teal-500 text-white py-1 px-4 rounded ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-600 transition"
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
