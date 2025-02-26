

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import "react-quill/dist/quill.snow.css";


function Detail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`${config.apiUrl}/api/blogs/single-blog/${id}`, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center mt-10 text-gray-500">Loading...</p>;


  const styledAbout = blog?.about
  ?.replace(/<ul>/g, '<ul style="list-style-type: disc; padding-left: 1.5rem; margin: 0;">')
  ?.replace(/<ol>/g, '<ol style="list-style-type: decimal; padding-left: 1.5rem; margin: 0;">')
  ?.replace(/<li>/g, '<li style="margin-bottom: 0.5rem; display: list-item;">');


  return (
    <section className="w-full bg-white py-10 mt-24">
      <div className="max-w-[95%] lg:max-w-[95%] mx-auto bg-gray-100 p-6 md:p-10 shadow-lg rounded-lg">
        {/* Blog Category & Date */}
        <div className="flex justify-between items-center text-gray-600 text-sm mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md">{blog.category}</span>
            <span className="text-gray-700 text-sm sm:text-base whitespace-nowrap">
        <span className="text-lg font-medium text-black">Created on: </span> 
        {new Date(blog.createdAt).toLocaleDateString()}
      </span>
        </div>

        {/* Blog Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Blog Image */}
         {blog.blogImage && (
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-md">
            <img
              src={blog.blogImage.url}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}





        {/* Blog Content */}
        <div className="mt-8 text-lg text-gray-700 leading-relaxed">
{/* Title in Bold */}
<h2 className="text-2xl font-bold mb-4">{blog.title}</h2>

{/* Splitting paragraphs and adding space */}
{/* {blog?.about?.split("\n").map((paragraph, index) => (
  <p key={index} className="mb-6">{paragraph}</p>
))} */}

{/* <div className="" dangerouslySetInnerHTML={{ __html: blog?.about }} /> */}
<div
            dangerouslySetInnerHTML={{ __html: styledAbout }}
            style={{
              marginTop: "2rem",
              fontSize: "1.125rem",
              color: "#4A5568",
              lineHeight: "1.75",
              fontFamily: "Arial, sans-serif",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />


</div>
      </div>
    </section>
  );
}

export default Detail;
