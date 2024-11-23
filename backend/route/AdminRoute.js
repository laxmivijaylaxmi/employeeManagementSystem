import express from "express";
import {
  AdminLogin,
  AdminRegister,
  createEmployee,
  deleteEmployee,
  getAllEmployee,
  totalCount,
  updateEmployee,
  verifyUser,
} from "../controller/AdminController.js";
import { verifyMiddlewareUser } from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import { addDepartment, deleteDepartment, EditDepartment, getAllDepartment } from "../controller/DepartmentController.js";

const adminRoute = express.Router();


adminRoute.post("/register", AdminRegister);
adminRoute.post("/login", AdminLogin);


adminRoute.post(
  "/create-employee",
  verifyMiddlewareUser,
  upload.single("image"), 
  createEmployee
);

adminRoute.get("/all-employee", verifyMiddlewareUser, getAllEmployee);

adminRoute.get("/verify", verifyMiddlewareUser, verifyUser);

adminRoute.put(
  "/update-employee/:id",
  verifyMiddlewareUser,
  upload.single("image"),
  updateEmployee
);
adminRoute.get("/status", totalCount);


adminRoute.delete("/delete/:id", verifyMiddlewareUser, deleteEmployee);
adminRoute.get("/all-department",verifyMiddlewareUser,getAllDepartment)
adminRoute.post("/department/add",verifyMiddlewareUser,addDepartment);
adminRoute.put("/department/:id",verifyMiddlewareUser,EditDepartment);
adminRoute.delete("/department-delete/:id",verifyMiddlewareUser,deleteDepartment)
export default adminRoute;
