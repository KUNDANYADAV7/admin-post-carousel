

// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import fileUpload from "express-fileupload";
// import { v2 as cloudinary } from "cloudinary";
// import cookieParser from "cookie-parser";
// import userRoute from "./routes/user.route.js";
// import blogRoute from "./routes/blog.route.js";
// import cors from "cors";
// import carouselRoute from "./routes/carousel.route.js";

// dotenv.config();  // ✅ Load .env first

// const app = express();
// const port = process.env.PORT || 4001;
// const MONGO_URL = process.env.MONOG_URI;

// // Handle missing FRONTEND_URLS
// // const allowedOrigins = process.env.FRONTEND_URI
// //   ? process.env.FRONTEND_URI.split(",")
// //   : ["http://localhost:5174", "http://localhost:3000"];  // Default values

// // app.use(
// //   cors({
// //     origin: function (origin, callback) {
// //       if (!origin || allowedOrigins.includes(origin.trim())) {
// //         callback(null, true);
// //       } else {
// //         callback(new Error("Not allowed by CORS"));
// //       }
// //     },
// //     credentials: true,
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   })
// // );

// // Middleware


// app.use(
//   cors({
//     origin: (origin, callback) => {
//       callback(null, true); // Accept any origin
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );


// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// // Database Connection
// mongoose
//   .connect(MONGO_URL)
//   .then(() => console.log("Connected to MongoDB "+process.env.PORT))
//   .catch((error) => console.log("MongoDB connection error:", error));

// // Define routes
// app.use("/api/users", userRoute);
// app.use("/api/blogs", blogRoute);
// app.use("/api/carousel", carouselRoute);

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_SECRET_KEY,
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running`);
// });






import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import cors from "cors";
import carouselRoute from "./routes/carousel.route.js";

dotenv.config();  // ✅ Load .env first

const app = express();
const port = process.env.PORT || 4001;
const MONGO_URL = process.env.MONOG_URI;

// Handle missing FRONTEND_URLS
const allowedOrigins = process.env.FRONTEND_URIS.split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



// Middleware




app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Database Connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB "+process.env.PORT))
  .catch((error) => console.log("MongoDB connection error:", error));

// Define routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/carousel", carouselRoute);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Start server
app.listen(port, () => {
  console.log(`Server is running`);
});
