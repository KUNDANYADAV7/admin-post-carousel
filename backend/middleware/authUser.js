// import { User } from "../models/user.model.js";
// import jwt from "jsonwebtoken";

// //Authentication
// export const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;
//     if (!token) {
//       return res.status(401).json({ error: "User not authenticated" });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "User not authenticated" });
//   }
// };

// //Authorization
// export const isAdmin = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res
//         .status(403)
//         .json({ error: `User with given role ${req.user.role} not allowed` });
//     }
//     next();
//   };
// };























import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Authentication Middleware
export const isAuthenticated = async (req, res, next) => {
  try {
    // Check token in both cookies and Authorization header
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "User not authenticated" });
  }
};



//Authorization
export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: `User with given role ${req.user.role} not allowed` });
    }
    next();
  };
};
