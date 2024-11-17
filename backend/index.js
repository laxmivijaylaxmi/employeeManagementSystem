import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminRoute from "./route/AdminRoute.js";
import userRoute from "./route/UserRoute.js";
import dotenv from "dotenv";

const app = express();
const Port = 7000;
dotenv.config();
app.use(cors());
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.listen(Port, () => {
  console.log(`server started on ${Port} number`);
});
