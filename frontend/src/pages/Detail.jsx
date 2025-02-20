  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import toast from "react-hot-toast";
  import { useParams } from "react-router-dom";

  function Detail() {
    const { id } = useParams();
    const [blogs, setblogs] = useState({});
    console.log(blogs);
    useEffect(() => {
      const fetchblogs = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:4001/api/blogs/single-blog/${id}`,

            {
              withCredentials: true,
              headers: {
                  "Content-Type": "application/json",
              },
            }
          );
          console.log(data);
          setblogs(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchblogs();
    }, [id]);
    return (
      <div>
        <div>
          {blogs && (
            <section className="container mx-auto p-4">
              <div className="text-blue-500 uppercase text-xs font-bold mb-4">
                {blogs?.category}
              </div>
              <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
              <div className="flex items-center mb-6">
                <img
                  src={blogs?.adminPhoto}
                  alt="author_avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <p className="text-lg font-semibold">{blogs?.adminName}</p>
              </div>

              <div className="flex flex-col md:flex-row">
                {blogs?.blogImage && (
                  <img
                    src={blogs?.blogImage?.url}
                    alt="mainblogsImg"
                    className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
                  />
                )}
                <div className="md:w-1/2 w-full md:pl-6">
                  <p className="text-lg mb-6">{blogs?.about}</p>
                  {/* Add more content here if needed */}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  export default Detail;



// import React from "react";
// import { useAuth } from "../context/AuthProvider";
// import { Link } from "react-router-dom";

// function Detail() {
//   const { blogs } = useAuth();
//   console.log(blogs);
//   return (
//     <div className=" container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
//       {blogs && blogs.length > 0 ? (
//         blogs.slice(0, 4).map((element) => {
//           return (
//             <Link
//               to={`/blog/${element._id}`}
//               key={element._id}
//               className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
//             >
//               <div className="group relative">
//                 <img
//                   src={element.blogImage.url}
//                   alt=""
//                   className="w-full h-56 object-cover"
//                 />
//                 <div className=" absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300"></div>
//                 <h1 className=" absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300">
//                   {element.title}
//                 </h1>
//               </div>
//               <div className="p-6 flex items-center">
//                 <img
//                   src={element.adminPhoto}
//                   alt=""
//                   className="w-12 h-12 rounded-full border-2 border-yellow-400"
//                 />
//                 <div className="ml-4">
//                   <p className="text-lg font-semibold text-gray-800">
//                     {element.adminName}
//                   </p>
//                   <p className="text-xs text-gray-400">New</p>
//                 </div>
//               </div>
//             </Link>
//           );
//         })
//       ) : (
//         <div className=" flex h-screen items-center justify-center">
//           Loading....
//         </div>
//       )}
//     </div>
//   );
// }

// export default Detail;
