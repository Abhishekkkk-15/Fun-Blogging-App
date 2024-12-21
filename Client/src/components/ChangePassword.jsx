import React, { useState } from 'react';
import { changePassword } from '../services/api';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    await changePassword(currentPassword, newPassword).then(res => { 
    setSuccess(true)
    }
    ).catch(err => {
      setError(err.response.data.msg)
    });
    setSuccess(true);
    setError(null);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">Change Password</h3>

      {success && (
        <div className="mb-4 p-3 text-center text-green-600 bg-green-100 rounded-md">
          Password changed successfully!
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 text-center text-red-600 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handlePasswordChange} className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-600 mb-1">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600 mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm md:text-base hover:from-blue-600 hover:to-purple-600 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
