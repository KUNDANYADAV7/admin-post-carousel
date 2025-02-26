import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import config from "../config";

function Navbar() {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  useEffect (() => {}, [isAuthenticated, profile]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${config.apiUrl}/api/users/logout`,
        { withCredentials: true }
      );
      localStorage.removeItem("jwt"); // Removing token from localStorage
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-lg px-4 py-2 bg-black text-white font-bold">
  <div className="flex items-center justify-between container mx-auto">
    {/* Logo */}
    <div>
      <img src="/logonew.jpg" alt="CilliBlog Logo" className="h-20 w-25" />
    </div>

    {/* Desktop Navbar */}
    <div className="hidden md:flex items-center space-x-20">
      <Link to="/" className="hover:text-blue-500">HOME</Link>
      <Link to="/blogs" className="hover:text-blue-500">BLOGS</Link>
      <Link to="/carousels" className="hover:text-blue-500">CAROUSELS</Link>
    </div>

    {/* Mobile Menu Button */}
    <div className="md:hidden" onClick={() => setShow(!show)}>
      {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
    </div>

    {/* Auth Buttons (Desktop) */}
    <div className="hidden md:flex space-x-2">
      {isAuthenticated && profile?.role === "admin" && (
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
        >
          DASHBOARD
        </Link>
      )}
      {!isAuthenticated ? (
        <Link
          to="/login"
          className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
        >
          LOGIN
        </Link>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
        >
          LOGOUT
        </button>
      )}
    </div>
  </div>

  {/* Mobile Navbar */}
  {show && (
    <div className="bg-white md:hidden">
      <ul className="flex flex-col h-screen items-center justify-center space-y-3 text-xl">
        <Link to="/" onClick={() => setShow(false)} className="hover:text-blue-500 text-black">HOME</Link>
        <Link to="/blogs" onClick={() => setShow(false)} className="hover:text-blue-500 text-black">BLOGS</Link>
        <Link to="/carousels" onClick={() => setShow(false)} className="hover:text-blue-500 text-black">CAROUSELS</Link>
        
        {/* Auth Buttons (Mobile) */}
        {isAuthenticated && profile?.role === "admin" && (
          <Link
            to="/dashboard"
            onClick={() => setShow(false)}
            className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
          >
            DASHBOARD
          </Link>
        )}
        {!isAuthenticated ? (
          <Link
            to="/login"
            onClick={() => setShow(false)}
            className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
          >
            LOGIN
          </Link>
        ) : (
          <button
            onClick={(e) => {
              setShow(false);
              handleLogout(e);
            }}
            className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
          >
            LOGOUT
          </button>
        )}
      </ul>
    </div>
  )}
</nav>

  );
}

export default Navbar;
