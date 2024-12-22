import React, { useState, useEffect } from "react";
import { getBlogs, getNotifications, markAllAsRead } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";

const HomePage = () => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch Posts
  useEffect(() => {
    if (!hasMore) return;
    (async () => {
      try {
        setLoading(true);
        const response = await getBlogs(page, 4);
        const newPosts = response.data.data;

        if (response.data.totalPage === response.data.currentPage) {
          setHasMore(false); // No more data to fetch
        } else {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        }
        setLoading(false);
      } catch (error) {
        setHasMore(false);
        setLoading(true);
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  // Infinite Scroll Handler
  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  // Fetch Notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        try {
          const response = await getNotifications();
          setNotifications(response.data.userNotification);
          const unread = response.data.userNotification.filter(
            (notif) => !notif.isRead
          ).length;
          setUnreadCount(unread);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };
    fetchNotifications();
  }, [user]);

  // Mark Notifications as Read
  const markAsRead = async () => {
    try {
      await markAllAsRead();
      setUnreadCount(0);
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return (
    <div className=" min-h-screen pb-16 p-6 relative">
      {/* Header with Notifications */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <img
            src="/DALL·E 2024-12-21 23.17.36 - A vibrant and playful logo for a fun blogging app. The design features a colorful pen or pencil stylized into a smiling character, surrounded by brigh.webp"
            className="h-8 rounded-lg"
          />
          <h1 className="text-2xl font-bold">Fun-BLog</h1>
        </div>
        <Menu as="div" className="relative">
          <Menu.Button className="relative flex items-center text-gray-700">
            <FaBell className="text-2xl" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2">
                {unreadCount}
              </span>
            )}
          </Menu.Button>
          <Transition>
            <Menu.Items className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-4 max-h-72 overflow-scroll">
                <h3 className="text-sm font-semibold mb-2">Notifications</h3>
                {notifications.length > 0 ? (
                  notifications
                    .slice()
                    .reverse()
                    .map((notif, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded-md ${
                          notif.isRead ? "bg-gray-100" : "bg-blue-100"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {notif.sender?.avatar && (
                            <Link to={`/profile/${notif.sender._id}`}>
                              <img
                                src={notif.sender.avatar}
                                alt={`${notif.sender.userName}'s avatar`}
                                className="w-8 h-8 rounded-full"
                              />
                            </Link>
                          )}
                          <div className="text-sm">
                            <strong>{notif.sender?.userName}</strong>{" "}
                            {notif.type}{" "}
                            {notif.blog ? (
                              <Link to={`/details/${notif.blog._id}`}>
                                <p>{notif.blog.title.slice(0, 28)}.....</p>
                              </Link>
                            ) : (
                              "your profile"
                            )}
                          </div>
                        </div>
                        <span className="text-xs">
                          {new Date(notif.createdAt).toLocaleString()}
                        </span>
                      </div>
                    ))
                ) : (
                  <p className="text-sm">No notifications</p>
                )}
              </div>
              <button
                onClick={markAsRead}
                className="w-full text-sm text-blue-500 px-4 py-2"
              >
                Mark all as read
              </button>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {posts.map((post, index) => (
          <div key={index} className="rounded-lg shadow-md overflow-hidden">
            <Link to={`/details/${post?._id}`}>
              <img
                src={post?.coverImage}
                alt={post?.title}
                className="h-48 w-full object-cover"
              />
            </Link>
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <Link
                  to={
                    post.author?._id === user?._id
                      ? `userProfile`
                      : `/profile/${post?.author?._id}`
                  }
                >
                  <img
                    src={post?.author?.avatar}
                    alt={post?.author?.userName}
                    className="w-12 h-12 rounded-full"
                  />
                </Link>
                <span className="text-sm font-semibold">
                  {post?.author?.userName}
                </span>
              </div>
              <h3 className="text-xl font-semibold mt-2">{post?.title}</h3>
              <p className="mt-2 text-sm">
                {post?.description.slice(0, 100)}...
              </p>
              <Link to={`/details/${post?._id}`}>
                <button className="text-purple-500 hover:text-blue-500 focus:text-purple-500 mt-2 text-sm transition">
                  Read more
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="rounded-lg shadow-md overflow-hidden">
              <div className="h-40 w-full bg-gray-200"></div>
              <div className="p-4 space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-40 h-6 bg-gray-200 rounded"></div>
                <div className="w-full h-4 bg-gray-200 rounded"></div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
