import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";

const Register = () => {
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const [regDetail, setRegDetail] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const [preview, setPreview] = useState("");

  // Check for saved theme in localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setRegDetail((prev) => ({
      ...prev,
      [name]: name === "avatar" ? files[0] : value,
    }));

    // Set preview for avatar
    if (name === "avatar" && files[0]) {
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", regDetail.name);
    formData.append("userName", regDetail.userName);
    formData.append("email", regDetail.email);
    formData.append("password", regDetail.password);
    formData.append("avatar", regDetail.avatar);


    try {
      const res = await signup(formData);
      console.log(res);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg)
      console.error(err);
    }
  };

  return (
    <div
      className={`min-h-screen mb-12 ${theme === "light" ? "bg-gray-100" : "bg-gray-800"
        } flex flex-col items-center justify-center p-4`}
    >
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full"
      >
        {theme === "light" ? "🌙" : "🌞"}
      </button>
      <div
        className={`w-full max-w-lg p-6 ${theme === "light" ? "bg-white" : "bg-gray-700"
          } rounded-lg shadow-lg`}
      >
        <h2
          className={`text-center text-2xl font-semibold ${theme === "light" ? "text-gray-800" : "text-white"
            } mb-6`}
        >
          Register
        </h2>

        {/* Avatar Upload Section */}
        <div className="flex justify-center mb-6">
          <img
            src={preview || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-gray-300"
          />
        </div>
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-800 border-l-4 border-red-500 p-2 mb-4">
            {error}
          </div>)}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={regDetail.name}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Username Input */}
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={regDetail.userName}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your unique username"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={regDetail.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={regDetail.password}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a new password"
              required
            />
          </div>

          {/* Avatar Upload Input */}
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
             className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-large hover:from-blue-600 hover:to-purple-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
