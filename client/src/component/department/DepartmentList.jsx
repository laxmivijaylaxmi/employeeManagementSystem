import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, DepartmentButton } from "../../utils/departmentHelper";
import DataTable from "react-data-table-component";
import axios from "axios"; 
import { useAuth } from "../../context/authContext";

const DepartmentList = () => {
  const { user } = useAuth();
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(true); 
  

  const onDeleteDepartment = async (departmentId) => {
    console.log("Before delete:", department); 
    const data = department.filter((dep) => dep._id !== departmentId);
    console.log("After delete:", data);
    setDepartment(data);
  };
  
  
  useEffect(() => {
    const fetchDepartment = async () => {
      const token = user?.token || localStorage.getItem("token");
      if (!token) {
        // console.log("Token not found in context or localStorage");
        setLoading(false); 
        return;
      }
      // console.log("using token", token);

      try {
        setLoading(true); 
        const response = await axios.get("http://localhost:7000/admin/all-department", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        // console.log("API response:", response);

       
        if (response.data.department) {
          let sno = 1; 
          const data = response.data.department.map((dep) => ({
            _id: dep._id,
            sno: sno++, 
            dep_name: dep.dep_name,
            description: dep.description,
            action: <DepartmentButton departmentId={dep._id} onDeleteDepartment={onDeleteDepartment}  className="m-2" /> 
          }));
          setDepartment(data);
        } else {
          console.error("No department data found in the response:", response.data);
        }
      } catch (err) {
        console.error(
          "Error fetching department data:",
          err.response ? err.response.data : err.message
        );
      } finally {
        setLoading(false); 
      }
    };
    fetchDepartment();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-md">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-teal-600 font-proific">Manage Departments</h3>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search By Department Name"
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
        >
          Add New Department
        </Link>
      </div>

      <div className="overflow-x-auto mt-8">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-16 h-16 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div> {/* Loading spinner */}
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg">
            <DataTable
              columns={columns}
              data={department}
              pagination
              highlightOnHover
              pointerOnHover
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: '#2d3748', 
                    color: '#fff', 
                    fontWeight: 'bold', 
                    fontSize: '1rem',
                    padding: '10px 15px', 
                  },
                },
                cells: {
                  style: {
                    padding: '10px 15px', 
                    fontSize: '0.875rem', 
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentList;
