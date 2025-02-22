// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";

// function CarouselDetail() {
//   const { id } = useParams();
//   const [blogs, setblogs] = useState({});
//   console.log(blogs);
//   useEffect(() => {
//     const fetchblogs = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:4001/api/carousel/single-carousel/${id}`,

//           {
//             withCredentials: true,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log(data);
//         setblogs(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchblogs();
//   }, [id]);
//   return (
//     <div>
//       <div>
//         {blogs && (
//           <section className="container mx-auto p-4">
//             <div className="text-blue-500 uppercase text-xs font-bold mb-4">
//               {blogs?.category}
//             </div>
//             <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
//             <div className="flex items-center mb-6">
//               <img
//                 src={blogs?.adminPhoto}
//                 alt="author_avatar"
//                 className="w-12 h-12 rounded-full mr-4"
//               />
//               <p className="text-lg font-semibold">{blogs?.adminName}</p>
//             </div>

//             <div className="flex flex-col md:flex-row">
//               {blogs?.blogImage && (
//                 <img
//                   src={blogs?.blogImage?.url}
//                   alt="mainblogsImg"
//                   className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
//                 />
//               )}
//               <div className="md:w-1/2 w-full md:pl-6">
//                 <p className="text-lg mb-6">{blogs?.about}</p>
//                 {/* Add more content here if needed */}
//               </div>
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CarouselDetail;





import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CarouselDetail() {
  const { id } = useParams();
  const [carousel, setCarousel] = useState({});

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/carousel/single-carousel/${id}`,
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
      }
    };
    fetchCarousel();
  }, [id]);

  return (
    <div>
      {carousel ? (
        <section className="container mx-auto p-4">
          <h1 className="text-4xl font-bold mb-4">{carousel.title}</h1>
          <p className="text-lg mb-4">{carousel.description}</p>
          {carousel.image && (
            <img
              src={carousel.image.url}
              alt={carousel.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          )}
          <p className="text-sm text-gray-500 mt-2">
            Created on: {new Date(carousel.createdAt).toLocaleDateString()}
          </p>
        </section>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default CarouselDetail;
