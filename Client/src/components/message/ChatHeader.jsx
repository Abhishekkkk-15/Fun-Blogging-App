import { X } from "lucide-react";
import { useSelector } from "react-redux";

const ChatHeader = () => {
  const selectedUser = useSelector(state => state.message.selectedUser)
  const onlineUsers  = ['s','s','']
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
              {onlineUsers?.includes(selectedUser?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;