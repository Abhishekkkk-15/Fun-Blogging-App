import { Router } from "express";
import {upload} from '../Middlewares/multerConfig.js'
import { createBlog, deleteBlog, deleteUser, getAllBlogs, getBlog, getBlogsByUser, getUserProfile, loginUser, logoutUser, registerUser, updateBlog, updateUserProfile } from "../Contolers/controler.js";
import { checkAdmin, checkAuthenticaion } from "../Middlewares/authMiddleware.js";

const router = Router()

router.route('/registerUser').post(upload.single('pfp'),registerUser)
router.route('/loginUser').post(loginUser)
router.route('/logoutUser').post(checkAuthenticaion,logoutUser)
router.route('/getUserProfile').post(checkAdmin,getUserProfile)
router.route('/updateUserProfile').post(checkAuthenticaion,upload.single('pfp'),updateUserProfile)
router.route('/deleteUser').post(checkAdmin,deleteUser)
router.route('/createBlog').post(checkAuthenticaion,upload.single('blog'),createBlog)
router.route('/getAllBlogs').post(getAllBlogs)
router.route('/getBlog').post(checkAuthenticaion,getBlog)
router.route('/updateBlog').post(checkAuthenticaion,updateBlog)
router.route('/deleteBlog').post(checkAuthenticaion,deleteBlog)
router.route('/blogsByUser').post(checkAuthenticaion,getBlogsByUser)

export default router