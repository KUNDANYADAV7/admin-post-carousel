import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs,profile } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogs) {
      setLoading(false);
    }
  }, [blogs,profile]);

  // Sort blogs by createdAt date (newest first)
  const sortedBlogs = blogs
    ? [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div className="container mx-auto my-10 p-6 mt-24">
    {/* Heading */}
    <h1 className="text-3xl font-bold text-center mb-8">Recent Blogs</h1>
  
    {/* Loading State */}
    {loading ? (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg">Loading blogs...</p>
      </div>
    ) : sortedBlogs.length > 0 ? (
      <>
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedBlogs.slice(0, 8).map((element) => (
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="group relative">
                {/* Blog Image */}
                <img
                  src={element?.blogImage?.url}
                  alt=""
                  className="w-full h-56 object-cover"
                />
  
                {/* Date on Top of Image */}
                <div className="absolute top-3 left-3 bg-opacity-70 text-white px-3 py-1 text-sm rounded-md">
                  {new Date(element.createdAt).toLocaleDateString()}
                </div>
  
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
  
                {/* Blog Title */}
                <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold hover:text-yellow-500 transition-colors duration-300">
                  {element?.title}
                </h1>
              </div>
  
              
            </Link>
          ))}
        </div>
  
        {/* See All Blogs Button */}
        <div className="flex justify-center mt-8">
          <Link
            to="/blogs"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            See All Blogs →
          </Link>
        </div>
      </>
    ) : (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg">No Blogs Posted Yet</p>
      </div>
    )}
  </div>
  
  );
}

export default Hero;




