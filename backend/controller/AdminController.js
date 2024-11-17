import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Employee from "../model/EmployeeModel.js"

// Helper function to create token
const createToken = (user) => {
  return jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register admin
const AdminRegister = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const adminExists = await User.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      name,
      email,
      password: hashPassword,
      role, // Use the role provided in the request
    });
    await newAdmin.save();

    const token = createToken(newAdmin);  // Create token including _id and role

    return res.status(201).json({
      message: "Admin registered successfully",
      user: {
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login admin
const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = createToken(admin);  // Create token including _id and role

    return res.status(200).json({
      message: "Login successful",
      user: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Verify user (protected route)
export const verifyUser = async (req, res) => {
  try {
    // Ensure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated or invalid token" });
    }

    // Respond with the user details
    return res.status(200).json({ user: req.user });
  } catch (err) {
    console.error("Error in verifyUser:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    if (!employees) {
      return res.status(404).json({ message: "No employees found" });
    }
    return res.status(200).json({ employees });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const createEmployee = async (req, res) => {
  try {
    const { name, email, number, designation, gender, courses } = req.body;
    const image = req.file ? req.file.path : null;

    // Create a new employee
    const newEmployee = new Employee({
      name, email, number, designation, gender, courses, image,
    });

   
    await newEmployee.save();

    res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const updateEmployee = async (req, res) => {
  const { name, email, number, designation, gender, courses } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.number = number || employee.number;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.courses = courses || employee.courses;
    if (image) employee.image = image;

    const updatedEmployee = await employee.save();
    return res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const totalCount= async(req,res)=>{
  try{
    const totalemployee = await Employee.countDocuments()
    const status ={
      totalemployee
    }
    return res.json({status})
  }
  catch(err){
    return res.json({message:"err",err})
  }
}

export { AdminRegister, AdminLogin };
