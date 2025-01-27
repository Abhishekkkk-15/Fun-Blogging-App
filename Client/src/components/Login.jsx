import React, { useState } from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { login } from '../services/api'; 
import Profile from './Profile'; 
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn, setUser } from '../app/Slices/userSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import UserProfile from './UserProfile';
import { socket } from '../lib/socket.js';
// import theme from '/theme';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = async () => {
    setLoading(true);
    setError(null); 

    await login(userId, password)
      .then((res) => {
        dispatch(setUser(res.data.data)); 
        dispatch(setLoggedIn(true)); 
        navigate(`/userProfile`); 
        if (!socket.connected) {
          socket.auth = { userId: res.data.data._id };
          socket.connect();
        }
      })
      .catch((err) => {
        setError(err.response.data.msg || 'An error occurred'); 
      })
      .finally(() => {
        setLoading(false);
      });
    };
    const selectedUser = useSelector(state => state.message.selectedUser) 

  const user = useSelector((state) => state.user.userData); 

  if (user?._id) {

    return <UserProfile />;
  }


  return (<>
  
    <div className=" min-h-screen flex items-center justify-center p-6">
      {/* Login Card */}
      <div className="w-full max-w-md md:max-w-lg  rounded-xl shadow-lg p-8">
        {/* Title */}
        {<h2 className="text-2xl md:text-3xl font-bold  text-center mb-6">
          {location?.state ?   'Login First' :"Welcome Back"}
        </h2>}
        <p className="-500 text-center mb-8">Login to continue exploring!</p>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="text"
            value={userId}
            placeholder="Enter your email"
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-2 border  rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block  font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            value={password}
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border  rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-800 border-l-4 border-red-500 p-2 mb-4">
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-large hover:from-blue-600 hover:to-purple-600 transition"
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 00-9.516 6.41A8 8 0 014 12z"
                ></path>
              </svg>
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </button>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <Link to={'/forget-passwrod'} className="text-purple-500 hover:text-blue-500 focus:text-purple-500 mt-2 text-sm transition">
            Forgot Password?
          </Link>
        </div>

        {/* Or Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow " />
          <span className="px-4">OR</span>
          <hr className="flex-grow " />
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-sm ">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-500 hover:text-blue-500 focus:text-purple-500 mt-2 text-sm transition">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
