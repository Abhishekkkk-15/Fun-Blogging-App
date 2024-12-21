import { useEffect, useRef, useState } from "react";
import {socket} from '../../lib/socket.js'
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../services/api";
import { setMessages } from "../../app/Slices/messageSlice";
import { formatMessageTime } from "../../lib/utils";
// import {io} from 'socket.io-client'

const ChatContainer = () => { 
  const dispatch = useDispatch()
  const messages = useSelector(state => state.message.messages) || []

  const selectedUser = useSelector(state => state.message.selectedUser)
  const  authUser  = useSelector(state => state.user.userData)
  const messageEndRef = useRef(null);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getMessages(selectedUser?._id);
        dispatch(setMessages(res.data));
      } catch (err) {
        console.error(err?.data?.msg);
      }
    };

    fetchMessages();

    const handleNewMessage = (data) => {
      dispatch(setMessages(data.newMessage))
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage); // Clean up listener
    };
  }, [selectedUser, dispatch]);

 
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto ">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message,index) => (
          <div
            key={index}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                className="rounded-full"
                  src={
                    message.senderId === authUser._id
                      ? authUser.avatar || "/avatar.png"
                      : selectedUser.avatar || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;