import Department from "../model/DepartmentModel.js";

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    // Validation
    if (!dep_name || !description) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Check if the department already exists
    const existingDepartment = await Department.findOne({ dep_name });
    if (existingDepartment) {
      return res.status(409).json({ success: false, message: "Department already exists." });
    }

    // Create and save the new department
    const newDepartment = new Department({ dep_name, description });
    await newDepartment.save();

    return res.status(201).json({
      success: true,
      message: "Department added successfully!",
      department: newDepartment,
    });
  } catch (err) {
    console.error("Error adding department:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};


export const getAllDepartment = async (req, res) => {
  try {
    const department = await Department.find();
    if (!department) {
      return res.status(404).json({ message: "No department found" });
    }
    return res.status(200).json({ department });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
export const EditDepartment = async(req,res)=>{
  const { id } = req.params;
  const { dep_name, description } = req.body;

  try {
    const department = await Department.findByIdAndUpdate(id, { dep_name, description }, { new: true });
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json({ department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } 
}

export const deleteDepartment = async(req,res)=>{
  const { id } = req.params;

  try {
    const department = await Department.findByIdAndDelete(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json({message: "Department deleted successfully", department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } 
}

export { addDepartment };
