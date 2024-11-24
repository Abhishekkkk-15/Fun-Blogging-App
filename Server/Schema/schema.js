import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    avatar:{
        type:String,
    },
    userName:{
        type:String,
        required:true,
        unique:true,
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
        type:String
    },
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
    coverImages:{
        type:String,
        required:true,
    },
    categories:[{
        type:Schema.Types.ObjectId,
        ref:"Category",
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
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
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
    }
})

const notificationSchema = new Schema({
    recipient:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        enum:['like','comment'],
        required:true
    },
    blog:{
        type:Schema.Types.ObjectId,
        ref:'Blog',
        required:true
    },
    comment:{
        type:Schema.Types.ObjectId,
        ref:'Comment',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const User = mongoose.model('User', userSchema);
export const Blog = mongoose.model('Blog', postSchema);
export const Comment = mongoose.model('Comment', commentSchema);
export const Category = mongoose.model('Category', categorySchema);
export const Like = mongoose.model('Like', likeSchema);
export const Notification = mongoose.model('Notification', notificationSchema);

