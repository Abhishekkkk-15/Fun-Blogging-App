import { useEffect, useState } from "react";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";
import { setSelectedUser } from "../../app/Slices/messageSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { sideBarUsers } from "../../services/api.jsx";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const selectedUser = useSelector((state) => state.message.selectedUser);
  const onlineUsers = useSelector(state => state.message.onlineUsers)
  // Fetch sidebar users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsUsersLoading(true);
        const res = await sideBarUsers();
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users:", err.message);
      } finally {
        setIsUsersLoading(false);
      }
    };
    fetchUsers();
  }, []);



  // Handle user selection
  const setSelectedUserFn = (user) => {
    dispatch(setSelectedUser(user));
  };

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUserFn(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.avatar || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
               {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-sm text-zinc-400">
                {/* Add online/offline status logic if needed */}
              </div>
            </div>
          </button>
        ))}

        {users.length === 0 && (
          <div className="text-center text-zinc-500 py-4">Follow you Friends and start chating</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
