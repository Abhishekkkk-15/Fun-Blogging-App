import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addComment, addLike, getBlog, removeLike } from "../services/api";
import { Link, useParams } from "react-router-dom";

const DetailsScreen = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [post, setPost] = useState([])
  const [newReview, setNewReview] = useState('');
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [postId, setPostId] = useState('')
  const [notLogged, setNotLoged] = useState(false)

  const user = useSelector((state) => state.user?.userData);
  const { identifier } = useParams();
  useEffect(() => {
    (async () => {
      try {
        await getBlog(identifier).then((res) => {
          setPost(res.data.data[0])
          setLikes(res.data.data[0]?.likes?.length);
          setReviews(res.data.data[0]?.comments);
          setPostId(res.data.data[0]?._id)
          if (res.data.data[0]?.likes?.some(like => like.user?._id == user?._id)) {
            setLiked(true);
          }
        })
      } catch (error) {
        console.error(error)
      }
    })()
  }, [liked]);

  // Handle adding a new review
  const handleAddReview = async (blogId, content) => {
    if (!user) {
      setNotLoged(true)
      setTimeout(() => {
        setNotLoged(false)
      }, 1000);
      return null
    }

    await addComment(blogId, content).then((res) => {
      setReviews([...reviews, res.data.data]);
      setNewReview('')

    }).catch((error) => console.error(error))
  };

  // Handle like button
  const handleLike = async (blogId) => {
    if (!user) {
      setNotLoged(true)
      setTimeout(() => {
        setNotLoged(false)
      }, 3000);
      return null
    }

    if (post.likes?.some(like => like.user?._id == user?._id)) {

      await removeLike(blogId).then(() => {
        setLiked(!liked);
      })
      return
    }
    await addLike(blogId).then(() => {
      setLiked(!liked);

    }).catch((error) => console.error("Error : ", error)
    )
  };



  return (
    <div className="min-h-screen bg-white px-4 py-8 lg:flex lg:justify-between lg:space-x-6 lg:px-16">
    {notLogged && (
      <span
        className="bg-gray-400 h-8 w-36 text-white z-50 fixed ml-24 mt-20 text-center rounded-full transition ease-in-out duration-1000"
        role="alert"
      >
        Login First!!
      </span>
    )}
  
    {/* Image Section */}
    <div className="relative w-full lg:w-1/2 lg:h-auto">
      <img
        src={post?.coverImage || "https://via.placeholder.com/300"}
        alt="Cover"
        className="w-full h-full object-contain rounded-lg shadow-md cursor-pointer"
        onClick={() => setImageModalOpen(true)} // Open the modal when clicked
      />
      <div
        className="absolute top-4 right-4 bg-white bg-opacity-70 p-2 rounded-full shadow-md flex items-center space-x-1 cursor-pointer"
        onClick={() => handleLike(postId)}
      >
        <span
          role="img"
          aria-label="Heart"
          className={`text-xl transition-transform duration-200 ${liked ? "text-red-500 scale-125 animate-pulse" : "text-gray-500 scale-100"}`}
        >
          <i className={`fa-${liked ? "solid" : "regular"} fa-heart`}></i>
        </span>
        <span className="text-gray-700 text-sm mr-8">{likes}</span>
      </div>
    </div>
  
    {/* Info Section */}
    <div className="w-full lg:w-1/2 p-6 lg:py-0">
      <h1 className="text-2xl font-bold mb-3">{post?.title || "Post Title"}</h1>
      <div className="mt-4 flex items-center space-x-4 border-y-2 py-2 mb-3">
        <Link
          to={
            post?.author?._id === user?._id || user?.userId
              ? `/userProfile`
              : `/profile/${post?.author?._id}`
          }
        >
          <img
            src={post?.author?.avatar || "https://via.placeholder.com/50"}
            alt="Author"
            className="w-14 h-14 rounded-full border-2 border-purple-500"
          />
        </Link>
        <div>
          <p className="font-bold text-gray-800 text-lg">{post?.author?.userName || "Unknown Author"}</p>
          <div className="text-gray-500 text-sm flex flex-row">
            {`${new Date(post?.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}`}
            <span className="ml-3">{`${reviews.length} Comments`}</span>
          </div>
        </div>
      </div>
  
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
  
      <div>
        {activeTab === "description" && (
          <p className="text-gray-600 mb-9">
            {post?.description || "Description not available."}
          </p>
        )}
  
        {activeTab === "reviews" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Add Your Review</h2>
            <textarea
              placeholder="Your Review"
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="3"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <button
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm hover:from-blue-600 hover:to-purple-600 mt-2"
              onClick={(e) => handleAddReview(identifier, newReview)}
            >
              Submit
            </button>
  
            <div className="mt-4 h-48 overflow-y-scroll">
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