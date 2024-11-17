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
        />
        <Route path="/home" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/edit-employee" element={<EditEmployee/>}/>
        <Route path="/delete-employee" element={<DeleteEmployee/>}/>
      </Routes>
    </Router>
  );
};

export default App;
