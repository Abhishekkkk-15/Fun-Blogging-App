import { Message, User } from "../Schema/schema.js"
import uploadOnCloudinary from "../Middlewares/cloudinary.js"
import { getReciverSocketId, io } from "../lib/socket.js"
// import { Socket } from "socket.io"

const getUserFromFollowing = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch following users
        const user = await User.findById(userId)
            .select("following")
            .populate("following", "_id userName name avatar");

        if (!user) return res.status(404).json({ message: "User not found" });

        const followingUsers = user.following;

        // Fetch users involved in messaging with the auth user
        const messages = await Message.find({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        }).distinct("senderId receiverId"); // Get unique user IDs from messaging

        const messageUserIds = messages.filter(id => id.toString() !== userId.toString()); // Exclude auth user

        // Fetch user details of message participants
        const messageUsers = await User.find({ _id: { $in: messageUserIds } })
            .select("_id userName name avatar");

        // Combine following and messaging users (avoiding duplicates)
        const combinedUsers = [
            ...followingUsers,
            ...messageUsers.filter(
                user => !followingUsers.some(following => following._id.equals(user._id))
            )
        ];

        res.status(200).json({ users: combinedUsers });
    } catch (error) {
        console.error("Error in sidebar-user route:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getMesages = async(req,res) =>{
    try {
        const {userToChatId} = req.params
        const myId = req.user._id
        const messages = await Message.find({
            $or:[
                {senderId:myId ,receiverId:userToChatId},
                {senderId:userToChatId ,receiverId:myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error while Getting all users : ",error.message)
        res.status(599).json({message:"Internel server error"})
    }
}

const sendMessage = async(req,res) =>{
    try {
        const {text,image} = req.body
        const {receiverId} = req.params
        const senderId = req.user._id
        if(!receiverId) return res.status(500).json({message:"Receiver Id Required"})
        let imageUrl;
        if(image){
            const uplaodResponse =await uploadOnCloudinary(image)
            imageUrl = uplaodResponse
        }
        const newMessage = new Message({
            senderId,
            receiverId, 
            text,
            image:imageUrl
        })
        newMessage.save()
        const id = getReciverSocketId(receiverId)
        io.to(id).emit("newMessage", {
            newMessage
          });
        res.status(200).json({newMessage})
    } catch (error) {
        console.log("Error while Sending message  : ",error.message)
        res.status(500).json({message:"Internel server error"})
    }
}

const getUnreadMessages = async (req, res) => {
    try {
        const { userToChatId } = req.params;
        const myId = req.user._id;
        console.log(userToChatId)

        // Fetch unread messages count
        const messages = await Message.countDocuments({
            isRead: false,
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error while getting unread messages: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export {
    getUserFromFollowing,
    getMesages,
    sendMessage,
    getUnreadMessages
}