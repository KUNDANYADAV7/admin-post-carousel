import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import config from "../config";
import { Plus } from "lucide-react";

function MyProfile() {
  const { profile, setProfile } = useAuth();
  const [imagePreview, setImagePreview] = useState(profile?.photo?.url);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImagePreview(profile?.photo?.url);
  }, [profile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image");

    setLoading(true);
    const formData = new FormData();
    formData.append("photo", image);

    try {
      const { data } = await axios.put(
        `${config.apiUrl}/api/users/update-photo/${profile?._id}`,
        formData,
        { withCredentials: true }
      );
      setProfile(data.user);
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full p-6">
        <div className="relative w-full flex justify-center pt-6">
          <div className="relative w-28 h-28">
            <img
              className="w-28 h-28 rounded-full border-4 border-gray-700 object-cover"
              src={imagePreview || "https://via.placeholder.com/150"}
              alt="User Profile"
            />
            <label
              htmlFor="profilePic"
              className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 border-2 border-white rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-600 transition"
            >
              <Plus className="text-white w-5 h-5" />
              <input
                type="file"
                id="profilePic"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Uploading..." : "UPLOAD"}
          </button>
        </div>
        <div className="px-6 py-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">{profile?.name}</h2>
          <p className="text-gray-600 mt-2">{profile?.email}</p>
          <p className="text-gray-600 mt-2">{profile?.phone}</p>
          <p className="text-gray-600 mt-2">{profile?.role}</p>
        </div>
        
      </div>
    </div>
  );
}

export default MyProfile;
