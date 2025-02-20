import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Carousels() {
  const { carousels } = useAuth();

  console.log(carousels);
  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <h1 className="text-2xl font-bold mb-6">All carousels goes here!!!</h1>
        {/* <p className="text-center mb-8">
          The concept of gods varies widely across different cultures,
          religions, and belief systems
        </p> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {carousels && carousels.length > 0 ? (
            carousels.map((carousel, index) => (
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
