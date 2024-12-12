import React, { useState } from "react";
import { requestPasswordReset } from "../services/api";

// import { useHistory } from "react-router-dom"; // If you want to redirect after successful submission

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
//   const history = useHistory(); // To redirect user after successful reset

  // Handle email input change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Reset message state
    setError(""); // Reset error state

    if (!email) {
      setError("Email address is required");
      setLoading(false);
      return;
    }

    try {
      // Example API call (replace with your actual API call)
      const response = await requestPasswordReset(email).then(res => {
          setMessage(res?.data.msg)
        console.log(res)
    }).catch(err => {
        setError(err.response.data.msg)
        setLoading(false)
    })


    //   if (data.success) {
    //     setMessage("Password reset link sent to your email!");
        // Optionally redirect to login page or stay on this page
        // setTimeout(() => {
        // //   history.push("/login"); // Redirect to login
        // }, 3000);
    //   } else {
    //     setError(data.message || "Something went wrong");
    //   }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

      {message && (
        <div className="bg-green-100 text-green-800 p-2 rounded-md mb-4">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 p-2 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Password Reset Link"}
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p>
          Remembered your password?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
