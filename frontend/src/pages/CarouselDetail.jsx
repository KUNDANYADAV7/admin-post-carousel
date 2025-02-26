


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";

function CarouselDetail() {
  const { id } = useParams();
  const [carousel, setCarousel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/api/carousel/single-carousel/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setCarousel(data);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCarousel();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen mt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="container mx-auto p-6 mt-24">
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        {/* Title and Created Date Row */}
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-3xl font-bold text-gray-800">{carousel?.title}</h1>
          <p className="text-sm text-gray-500">
            Created on: {new Date(carousel?.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-4">{carousel?.description}</p>

        {/* Image */}
        {carousel?.image && (
          <img
            src={carousel.image.url}
            alt={carousel.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        )}
      </div>
    </section>
  );
}

export default CarouselDetail;
