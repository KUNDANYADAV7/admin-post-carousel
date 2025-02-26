



import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import Footer from "../src/components/Footer";
import Blogs from "../src/pages/Blogs";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Dashboard from "../src/pages/Dashboard";
import Creators from "./pages/Creators";
import UpdateBlog from "./dashboard/UpdateBlog";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import UpdateCarousel from "./dashboard/Carousel/UpdateCarousel";
import Carousels from "./pages/Carousels";
import CarouselDetail from "./pages/CarouselDetail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const location = useLocation();
  // const hideNavbarFooter = ["/dashboard", "/login", "/register", "/forgot-password", "/reset_password/:id/:token"].includes(
  //   location.pathname
  // );

  const hideNavbarFooter =
  ["/dashboard", "/login", "/register", "/forgot-password"].includes(location.pathname) ||
  location.pathname.startsWith("/reset_password/");


  const token = localStorage.getItem("jwt"); // Retrieve the token directly from localStorage

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route
          exact
          path="/"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/carousels" element={<Carousels />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/creators" element={<Creators />} />

        {/* 🚀 Protect Login & Register Pages */}
        <Route
          exact
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/register"
          element={token ? <Navigate to="/" /> : <Register />}
        />
        <Route 
         exact 
         path="/forgot-password" 
         element={token ? <Navigate to="/" /> : <ForgotPassword />} />

<Route exact  path="/reset_password/:id/:token" element={token ? <Navigate to="/" /> : <ResetPassword />}></Route>

        {/* 🚀 Protect Dashboard (Only Authenticated Users) */}
        <Route
          exact
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Blog Detail & Update Routes */}
        <Route exact path="/blog/:id" element={<Detail />} />
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />

        {/* Blog Detail & Update Routes */}
        <Route exact path="/single-carousel/:id" element={<CarouselDetail />} />
        <Route exact path="/carousel/update-carousel/:id" element={<UpdateCarousel />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
