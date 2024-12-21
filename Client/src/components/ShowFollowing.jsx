import React, { useState, useEffect } from 'react';
import { fetchFollow } from '../services/api'; // Assuming this is your API function
import { Link } from 'react-router-dom';

const ShowFollowing = ({ userId }) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await fetchFollow(); // Pass the user ID to your API
        setFollowing(response.data.following.following);
      } catch (error) {
        console.error('Error fetching following:', error);
      } finally {
        setLoading(false);
      }
    };

    getFollowing();
  }, [userId]);

  if (loading) {
    return <div className="p-4 text-center">Loading following...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Following</h2>
      {following.length > 0 ? (
        <div>
          {following.map((user) => (
            <Link
              key={user._id}
              to={`/profile/${user._id}`}
              className="flex items-center mb-6 p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full border-4 border-gray-200 mr-4"
              />
              <div>
                <p className="font-semibold text-lg text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">@{user.userName}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">You are not following anyone yet.</p>
      )}
    </div>
  );
};

export default ShowFollowing;
