import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    // Ensure the page scrolls to the top when the component loads
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setVisibleBlogs(6); // Reset visibleBlogs when component mounts
  }, []);

  // Function to load more blogs
  const loadMoreBlogs = () => {
    if (visibleBlogs < blogs.length) {
      setLoading(true);
      setTimeout(() => {
        setVisibleBlogs((prev) => prev + 6);
        setLoading(false);
      }, 1000);
    }
  };

  // Infinite Scroll Implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreBlogs();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [visibleBlogs, blogs.length]);

  // Sort blogs by createdAt date (newest first)
  const sortedBlogs = blogs
    ? [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-7 my-12 p-4 mt-24">
  <h1 className="text-3xl font-bold text-center mb-8">All Blogs</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {sortedBlogs.slice(0, visibleBlogs).map((blog, index) => (
      <Link
        to={`/blog/${blog._id}`}
        key={index}
        className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
      >
        {/* Blog Image */}
        <img
          src={blog?.blogImage?.url}
          alt={blog?.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Date at the Top */}
        <div className="absolute top-2 left-2  bg-opacity-70 text-white text-xs px-3 py-1 rounded-md">
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>

        {/* Text Overlay (Bottom) */}
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-lg font-semibold hover:text-yellow-500 transition-colors ">{blog?.title}</h2>
          <p className="text-sm text-gray-300">{blog?.category}</p>
        </div>
      </Link>
    ))}
  </div>

  {/* Loading Indicator */}
  {loading && (
    <div className="flex justify-center my-4">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
    </div>
  )}

  {/* Infinite Scroll Trigger */}
  <div ref={observerRef} className="h-10"></div>
</div>

  );
}

export default Blogs;
