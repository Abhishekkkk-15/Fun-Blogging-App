import { config } from "dotenv";
import uploadOnCloudinary from "../Middlewares/cloudinary.js";
import { Blog, User } from "../Schema/schema.js";
import jwt from 'jsonwebtoken'
config();

const registerUser = async (req, res) => {
    const { userName, password, email } = req.body
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]    // $or is mongodb query which check if even one condition is true
    })
    if (existedUser) return res.status(404).json({ msg: "Email or UserName Already Exists" })
    const pfp = req.file?.path;
    console.log(userName, password, email)

    try {
        const avatar = await uploadOnCloudinary(pfp)
        await User.create({
            userName,
            password,
            email,
            avatar
        })

        res.status(200).json({ msg: "User Registred!!" })
    } catch (error) {
        console.log("Error in registring User", error)
        res.status(500).json({ msg: `Server Error!! ${error}` })
    }
}

const loginUser = async (req, res) => {
    try {
        const { userId, password } = req.body
        const user = await User.findOne({ $or: [{ userName: userId }, { email: userId }] })
        if (!user) return res.status(400).json({ msg: "User Not Found" })
        const accessToken = jwt.sign(
            {
                userName: user.userName,
                userId: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                avatar: user.avatar,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        const refreshToken = jwt.sign(
            {
                userName: user.userName,
                userId: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                avatar: user.avatar,
            },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        )
        if (user && user.password === password) {
            return res.status(200).cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000,
                sameSite: 'None',
            }).json({ msg: "User Logedin!!" })
        }
    } catch (error) {
        console.log(error)
        res.status(505).json({ msg: `Server Error!! ${error}` })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        })
        return res.status(200).json({ msg: "User loged Out!!" })
    } catch (error) {
        res.status(505).json({ msg: `Server Error!! ${error}` })
    }
}

const getUserProfile = async (req, res) => {
    const userInfo = req.body.userId
    try {
        const userProfile = await User.findOne({ $or: [{ userName: userInfo }, { email: userInfo }] })
        if (!userProfile) {
            return res.status(404).json({ msg: "User Not Found!!" })
        }
        return res.status(200).json(
            {
                msg: "User Find",
                data: userProfile
            }
        )
    } catch (error) {
        res.status(505).json({ msg: `Server Error!! ${error}` })
    }
}

const updateUserProfile = async (req, res) => {
    const { userName, email, bio } = req.body
    const userId = req.user.userId
    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ msg: "User Not Found!!" })
        }

        user.userName = userName || user.userName
        user.email = email || user.email
        user.bio = bio || user.bio

        if (req.file) {
            const avatar = await uploadOnCloudinary(req.file?.path)
            user.avatar = avatar
        }

        const updateUser = await user.save()

        res.status(200).json(
            {
                msg: "User Profile Updated!!",
                data: user
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: `Server Error!! ${error}` })
    }
}

const deleteUser = async (req, res) => {
    const userId = req.body.userId

    try {
        const user = await User.findOneAndDelete({ $or: [{ email: userId }, { userName: userId }] })
        if (!user) {
            res.status(404).json({ msg: "User Not Found!!" })
        }
        res.status(200).json({ msg: "User Deleted Successfully!!" })
    } catch (error) {
        res.status(500).json({ msg: `Server Error!! ${error}` })
    }
}


//Blog Contoller's

const createBlog = async (req, res) => {
    const title = req.body.title
    const img = req.file?.path
    const author = req.user.userId
    if (!title || !img) {
        return res.status(404).json({ msg: "Title And Blog Image is Required!!" })
    }
    try {
        const coverImage = await uploadOnCloudinary(img)
        const newPost = new Blog({
            title,
            coverImages :coverImage ,
            author
        })
        await newPost.save()
        res.status(200).json({ msg: "blog Creted Successfully!!" })
    } catch (error) {
        res.status(500).json({ msg: `Server Error!! ${error}` })
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await Blog.find()
        if (!allBlogs) {
            res.status(500).json({ msg: "Not Blog Available!!" })
        }
        res.status(200).json(
            {
                msg: "All Blogs",
                data: allBlogs
            }
        )
    } catch (error) {
        res.status(500).json({ msg: `Server Error!! ${error}` })
    }
}

const getBlog = async (req, res) => {
    const { blogId } = req.body
    try {
        const blog = await Blog.findById(blogId)

        if (!blog) {
            res.status(404).json({ msg: "Blog Not Found!!" })
        }
        res.status(200).json(
            {
                msg: "Blog Found!!", data: blog

            }
        )
    } catch (error) {
        res.status(500).json({ msg: `Server Error!! ${error}` })
    }
}

const updateBlog = async (req, res) => {
    const { blogId, title } = req.body
    if (!title) {
        res.status(404).json({ msg: "Descripition Required" })
    }
    try {
        const blog = await Blog.findById(blogId)

        blog.title = title || blog.title

        const updateBlog = await blog.save()

        res.status(200).json(
            {
                msg: "Blog Updated!!",
                data: blog

            }
        )
    } catch (error) {
        res.status(500).json({ msg: `Server Error!! ${error}` })
    }
}

const deleteBlog = async (req, res) => {
    const { blogId } = req.body
    if (!blogId) {
        return console.log("Blod ID not found")
    }
    try {
        await Blog.findByIdAndDelete(blogId)
        res.status(200).json({ nmsg: "Blog Deleted!!" })
    } catch (error) {
        res.status(500).json({ msg: `Server Error!! ${error}` })
    }
}

const getBlogsByUser = async (req, res) => {
    const { userId } = req.body
    try {
        const user = await User.findOne({ email:userId })
        const blogs = await Blog.find({ author: user._id }).populate('author', 'name')
        if (blogs.length === 0) {
            res.status(404).json({ msg: "No Blogs Found for this user" })
        }
        res.status(200).json(
            {
                msg: "Blogs Found",
                data: blogs
            }
        )
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ msg: `Server Error!! ${error}` })
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    //Blog Controller's
    createBlog,
    getAllBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
    getBlogsByUser
}