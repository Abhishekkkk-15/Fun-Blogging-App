import { useEffect, useState } from "react";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";
import { setSelectedUser } from "../../app/Slices/messageSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { getUnreadMessages, sideBarUsers } from "../../services/api.jsx";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const selectedUser = useSelector((state) => state.message.selectedUser);

  // Fetch sidebar users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsUsersLoading(true);
        const res = await sideBarUsers();
        setUsers(res.data.users.following);
      } catch (err) {
        console.error("Error fetching users:", err.message);
      } finally {
        setIsUsersLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch unread messages count for all users
  useEffect(() => {
    const fetchUnreadCounts = async () => {
      const counts = {};
      for (const user of users) {
        try {
          const res = await getUnreadMessages(user._id);
          counts[user._id] = res.data; // Assume `res.data` contains the unread count
        } catch (err) {
          console.error(`Error fetching unread count for user ${user._id}:`, err.message);
        }
      }
      setUnreadCounts(counts);
    };

    if (users.length) fetchUnreadCounts();
  }, [users]);

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

        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
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
              {unreadCounts[user._id] > 0 && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900 flex items-center justify-center text-xs text-white"
                >
                  {unreadCounts[user._id]}
                </span>
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
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
