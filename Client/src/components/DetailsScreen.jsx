import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addComment, addLike } from "../services/api";

const DetailsScreen = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const post = useSelector((state) => state.post.posts);

  useEffect(() => {
    if (post && post.comments) {
      setReviews(post.comments);
      setLikes(post.likes.length);
    }
  }, [post]);

  // Handle adding a new review
  const handleAddReview = async(blogId,content) => {
  
   await addComment(blogId,content).then((res)=>{
    setNewReview('')

   }).catch((error)=> console.log(error))
  };

  // Handle like button
  const handleLike = async(blogId) => {
   await addLike(blogId).then(()=>{
    console.log("liked");
   }).catch((error)=>console.log("Error : ",error)
   )
    setLiked(!liked);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Image with Rounded Corners */}
      <div className="relative w-full ">
        <img
          src={post.coverImage || "https://via.placeholder.com/300"}
          alt="Cover"
          className="w-full min-h-full object-cover rounded-b-3xl cursor-pointer"
          onClick={() => setImageModalOpen(true)} // Open the modal when clicked
        />
        {/* Heart Icon for Likes */}
        <div
          className="absolute top-4 right-4 bg-white bg-opacity-70 p-2 rounded-full shadow-md flex items-center space-x-1 cursor-pointer"
          onClick={()=>handleLike(post._id)}
        >
          <span
            role="img"
            aria-label="Heart"
            className={`text-xl transition-transform duration-200 ${liked ? "text-red-500 scale-125 animate-pulse" : "text-gray-500 scale-100"}`}
          >
            ❤️
          </span>
          <span className="text-gray-700 text-sm">{likes}</span>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {imageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setImageModalOpen(false)} // Close the modal when clicked outside the image
        >
          <img
            src={post.coverImage || "https://via.placeholder.com/300"}
            alt="Cover"
            className="w-full h-auto max-w-4xl object-contain"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">{post.title || "Post Title"}</h1>

        {/* Tab Options */}
        <div className="flex justify-around border-b mb-4">
          <button
            className={`pb-2 text-lg ${activeTab === "description" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`pb-2 text-lg ${activeTab === "reviews" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "description" && (
            <div>
              <p className="text-gray-600">
                {post.description || "Description not available."}
              </p>
              <div className="mt-6 flex items-center space-x-4" style={{ paddingBottom: "110px" }}>
          <img
            src={post.author?.avatar || "https://via.placeholder.com/50"}
            alt="Author"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-bold text-gray-800">{post.author?.userName || "Unknown Author"}</p>
            <p className="text-sm text-gray-500">Author</p>
          </div>
        </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              {/* Review Form */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Add Your Review</h2>
                <div className="space-y-2">
                  <textarea
                    placeholder="Your Review"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    rows="3"
                    value={newReview}
                    onChange={(e)=>setNewReview(e.target.value)}
                  />
                   <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm md:text-base hover:from-blue-600 hover:to-purple-600 transition"onClick={(e) =>  handleAddReview(post._id,newReview)}>
               Submit
            </button>
                </div>
              </div>

              {/* Review List */}
              <div className="mb-8">  
                {reviews.map((review) => (
                  <div key={review._id} className="flex items-start space-x-4 border-b py-4">
                    <img src={review.author?.avatar} alt={review.author?.userName} className="w-10 h-10 rounded-full" />
                    <div>
                      <h3 className="font-semibold text-gray-700">{review.author?.userName}</h3>
                      <p className="text-gray-600">{review.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsScreen;
