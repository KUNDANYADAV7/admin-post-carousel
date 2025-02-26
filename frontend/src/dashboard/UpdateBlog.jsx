


import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import config from "../config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const { fetchBlogs } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBlogImagePreview(reader.result);
        setBlogImage(file);
      };
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
          }
        );

      
        setTitle(data?.title);
        setCategory(data?.category);
        setAbout(data?.about);
        setBlogImage(data?.blogImage?.url);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch blog details");
      }
    };
    fetchBlog();
  }, [id]);


  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    if (blogImage instanceof File) {
      formData.append("blogImage", blogImage); // Append the image file
    }
  
    try {
      const { data } = await axios.put(
        `${config.apiUrl}/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog updated successfully");
      navigateTo("/");
      fetchBlogs();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Please fill the required fields"
      );
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
    <div>
      <div className="container mx-auto my-12 p-4">
        <section className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">UPDATE BLOG</h3>
          <form>
          <div className="mb-4">
              <label className="block mb-2 font-semibold">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Mobile Application">Mobile Application</option>
                <option value="SEO">SEO</option>
                <option value="Cloud Tech">Cloud Tech</option>
                <option value="Website Development">Website Development</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="BLOG MAIN TITLE"
              className="w-full p-2 mb-4 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="mb-4">
              <label className="block mb-2 font-semibold">BLOG IMAGE</label>
              <img
                src={
                  blogImagePreview
                    ? blogImagePreview
                    : blogImage
                    ? blogImage
                    : "/imgPL.webp"
                }
                alt="Blog Main"
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <input
                type="file"
                className="w-full p-2 border rounded-md"
                onChange={changePhotoHandler}
              />
            </div>

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
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleUpdate}
            >
              UPDATE
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default UpdateBlog;