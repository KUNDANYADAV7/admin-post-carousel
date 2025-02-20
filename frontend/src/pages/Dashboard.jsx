import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import { Navigate } from "react-router-dom";
import CreateCarousel from "../dashboard/Carousel/CreateCarousel";
import MyCarousels from "../dashboard/Carousel/MyCarousels";
import UpdateCarousel from "../dashboard/Carousel/UpdateCarousel";


function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");
  console.log(profile);
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <div>
      <Sidebar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "Update Blog" ? (
        <UpdateBlog />
      ) : component === "My Carousels" ? (
        <MyCarousels />
      ) : component === "Create Carousel" ? (
        <CreateCarousel />
      ) : component === "Update Carousel" ? (
        <UpdateCarousel />
      ) : (
        <MyBlogs />
      )}
      </div>
    </div>
  );
}

export default Dashboard;
