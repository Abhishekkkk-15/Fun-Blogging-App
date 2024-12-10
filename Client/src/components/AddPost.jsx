import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaImage, FaTimes } from "react-icons/fa";
import { addNewPost } from "../services/api.jsx"; // Assuming you have an API service for this
import { setPost } from "../app/Slices/postReducer";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // New state for category
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // List of available categories
  const categories = [
    "Technology",
    "Anime",
    "Lifestyle",
    "Health",
    "Education",
    "Business",
    "Finance",
    "Travel",
    "Food",
    "Fitness",
    "Sports",
    "Entertainment",
    "Politics",
    "Science",
    "Art",
    "Culture",
    "Gaming",
    "Music",
    "Movies",
    "Fashion",
    "Photography",
    "Books",
    "News",
    "Marketing",
    "History",
    "Religion",
    "Parenting",
    "Environment",
    "Psychology",
    "Self-Improvement",
    "Startup",
    "Design",
    "Architecture",
    "Real Estate",
    "Automotive",
    "Sports & Recreation",
    "Social Media",
    "Artificial Intelligence",
    "Machine Learning",
    "Blockchain",
    "Crypto",
    "E-commerce",
    "Web Development",
    "Mobile Development",
    "AI/Robotics",
    "Sustainability",
    "Non-profit",
    "Technology News",
    "Legal",
    "Education & Training",
    "Personal Finance",
    "Career",
    "Mental Health",
    "Human Resources",
    "Hobbies",
    "Travel Guides",
    "Adventure",
    "DIY",
    "Tech Reviews",
    "Software Reviews",
    "Gadgets",
    "Space",
    "Pets",
    "Home & Garden",
    "Crafts",
    "Local News",
    "Community",
    "Events",
    "Pop Culture",
    "Celebrities",
    "Philanthropy",
    "Charity",
    "Innovation",
    "Science Fiction",
    "Motivation",
    "Entrepreneurship",
    "Customer Service",
    "Productivity",
    "Job Search",
    "College",
    "University",
    "Health & Wellness",
    "Nutrition",
    "Parenthood",
    "Vegan",
    "Yoga",
    "Mindfulness",
    "Sustainability",
    "Smart Homes",
    "Smart Devices",
    "Green Tech",
    "IoT (Internet of Things)"
  ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !coverImage) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category); // Append category to form data
      formData.append("coverImage", coverImage);

      const response = await addNewPost(formData);
      const newPost = response.data;
      dispatch(setPost(newPost));
    //   navigate(`/details/${newPost.id}`); // Redirect to the newly created post details page
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Error while creating the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl mb-10"
      >
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Enter post title"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Enter post description"
          />
        </div>

        {/* Category Select */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
          >
            <option value="">Select a Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Cover Image</label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="cover-image-input"
            />
            <label
              htmlFor="cover-image-input"
              className="cursor-pointer flex items-center text-blue-500"
            >
              <FaImage className="mr-2" /> Choose Image
            </label>
            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute top-0 right-0 bg-white rounded-full p-1 text-red-500"
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-gradient-to-r from-blue-500 to-purple-500"
            } text-white py-2 px-6 rounded-md transition-all duration-300 hover:from-blue-600 hover:to-purple-600`}
          >
            {loading ? "Submitting..." : "Add Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
