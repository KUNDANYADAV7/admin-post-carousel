import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import config from "../config";

function Login() {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();

  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${config.apiUrl}/api/users/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("jwt", data.token); // storing token in localStorage so that if user refreshed the page it will not redirect again in login
      toast.success(data.message || "User Logined successfully", {
        duration: 3000,
      });
      setProfile(data?.user);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message || "Please fill the required fields",
        {
          duration: 3000,
        }
      );
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleLogin}>
            <div className="font-semibold text-xl items-center text-center">
            <div className="flex justify-center items-center w-full mb-6">
  <img src="/LG.jpg" alt="CilliBlog Logo" className="h-20 w-25" />
</div>
            </div>
            <h1 className="text-xl font-semibold mb-6">Login</h1>
           

            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2  border rounded-md"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2  border rounded-md"
              />
            </div>

            <p className="text-center mb-4">
              New User?{" "}
              <Link to={"/register"} className="text-blue-600">
                Register Now
              </Link>
            </p>

            <p className="text-center mb-4">
            <Link to="/forgot-password" className="text-red-500">Forgot Password?</Link>
          </p>

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
