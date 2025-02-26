import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import config from "../../config";

function MyCarouselS() {
  const [carousels, setCarousels] = useState([]);

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const { data } = await axios.get(`${config.apiUrl}/api/carousel/all-carousels`, {
          withCredentials: true,
        });
        setCarousels(data);
      } catch (error) {
        console.error("Error fetching carousels:", error);
      }
    };
    fetchCarousels();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${config.apiUrl}/api/carousel/delete-carousel/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message || "Carousel deleted successfully");
      setCarousels((prev) => prev.filter((carousel) => carousel._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete carousel");
    }
  };

  return (
    <div className="container mx-auto my-12 md:ml-3 p-4">
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-60">
      {carousels.length > 0 ? (
        carousels.map((item) => (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden" key={item._id}>
            {item.image && (
              <img
                src={item.image.url}
                alt="carouselImg"
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h4 className="text-xl font-semibold my-2">{item.title}</h4>
              <p className="text-gray-600">{item.description}</p>
             <div className="flex justify-between mt-4">
                                 <Link
                                   to={`/carousel/update-carousel/${item._id}`}
                                   className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                                 >
                                   UPDATE
                                 </Link>
                                 <button
                                   onClick={() => handleDelete(item._id)}
                                   className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                                 >
                                   DELETE
                                 </button>
                               </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No carousel items found!</p>
      )}
    </div>
  </div>
  );
}

export default MyCarouselS;
