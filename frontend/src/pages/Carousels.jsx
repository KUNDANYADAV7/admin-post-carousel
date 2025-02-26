import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Carousels() {
  const { carousels } = useAuth();

  return (
    <div>
      <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-7 my-12 p-4 mt-24">
        <h1 className="text-3xl font-bold text-center mb-8">All carousels goes here!!!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {carousels && carousels.length > 0 ? (
            carousels
              .slice() // Create a shallow copy to avoid mutating the original array
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by most recent
              .map((carousel, index) => (
                <Link
                  to={`/single-carousel/${carousel._id}`}
                  key={index}
                  className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={carousel?.image?.url}
                    alt={carousel?.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                  
                  {/* Date at the top */}
                  <div className="absolute top-2 left-2  bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {new Date(carousel?.createdAt).toLocaleDateString()}
                  </div>

                  {/* Title and Category at the bottom */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-lg font-semibold">{carousel?.title}</h2>
                    <p className="text-sm">{carousel?.category}</p>
                  </div>
                </Link>
              ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Carousels;
