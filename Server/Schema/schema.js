import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    avatar:{
        type:String,
    },
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:[true,"userName already exists"],
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    bio:{
        type:String,
        maxlength :400

    },
    followers:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    following:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    isAdmin:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

const postSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    coverImage:{
        type:String,
        required:[true,"Please Provide the Blog Iamge"],
    },
    description:{
        type:String,
        maxlength :[2000, "Word length must be under 2000 character's "],
        required:true
    },
    Category:[{
        type: String,
        required: [true, "Category name is required."]
        // enum: {
        //     values: ["quotes","Anime","Technology", "Health", "Education", "Entertainment", "Sports", "Lifestyle", "Science"],
        //     message: "{VALUE} is not a valid category. Please select a predefined category."
        // }
    }],
    comments:[{
        type:mongoose.Schema.ObjectId, 
        ref:'Comment'
    }],
    likes:[{
        type:mongoose.Schema.ObjectId, 
        ref:'Like'
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const commentSchema = new Schema({
    content:{
        type:String,
        required:true,
        maxlength :500
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    blog:{
        type:Schema.Types.ObjectId,
        ref:"Blog",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Category name is required."],
       
    },
    description:{
        type:String,
        maxlength:100
    }
});

const likeSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    blog:{
        type:Schema.Types.ObjectId,
        ref:"Blog"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}, { timestamps: true })

const notificationSchema = new Schema(
    {
      recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true, // The user who performed the action
      },
      type: {
        type: String,
        enum: ['like', 'comment', 'follow', 'system'], // Type of notification
        required: true,
      },
      blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog', // Reference to the related blog (if applicable)
      },
      comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment', // Reference to the related comment (if applicable)
      },
      like: {
        type: Schema.Types.ObjectId,
        ref: 'Like', // Reference to the related like (if applicable)
      },
      isRead: {
        type: Boolean, // Tracks if the notification is read
        default: false,
      },
      additionalInfo: {
        type: String, // Optional field for extra metadata
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true, // Automatically manage `createdAt` and `updatedAt` timestamps
    }
  );


export const User = mongoose.model('User', userSchema);
export const Blog = mongoose.model('Blog', postSchema);
export const Comment = mongoose.model('Comment', commentSchema);
export const Category = mongoose.model('Category', categorySchema);
export const Like = mongoose.model('Like', likeSchema);
export const Notification = mongoose.model('Notification', notificationSchema);

