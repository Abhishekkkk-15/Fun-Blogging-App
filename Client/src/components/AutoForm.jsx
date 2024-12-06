import React from 'react';

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 via-pink-500 to-red-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md md:max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {/* Signup Options */}
        <div className="flex justify-center space-x-4 mb-6">
          <button className="bg-gray-100 p-2 rounded-md shadow hover:bg-gray-200">
            Sign up with Email
          </button>
          <button className="bg-gray-100 p-2 rounded-md shadow hover:bg-gray-200">
            <i className="fab fa-facebook-f"></i> Sign up with Facebook
          </button>
        </div>

        {/* Form Fields */}
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white p-2 rounded-md hover:bg-orange-700"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account */}
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <span className="text-orange-500 font-semibold cursor-pointer hover:underline">
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
