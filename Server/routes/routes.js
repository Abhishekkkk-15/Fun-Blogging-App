import express from "express";
import { registerUser, loginUser, logoutUser,getUserInfo, getUserProfile, updateUserProfile, deleteUser, createBlog, getAllBlogs, getBlog, updateBlog, deleteBlog, addComment, removeComment, addLike, removeLike, getLikes, getNotification, search, addFollowers, removeFollower, markAllASRead, requestPasswordReset, resetPassword } from "../Contolers/controler.js";
import { checkAuthenticaion } from "../Middlewares/authMiddleware.js";
import multer from "multer";
import { sendResetEmail } from "../Middlewares/mailSender.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// User Routes
router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/profile", getUserProfile);
router.put("/profile/update", checkAuthenticaion, upload.single("avatar"), updateUserProfile);
router.delete("/delete", checkAuthenticaion, deleteUser);
router.post("/userinfo",checkAuthenticaion,getUserInfo)

// Blog Routes
router.post("/create-blog", checkAuthenticaion, upload.single("coverImage"), createBlog);
router.get("/all-blogs", getAllBlogs);
router.get("/blog/:identifier", getBlog);
router.put("/blog/update", checkAuthenticaion, updateBlog);
router.post("/blog/delete", deleteBlog);

// Comment Routes
router.post("/blog/:blogId/comment", checkAuthenticaion, addComment);
router.delete("/comment/remove", checkAuthenticaion, removeComment);

// Like Routes
router.post("/blog/:blogId/like", checkAuthenticaion, addLike);  // Add a like to a blog post
router.get("/blog/:blogId/likes", getLikes);  // Get all likes for a blog post
router.delete("/blog/:blogId/unlike", checkAuthenticaion, removeLike);  // Remove a like from a blog post

//Notificatio Route
router.get("/notification",checkAuthenticaion, getNotification);  // Get all likes for a blog post

//Search Rotue
router.get('/search',search)

//Follow Route
router.put('/follow',checkAuthenticaion,addFollowers)
router.put('/UnFollow',checkAuthenticaion,removeFollower)
router.post('/notification/markAllAsRead',checkAuthenticaion,markAllASRead)

//Reset Password
router.post('/reset-email',requestPasswordReset)
router.post('/reset-password',resetPassword)
export default router;
