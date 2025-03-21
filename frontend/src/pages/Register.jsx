


import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import config from "../config";

function Register() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [loading, setLoading] = useState(false); // Prevent multiple clicks

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple clicks
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    // formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      const { data } = await axios.post(
        `${config.apiUrl}/api/users/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // localStorage.setItem("jwt", data.token); // Store token in localStorage
      toast.success(data.message || "User registered successfully");

      setProfile(data.user); // Update profile state
      // setIsAuthenticated(true); // Update authentication state

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      // setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");

      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleRegister}>
        <div className="flex justify-center items-center w-full mb-6">
  <img src="/LG.jpg" alt="CilliBlog Logo" className="h-20 w-25" />
</div>
          <h1 className="text-xl font-semibold mb-6">Register</h1>

    

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />

          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />

          {/* <input
          inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          /> */}

<input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  placeholder="Your Phone Number"
  value={phone}
  onChange={(e) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (inputValue.length <= 10) {
      setPhone(inputValue); // Allow only up to 10 digits
    }
  }}
  maxLength={10} // Prevents typing more than 10 characters
  className="w-full p-2 mb-4 border rounded-md"
  required
/>



          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
{/* <div className="flex items-center mb-4">
  <div className="photo w-20 h-20 mr-4 flex items-center justify-center border-none overflow-hidde">
    {photoPreview ? (
      <img src={photoPreview} alt="Selected" className="w-full h-full object-cover" />
    ) : (
      <FaUserCircle className="text-gray-500 text-6xl" />
    )}
  </div>
  
  <input
    type="file"
    onChange={changePhotoHandler}
    className="w-full p-2 border rounded-md"
  />
</div> */}
  


          <button
            type="submit"
            className="w-full p-2 text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-md"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;


