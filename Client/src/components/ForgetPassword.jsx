import React, { useState } from "react";
import { requestPasswordReset } from "../services/api";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!email) {
      setError("Email address is required");
      setLoading(false);
      return;
    }

    try {
      await requestPasswordReset(email)
        .then((res) => {
          setMessage(res?.data.msg || "Password reset link sent.");
        })
        .catch((err) => {
          setError(err.response?.data?.msg || "An error occurred.");
        });
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forgot Password</h2>

      {message && (
        <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-sm text-center">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-base font-semibold hover:from-blue-600 hover:to-purple-600 transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Password Reset Link"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <p>
          Remembered your password?{" "}
          <a href="/login" className="text-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
