import express from "express";
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile, deleteUser, createBlog, getAllBlogs, getBlog, updateBlog, deleteBlog, addComment, removeComment, addLike, removeLike, getLikes, getNotification } from "../Contolers/controler.js";
import { checkAuthenticaion } from "../Middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// User Routes
router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", checkAuthenticaion, getUserProfile);
router.put("/profile/update", checkAuthenticaion, upload.single("avatar"), updateUserProfile);
router.delete("/delete", checkAuthenticaion, deleteUser);

// Blog Routes
router.post("/create-blog", checkAuthenticaion, upload.single("coverImage"), createBlog);
router.get("/all-blogs", getAllBlogs);
router.get("/blog/:blogId", getBlog);
router.put("/blog/update", checkAuthenticaion, updateBlog);
router.delete("/blog/delete", checkAuthenticaion, deleteBlog);

// Comment Routes
router.post("/blog/:blogId/comment", checkAuthenticaion, addComment);
router.delete("/comment/remove", checkAuthenticaion, removeComment);

// Like Routes
router.post("/blog/:blogId/like", checkAuthenticaion, addLike);  // Add a like to a blog post
router.get("/blog/:blogId/likes", getLikes);  // Get all likes for a blog post
router.delete("/blog/:blogId/unlike", checkAuthenticaion, removeLike);  // Remove a like from a blog post

//Notificatio Route
router.get("/notification",checkAuthenticaion, getNotification);  // Get all likes for a blog post


export default router;
