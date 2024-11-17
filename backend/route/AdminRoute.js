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
adminRoute.get("/status", totalCount)

adminRoute.delete("/delete-employee/:id", verifyMiddlewareUser, deleteEmployee);

export default adminRoute;
