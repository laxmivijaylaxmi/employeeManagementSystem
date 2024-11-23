import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

export const verifyMiddlewareUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header
  console.log("Token received:", token); // Log for debugging, remember to remove in production!

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    // Check if decoded user exists in the database
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Authorization error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Malformed JWT token" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
