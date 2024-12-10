import { config } from "dotenv";
import uploadOnCloudinary from "../Middlewares/cloudinary.js";
import { Blog, User, Comment, Like, Notification } from "../Schema/schema.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

config();



// Register User
const registerUser = async (req, res) => {
    const { userName, password, email, name } = req.body;
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }] // Check if email or username already exists
    });

    if (existedUser) return res.status(400).json({ msg: "Email or UserName Already Exists" });
    const pfp = req.file?.path;
    try {
        const avatar = await uploadOnCloudinary(pfp);
        await User.create({
            name,
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
            return res.status(400).json({ msg: "Invalid Password" });
        }

        const accessToken = jwt.sign({
            name: user.name,
            userName: user.userName,
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            avatar: user.avatar,
            bio: user.bio,
            createdAt: user.createdAt,
            followers:user.followers,
            following:user.following
        }, process.env.JWT_SECRET, { expiresIn: "7d" });

        const refreshToken = jwt.sign({
            name: user.name,
            userName: user.userName,
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            avatar: user.avatar,
            bio: user.bio,
            createdAt: user.createdAt,
            followers:user.followers,
            following:user.following
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

        res.status(200)
            .cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: "false", // Only secure in production
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
                sameSite: 'None', // Required for cross-origin cookies
            })
            .json({ msg: "User Logged In!", data: user });
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
    const { identifier } = req.body;
    try {
        const userProfile = await User.findById(identifier).select('-password -email')
        if (!userProfile) {
            return res.status(400).json({ msg: "User Not Found!" });
        }
        res.status(200).json({ msg: "User Found", data: userProfile });
    } catch (error) {
        res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    const { name,userName, email, bio } = req.body;
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if(user._id != userId) return res.status(404).json({ msg: "Not authorized" });
        if (!user) return res.status(404).json({ msg: "User Not Found!" });

        user.name = name || user.name;
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

const getUserInfo = (req, res) => {
    try {
        const userInfo = req.user;

        if (!userInfo) {
            return res.status(404).json({ message: "User information not found" });
        }

        res.status(200).json({ userInfo });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user information", error });
    }
};

// Create Blog
const createBlog = async (req, res) => {
    const { title, category, description } = req.body;
    const img = req.file?.path;
    const author = req.user._id;

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
            .populate('author', 'userName avatar')
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
    const { identifier } = req.params;

    try {
        // Check if the identifier is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(identifier)) {
            return res.status(400).json({ msg: "Invalid identifier provided." });
        }

        const objectId = new mongoose.Types.ObjectId(identifier);

        const blog = await Blog.find({ $or: [{ author: objectId }, { _id: objectId }, { title: objectId }] }).populate('author', 'avatar userName _id')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'userName avatar _id'
                }
            })
            .populate({
                path: 'likes',
                populate: {
                    path: 'user',
                    select: 'userName'
                }
            });

        if (!blog.length) return res.status(404).json({ msg: "No blogs found" });

        res.status(200).json({ msg: "Blog(s) Found!", data: blog });
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
        const { _id } = req.user

        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ msg: "Blog Not Found!" });

        const comment = await Comment.create({
            content,
            blog: blogId,
            author: req.user._id
        });

        if (blog.author.toString() !== _id) {
            await Notification.create({
                recipient: blog.author._id,
                type: 'comment',
                blog: blogId,
                sender:_id
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
    const userId = req.user._id;  // Get the user ID from the authenticated user

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
                recipient: blog.author._id,
                sender:userId,
                type: 'like',
                blog: blogId,
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
    const userId = req.user._id;  // Get the user ID from the authenticated user

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

    const recipientId = req.user._id

    try {
        const userNotification = await Notification.find({ recipient: recipientId })
        .populate({
            path: 'sender',
            select: 'userName name avatar _id'  // Return only the username for each liked user
        })
        .populate('blog', 'title')
        if (!userNotification) return res.status(400).json({ msg: "no notification for this user" })
        res.status(200).json({ msg: "User Notification", userNotification })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error while fetching all the notification for user" })
    }
}


const markAllASRead = async (req,res) =>{
    const userId =  req.user._id;
    console.log(userId)
    const {dateThreshold } = req.body;

    try {
        const result = await Notification.updateMany(
            {recipient:userId,isRead:false, createdAt:{ $lt: dateThreshold  || new Date()}},
            {$set:{isRead:true}}
        );
        if(result.modifiedCount > 0){
            return res.status(200).json({msg:"Notification marked as read"})
        }else{
            return res.status(404).json({msg:"No unread notifications found"})
        }
    } catch (error) {   
        return res.status(505).json({msg:"Error while marking all notification as read",error})
    }
}

const search = async (req, res) => {
    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special regex characters
      };
    const { query, type } = req.query
    try {
        if (query.trim() === ' ') {
            return res.status(400).json({ success: false, msg: "Search query is required" })
        }

        let results = []
        const searchRegax = new RegExp(escapeRegExp(query), 'i')

        if (type === 'user') {
            results = await User.find({
                $or: [
                    { name: searchRegax },
                    { email: searchRegax },
                    { userName: searchRegax }
                ]
            }).select('-password -isAdmin -createdAt -followers -following -email -bio ')
        } else if (type === 'blog') {
            results = await Blog.find({
                $or: [
                    { title: searchRegax },
                    { description: searchRegax }
                ]
            })
        } else {
            const [users, blogs] = await Promise.all([
                User.find({
                    $or: [
                        { name: searchRegax },
                        { userName: searchRegax }
                    ]
                }).select('-password')
            ])
            Blog.find({
                $or: [
                    { title: searchRegax },
                    { description: searchRegax }
                ]
            })
            results = {
                users,
                blogs
            }
        }
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const addFollowers = async (req, res) => {
    const { toFollow } = req.body;
    const userId = req.user._id;
  
    try {
      // Update the 'followers' list of the target user
      await User.findByIdAndUpdate(
        toFollow,
        { $addToSet: { followers: userId } },
        { new: true }
      );
  
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { following: toFollow } },
        { new: true }
      ).select('-password');
       
        await Notification.create({
            recipient: toFollow,
            type: 'follow',
            sender:userId
        })

      const accessToken = jwt.sign(
        {
          name: user.name,
          userName: user.userName,
          _id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
          avatar: user.avatar,
          bio: user.bio,
          createdAt: user.createdAt,
          followers: user.followers,
          following: user.following,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: false, // Use true in production with HTTPS
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: 'None', // For cross-origin cookies
        })
        .status(200)
        .json({ msg: 'User Followed successfully!', data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error while following!', error: error.message });
    }
  };
  
  const removeFollower = async (req, res) => {
    const { toUnfollow } = req.body;
    const userId = req.user._id;
  
    if (!toUnfollow) {
      return res.status(400).json({ msg: 'User to unfollow ID not provided' });
    }
  
    try {
      await User.findByIdAndUpdate(
        toUnfollow,
        { $pull: { followers: userId } },
        { new: true }
      );
  
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { following: toUnfollow } },
        { new: true }
      ).select('-password'); // Exclude the password
  
      const accessToken = jwt.sign(
        {
          name: user.name,
          userName: user.userName,
          _id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
          avatar: user.avatar,
          bio: user.bio,
          createdAt: user.createdAt,
          followers: user.followers,
          following: user.following,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
  
      res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: false, // Use true in production with HTTPS
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: 'None', // For cross-origin cookies
        })
        .status(200)
        .json({ msg: 'User Unfollowed successfully!', data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error while unfollowing!', error: error.message });
    }
  };
  

export {
    search,
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
    getNotification,
    markAllASRead,
    getUserInfo,
    removeFollower,
    addFollowers
};
