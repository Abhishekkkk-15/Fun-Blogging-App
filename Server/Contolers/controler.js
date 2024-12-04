import { config } from "dotenv";
import uploadOnCloudinary from "../Middlewares/cloudinary.js";
import { Blog, User, Comment, Like, Notification } from "../Schema/schema.js";
import jwt from 'jsonwebtoken';

config();

// Register User
const registerUser = async (req, res) => {
    const { userName, password, email } = req.body;
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }] // Check if email or username already exists
    });

    if (existedUser) return res.status(400).json({ msg: "Email or UserName Already Exists" });

    const pfp = req.file?.path;
    try {
        const avatar = await uploadOnCloudinary(pfp);
        await User.create({
            userName,
            password,
            email,
            avatar
        });
        res.status(201).json({ msg: "User Registered!" });
    } catch (error) {
        console.log("Error registering user", error);
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const user = await User.findOne({ $or: [{ userName: userId }, { email: userId }] });
        if (!user) return res.status(400).json({ msg: "User Not Found" });

        if (user.password !== password) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const accessToken = jwt.sign({
            userName: user.userName,
            userId: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            avatar: user.avatar
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const refreshToken = jwt.sign({
            userName: user.userName,
            userId: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            avatar: user.avatar
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

        res.status(200).cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'None',
        }).json({ msg: "User Logged In!",data:user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Logout User
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        res.status(200).json({ msg: "User Logged Out!" });
    } catch (error) {
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Get User Profile
const getUserProfile = async (req, res) => {
    const userInfo = req.body.userId;
    try {
        const userProfile = await User.findOne({ $or: [{ userName: userInfo }, { email: userInfo }] });
        if (!userProfile) {
            return res.status(404).json({ msg: "User Not Found!" });
        }
        res.status(200).json({ msg: "User Found", data: userProfile });
    } catch (error) {
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    const { userName, email, bio } = req.body;
    const userId = req.user.userId;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User Not Found!" });

        user.userName = userName || user.userName;
        user.email = email || user.email;
        user.bio = bio || user.bio;

        if (req.file) {
            const avatar = await uploadOnCloudinary(req.file?.path);
            user.avatar = avatar;
        }

        const updatedUser = await user.save();
        res.status(200).json({ msg: "User Profile Updated!", data: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findOneAndDelete({ $or: [{ email: userId }, { userName: userId }] });
        if (!user) return res.status(404).json({ msg: "User Not Found!" });

        res.status(200).json({ msg: "User Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Create Blog
const createBlog = async (req, res) => {
    const { title, category ,description} = req.body;
    const img = req.file?.path;
    const author = req.user.userId;

    if (!title || !img) return res.status(400).json({ msg: "Title and Blog Image are required!" });

    try {
        const coverImage = await uploadOnCloudinary(img);
        const newPost = new Blog({
            title,
            coverImage,
            author,
            category,
            description
        });
        await newPost.save();
        res.status(201).json({ msg: "Blog Created Successfully!" });
    } catch (error) {
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Get All Blogs with Pagination
const getAllBlogs = async (req, res) => {
    try {
        const { page = 1, limit = 1 } = req.query; // Default pagination parameters
        const blogs = await Blog.find()
            .skip((page - 1) * limit) // Pagination logic
            .limit(parseInt(limit)) // Limit results
            .populate('author','userName avatar')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'userName avatar'
                }
            })
            .populate({
                path: 'likes',
                populate: {
                    path: 'user',
                    select: 'userName'
                }
            });

        if (!blogs.length) return res.status(404).json({ msg: "No Blogs Found!" });
        res.status(200).json({ msg: "Blogs Found", data: blogs });
    } catch (error) {
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Get Single Blog
const getBlog = async (req, res) => {
    const { blogId } = req.body;
    try {
        const blog = await Blog.findById(blogId).populate('comments').populate('likes');
        if (!blog) return res.status(404).json({ msg: "Blog Not Found!" });

        res.status(200).json({ msg: "Blog Found!", data: blog });
    } catch (error) {
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Update Blog
const updateBlog = async (req, res) => {
    const { blogId, title } = req.body;
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ msg: "Blog Not Found!" });

        blog.title = title || blog.title;
        const updatedBlog = await blog.save();

        res.status(200).json({ msg: "Blog Updated!", data: updatedBlog });
    } catch (error) {
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Delete Blog
const deleteBlog = async (req, res) => {
    const { blogId } = req.body;
    try {
        await Blog.findByIdAndDelete(blogId);
        res.status(200).json({ msg: "Blog Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Add Comment
const addComment = async (req, res) => {
    // Route for this http://localhost:8000/fun-blog/blog/{674bfa78abfa0a6759fc52b6}/comment
    try {
        const { blogId } = req.params;
        const { content } = req.body;
        const { userId } = req.user

        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ msg: "Blog Not Found!" });

        const comment = await Comment.create({
            content,
            blog: blogId,
            author: req.user.userId
        });

        if (blog.author.toString() !== userId) {
            await Notification.create({
                recipient: blog.author,
                type: 'comment',
                blog: blogId,
                comment: comment._id
            })
        }

        blog.comments.push(comment.id);
        await blog.save();
        res.status(201).json({ msg: "Comment Added!", comment });
    } catch (error) {
        res.status(500).json({ msg: `Error Adding Comment: ${error.message}` });
    }
};

// Remove Comment
const removeComment = async (req, res) => {
    const { commentId } = req.body;
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) return res.status(404).json({ msg: "Comment Not Found!" });

        res.status(200).json({ msg: "Comment Removed!" });
    } catch (error) {
        res.status(500).json({ msg: `Error Removing Comment: ${error.message}` });
    }
};


// Add Like to Blog

const addLike = async (req, res) => {
    const { blogId } = req.params;  // Extract blog ID from request parameters
    const userId = req.user.userId;  // Get the user ID from the authenticated user

    try {
        // Check if the user has already liked the blog
        const existingLike = await Like.findOne({ blog: blogId, user: userId });
        if (existingLike) {
            return res.status(400).json({ msg: "You have already liked this blog!" });
        }

        // Create a new Like entry in the database
        const newLike = new Like({
            blog: blogId,
            user: userId
        });

        await newLike.save();

        // Add the new like to the blog's 'likes' array
        const blog = await Blog.findById(blogId);
        blog.likes.push(newLike._id);
        await blog.save();

        if (blog.author.toString() !== userId) {
            await Notification.create({
                recipient: blog.author,
                type: ['like'],
                blog: blogId,
                newLike: newLike._id
            })
        }

        res.status(201).json({ msg: "Blog liked successfully!" });
    } catch (error) {
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Remove Like from Blog
const removeLike = async (req, res) => {
    const { blogId } = req.params;  // Extract blog ID from request parameters
    const userId = req.user.userId;  // Get the user ID from the authenticated user

    try {
        // Find the like entry to remove
        const like = await Like.findOneAndDelete({ blog: blogId, user: userId });
        if (!like) {
            return res.status(400).json({ msg: "You have not liked this blog!" });
        }

        // Remove the like from the blog's 'likes' array
        const blog = await Blog.findById(blogId);
        blog.likes.pull(like._id);
        await blog.save();

        res.status(200).json({ msg: "Like removed successfully!" });
    } catch (error) {
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Get Likes for a Blog
const getLikes = async (req, res) => {
    const { blogId } = req.params;  // Extract blog ID from request parameters

    try {
        // Find the blog and populate its likes
        const blog = await Blog.findById(blogId).populate({
            path: 'likes',
            populate: {
                path: 'user',
                select: 'userName'  // Return only the username for each liked user
            }
        });

        if (!blog) {
            return res.status(404).json({ msg: "Blog not found!" });
        }

        res.status(200).json({ msg: "Likes retrieved successfully!", data: blog.likes });
    } catch (error) {
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Notification Controllers

const getNotification = async (req, res) => {
    console.log("Hello its working");
    
    const recipientId = req.user.userId
    console.log(recipientId);
    
    try {
        const userNotification = await Notification.findById(recipientId).populate({
            path: 'recipient',
            populate: {
                path: 'author',
                select: 'userName'
            }
        })
            .populate('blog','title')

        if(!userNotification) return res.status(400).json({msg:"no notification for this user"})    
        res.status(200).json({ msg: "User Notification", userNotification })
    } catch (error) {
        return res.status(500).json({msg:"Error while fetching all the notification for user"})
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    createBlog,
    getAllBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
    addComment,
    removeComment,
    addLike,
    removeLike,
    getLikes,
    getNotification
};
