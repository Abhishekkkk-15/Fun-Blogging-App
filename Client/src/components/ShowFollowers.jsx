import React, { useState, useEffect } from 'react';
import { fetchFollow } from '../services/api'; // Assuming this is your API function
import { Link } from 'react-router-dom';

const ShowFollowers = ({ userId }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await fetchFollow(); // Pass the user ID to your API
        setFollowers(response.data.followers.followers);
      } catch (error) {
        console.error('Error fetching followers:', error);
      } finally {
        setLoading(false);
      }
    };

    getFollowers();
  }, [userId]);

  if (loading) {
    return <div className="p-4 text-center">Loading followers...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Followers</h2>
      {followers.length > 0 ? (
        <div>
          {followers.map((follower) => (
            <Link to={`/profile/${follower._id}`}
              key={follower._id}
              className="flex items-center mb-6 p-4  shadow-md rounded-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={follower.avatar}
                alt={follower.name}
                className="w-16 h-16 rounded-full border-4  mr-4"
              />
              <div>
                <p className="font-semibold text-lg ">{follower.name}</p>
                <p className="text-xs text-gray-500">@{follower.userName}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center ">No followers found.</p>
      )}
    </div>
  );
};

export default ShowFollowers;
