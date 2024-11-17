import React, { useState } from "react";
import Navbar from "../component/Navbar";
import AdminSidebar from "../component/dashboard/AdminSidebar";
import axios from "axios";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });

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

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData({ ...formData, image: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await axios.post(
        "http://localhost:7000/admin/create-employee",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Employee created successfully:", response.data);
      alert("Employee created successfully!");
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("Failed to create employee. Please try again.");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="ml-64 flex-1 bg-gray-100 h-full text-gray-800">
        <Navbar />

        <div className="flex justify-center items-center h-full mt-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-center mb-4 text-teal-600">
              Employee Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter the name"
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter the email"
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="number" className="block text-lg font-medium text-gray-700">
                  Mobile No
                </label>
                <input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Enter the number"
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  required
                />
              </div>

              {/* Designation */}
              <div>
                <label htmlFor="designation" className="block text-lg font-medium text-gray-700">
                  Designation
                </label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
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

              {/* Gender */}
              <div>
                <label className="block text-lg font-medium text-gray-700">Gender</label>
                <div className="flex space-x-4 mt-2">
                  {["male", "female", "other"].map((gender) => (
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

              {/* Courses */}
              <div>
                <label className="block text-lg font-medium text-gray-700">Courses</label>
                <div className="flex space-x-4 mt-2">
                  {["bca", "mca", "bsc"].map((course) => (
                    <label key={course} className="flex items-center">
                      <input
                        type="checkbox"
                        name="courses"
                        value={course}
                        checked={formData.courses.includes(course)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      {course.toUpperCase()}
                    </label>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-lg font-medium text-gray-700">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
