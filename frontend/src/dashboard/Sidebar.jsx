import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import {
  DocumentTextIcon,
  PencilSquareIcon,
  PhotoIcon,
  UserCircleIcon,
  FilmIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import config from "../config";

function Sidebar({ setComponent, setSidebarOpen }) {
  const { profile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [show, setShow] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setShow(true);
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  const handleClose = () => {
    if (windowWidth < 768) {
      setShow(false);
      setSidebarOpen(false);
    }
  };

  const handleOpen = () => {
    setShow(true);
    setSidebarOpen(true);
  };

  const handleComponents = (value) => {
    setComponent(value);
    if (windowWidth < 768) {
      setShow(false);
      setSidebarOpen(false);
    }
  };

  const gotoHome = () => {
    navigateTo("/");
    if (windowWidth < 768) {
      setShow(false);
      setSidebarOpen(false);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${config.apiUrl}/api/users/logout`,
        { withCredentials: true }
      );
      toast.success(data.message);
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  const menuItems = [
    { name: "My Blogs", icon: <DocumentTextIcon className="h-5 w-5" /> },
    { name: "Create Blog", icon: <PencilSquareIcon className="h-5 w-5" /> },
    { name: "My Profile", icon: <UserCircleIcon className="h-5 w-5" /> },
    { name: "Create Carousel", icon: <PhotoIcon className="h-5 w-5" /> },
    { name: "My Carousels", icon: <FilmIcon className="h-5 w-5" /> },
    { name: "Home", icon: <HomeIcon className="h-5 w-5" /> },
    { name: "Logout", icon: <ArrowRightOnRectangleIcon className="h-5 w-5" /> },
  ];

  return (
    <>
      {!show && windowWidth < 768 && (
        <div
          className="fixed top-4 left-4 z-50 bg-black p-3 rounded cursor-pointer"
          onClick={handleOpen}
        >
          <CiMenuBurger className="text-3xl text-white" />
        </div>
      )}

      {show && (
        <div className="w-64 h-screen shadow-lg fixed top-0 left-0 bg-black text-white transition-transform duration-300 transform z-50 overflow-y-auto">
          {/* Close button should always be available on small screens */}
          {windowWidth < 768 && (
            <div
              className="absolute top-4 right-4 text-3xl cursor-pointer text-white p-2"
              onClick={handleClose}
            >
              <BiSolidLeftArrowAlt className="text-4xl" />
            </div>
          )}

          <div className="text-center py-6">
            <img
              className="w-24 h-24 rounded-full mx-auto "
              src={profile?.photo?.url}
              alt="User Profile"
            />
            <p className="text-lg font-semibold">{profile?.user?.name}</p>
          </div>

          <ul className="flex flex-col space-y-6 mx-6 pb-10">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={(e) =>
                  item.name === "Logout"
                    ? handleLogout(e)
                    : item.name === "Home"
                    ? gotoHome()
                    : handleComponents(item.name)
                }
                
                className="cursor-pointer text-white text-lg flex items-center space-x-3 px-4 py-2 rounded-lg 
                hover:bg-gray-100 hover:text-black hover:scale-105"
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Sidebar;