import { X } from "lucide-react";
import { useSelector } from "react-redux";
import {socket} from '../socket.js'
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../app/Slices/messageSlice.js";

const ChatHeader = () => {
  const selectedUser = useSelector(state => state.message.selectedUser) || []
  // const [onlineUser,setOnlineUser] = useState([])
  const dispatch = useDispatch()
  const onlineUser = useSelector(state => state?.message?.onlineUsers) || []
  console.log(selectedUser._id)
  console.log(onlineUser)
  // useEffect(() => {
  //   const handleOnlineUser = (data) => {
  //     setOnlineUser(data);
  //     console.log(data);
  //   };
  
  //   socket.on('onlineUser', handleOnlineUser);
  
  //   // Cleanup function to remove the event listener when the component unmounts
  //   return () => {
  //     socket.off('onlineUser', handleOnlineUser);
  //   };
  // }, []);

  const cancleSelectedUser = () =>{
    dispatch(setSelectedUser(null))
  }

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="">
            <div className="size-10 rounded-md relative">
              <img className="rounded-full" src={selectedUser?.avatar || "/avatar.png"} alt={selectedUser?.name} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser?.name}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUser?.includes(selectedUser?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => cancleSelectedUser()}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;