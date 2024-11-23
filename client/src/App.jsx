import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import AdminDashBoard from "./pages/AdminDashBoard";
import PrivateRoutes from "./utils/privateRoutes";
import RoleBasedRoute from "./utils/RoleBasedRoute";
import EmployeeList from "./pages/EmployeeList";
import Home from "./pages/Home";
import EditEmployee from "./pages/EditEmployee";
import DeleteEmployee from "./pages/DeleteEmployee";
import Leave from "./pages/Leave";
import Salary from "./pages/Salary";
import Settings from "./pages/Settings";
import DepartmentList from "./component/department/DepartmentList";
import AdminSummary from "./component/AdimnSummary/AdminSummary";
import AddDepartment from "./component/AddDepartment/AddDepartment";
import EditDepartment from "./component/department/EditDepartment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoute requiredRole={["admin"]}>
                <AdminDashBoard />
              </RoleBasedRoute>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route
            path="/admin-dashboard/department"
            element={<DepartmentList />}
          />
           <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          />
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          />
       
        </Route>

        <Route path="/home" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
       
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/delete-employee" element={<DeleteEmployee />} />
        <Route path="/leave/:id" element={<Leave />} />
        <Route path="/salary/:id" element={<Salary />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
