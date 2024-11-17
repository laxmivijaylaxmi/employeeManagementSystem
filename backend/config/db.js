import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose
      .connect(
        "mongodb+srv://vrvijayalaxmi:Ramsitagopal12**@cluster0.8lcab.mongodb.net/employeeManagement"
      )
      .then(() => console.log("DB Connected to server"));
  };
  