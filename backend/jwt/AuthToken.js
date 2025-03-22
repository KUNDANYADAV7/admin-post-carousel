// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// const createTokenAndSaveCookies = async (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
//     expiresIn: "30d",
//   });
//   res.cookie("jwt", token, {
//     httpOnly: true, // Temporarily set to false for testing
//     secure: false,
//     sameSite: "lax",
//     path: "/", // Ensure the cookie is available throughout the site
//   });
//   await User.findByIdAndUpdate(userId, { token });
//   return token;
// };

// export default createTokenAndSaveCookies;




import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction, // Secure for production (HTTPS), false for development
    sameSite: isProduction ? "None" : "Lax", // "None" for cross-origin cookies
    path: "/",
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};

export default createTokenAndSaveCookies;
