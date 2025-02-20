import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function UpdateCarousel() {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const { fetchCarousels } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result);
        setImage(file);
      };
    }
  };

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/carousel/single-carousel/${id}`,
          { withCredentials: true }
        );

        setTitle(data?.title);
        setDescription(data?.description);
        setImage(data?.image?.url);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch carousel details");
      }
    };
    fetchCarousel();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      const { data } = await axios.put(
        `http://localhost:4001/api/carousel/update-carousel/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message || "Carousel updated successfully");
      navigateTo("/");
      fetchCarousels();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <section className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">UPDATE CAROUSEL</h3>
        <form>
          <input
            type="text"
            placeholder="Carousel Title"
            className="w-full p-2 mb-4 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Image</label>
            <img
              src={imagePreview ? imagePreview : image ? image : "/imgPL.webp"}
              alt="Carousel"
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              onChange={changePhotoHandler}
            />
          </div>
          <textarea
            rows="6"
            className="w-full p-2 mb-4 border rounded-md"
            placeholder="Carousel Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleUpdate}
          >
            UPDATE
          </button>
        </form>
      </section>
    </div>
  );
}

export default UpdateCarousel;
