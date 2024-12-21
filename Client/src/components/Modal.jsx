const Modal = ({ isOpen, onClose, followers, following }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-bold mb-4">Followers & Following</h3>
          
          {/* Followers Section */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Followers</h4>
            <ul className="space-y-2">
              {followers?.length ? (
                followers.map((user, index) => (
                  <li key={index} className="border-b py-2 flex items-center">
                    <img src={user?.avatar} alt={user?.userName} className="w-8 h-8 rounded-full mr-3" />
                    <div>
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-sm text-gray-500">@{user?.userName}</p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">No followers found</p>
              )}
            </ul>
          </div>
  
          {/* Following Section */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Following</h4>
            <ul className="space-y-2">
              {following?.length ? (
                following.map((user, index) => (
                  <li key={index} className="border-b py-2 flex items-center">
                    <img src={user?.avatar} alt={user?.userName} className="w-8 h-8 rounded-full mr-3" />
                    <div>
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-sm text-gray-500">@{user?.userName}</p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">Not following anyone</p>
              )}
            </ul>
          </div>
  
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default Modal;
  