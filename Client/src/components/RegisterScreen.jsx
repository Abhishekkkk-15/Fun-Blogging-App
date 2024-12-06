import React, { useState } from 'react';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // Display the selected avatar
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registering:', { username, email, password, avatar });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        {/* Avatar Section */}
        <div className="flex justify-center mb-6">
          <label htmlFor="avatar" className="cursor-pointer">
            <img
              src={avatar || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <input
              type="file"
              id="avatar"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Register</h1>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="w-full">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
