import jwt from "jsonwebtoken"
import User from "../model/UserModel.js"

export const verifyMiddlewareUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    if (!decoded) {
      return res.status(404).json({ success: false, error: "Invalid token" });
    }

    
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    req.user = user;

    
    next();
  } catch (err) {
    console.error("Authorization error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
