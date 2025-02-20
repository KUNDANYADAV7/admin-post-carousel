import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [carousels, setCarousels] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchProfile = async () => {
    try {
      // token should be let type variable because its value will change in every login. (in backend also)
      let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage (Go to login.jsx)
      console.log(token);
      if (token) {
        const { data } = await axios.get(
          "http://localhost:4001/api/users/my-profile",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(data.user);
        console.log("Profile Data:", data);
        setProfile(data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/blogs/all-blogs",
        { withCredentials: true }
      );
      console.log(data);
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchCarousels = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/carousel/all-carousels",
        { withCredentials: true }
      );
      console.log(data);
      setCarousels(data);
    } catch (error) {
      console.log(error);
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


