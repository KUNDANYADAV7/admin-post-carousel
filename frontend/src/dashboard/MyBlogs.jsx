import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import config from "../config";
import { useAuth } from "../context/AuthProvider";

function MyBlogs({sidebarOpen}) {
  const [myBlogs, setMyBlogs] = useState([]);
    const { fetchBlogs,refreshData  } = useAuth();
  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/api/blogs/my-blog`,
          { withCredentials: true }
        );
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${config.apiUrl}/api/blogs/delete/${id}`, {
        withCredentials: true,
      });
  
      toast.success(res.data.message || "Blog deleted successfully");
  
      // Remove deleted blog from the state immediately
      setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
  
      // Fetch updated list from the server
      fetchBlogs(); 
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };
  
  return (
    <div
      className={`p-4 min-h-screen transition-all duration-300 ${
        sidebarOpen ? "ml-72" : "ml-0"
      }`}
    >

      <div className="container mx-auto p-4">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-60">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                key={element._id}
              >
                {element?.blogImage && (
                  <img
                    src={element?.blogImage.url}
                    alt="blogImg"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="text-sm text-gray-600">
                    {element.category}
                  </span>
                  <h4 className="text-xl font-semibold my-2">
                    {element.title}
                  </h4>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/blog/update/${element._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You have not posted any blog to see!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;


