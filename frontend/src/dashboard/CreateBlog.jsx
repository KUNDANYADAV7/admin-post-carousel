import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import config from "../config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles for ReactQuill
import { FaUserCircle } from "react-icons/fa";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState(""); // Will store the formatted content
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const { fetchBlogs } = useAuth();

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about); // This now stores formatted content
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.post(
        `${config.apiUrl}/api/blogs/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog posted successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
      fetchBlogs();
    } catch (error) {
      toast.error(error.message || "Please fill the required fields");
    } finally {
      setLoading(false);
    }
  };


  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }], // Ensure ordered lists are enabled
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };
  

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-8">Create Blog</h3>
        <form onSubmit={handleCreateBlog} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              required
            >
              <option value="">Select Category</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Mobile Application">Mobile Application</option>
              <option value="SEO">SEO</option>
              <option value="Cloud Tech">Cloud Tech</option>
              <option value="Website Development">Website Development</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg">Title</label>
            <input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg">Blog Image</label>
            <div className="flex items-center justify-center">
              {/* <img
                src={blogImagePreview || "/imgPL.webp"}
                alt="Blog"
                className="w-full max-w-sm h-auto rounded-md object-cover"
                required
              /> */}

              {blogImagePreview ? (
                    <img
                      src={blogImagePreview}
                      alt="Carousel"
                      className="w-full h-auto rounded-md object-cover"
                    />
                  ) : (
                    <FaUserCircle size={60} color="gray" />
                  )}
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              required
            />
          </div>

          {/* Rich Text Editor */}
          <div className="space-y-2">
            <label className="block text-lg">About</label>
            <ReactQuill
              theme="snow"
              value={about}
              onChange={setAbout}
              modules={modules}
              className="bg-white border border-gray-400 rounded-md"
              placeholder="Write something about your blog..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-white rounded-md transition-colors duration-200 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Posting..." : "Post Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
