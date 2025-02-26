import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import config from "../../config";
import { FaUserCircle } from "react-icons/fa";

function CreateCarousel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false); // Button disable state

  const { fetchCarousels } = useAuth(); // Assuming there's a function to fetch carousels

  // Handle Image Upload
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  // Handle Carousel Creation
  const handleCreateCarousel = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent double submission
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const { data } = await axios.post(
        `${config.apiUrl}/api/carousel/create-carousel`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Carousel created successfully!");
      
      // Reset Fields
      setTitle("");
      setDescription("");
      setImage("");
      setImagePreview("");

      fetchCarousels(); // Refresh carousels list
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating carousel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-8">Create Carousel</h3>
        <form onSubmit={handleCreateCarousel} className="space-y-6">
          
          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-lg">Title</label>
            <input
              type="text"
              placeholder="Enter carousel title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              required
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="block text-lg">Description</label>
            <textarea
              rows="4"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-lg">Carousel Image</label>
            <div className="flex items-center justify-center">
              {imagePreview ? (
      <img
        src={imagePreview}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-white rounded-md transition-colors duration-200 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create Carousel"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCarousel;
