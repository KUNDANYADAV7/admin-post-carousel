import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import config from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [carousels, setCarousels] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  

  const fetchProfile = async () => {
    try {
      let token = localStorage.getItem("jwt"); 
      if (token) {
        const { data } = await axios.get(
          `${config.apiUrl}/api/users/my-profile`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
       
        setProfile(data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
    }
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${config.apiUrl}/api/blogs/all-blogs`,
        { withCredentials: true }
      );
      setBlogs(data);
    } catch (error) {
    }
  };


  const fetchCarousels = async () => {
    try {
      const { data } = await axios.get(
        `${config.apiUrl}/api/carousel/all-carousels`,
        { withCredentials: true }
      );
      setCarousels(data);
    } catch (error) {
    }
  };

  useEffect(() => {
 

    fetchBlogs();
    fetchProfile();
    fetchCarousels();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        fetchBlogs,
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        fetchCarousels,
        carousels
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


