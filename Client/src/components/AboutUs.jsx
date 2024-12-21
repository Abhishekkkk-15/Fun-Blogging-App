import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 mb-14">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gradient bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          About Fun-Blogging App
        </h1>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Welcome to <span className="font-semibold">Fun-Blogging App</span> – a place where your
          creativity, ideas, and stories come alive. We’re passionate about giving writers,
          creators, and thinkers a platform to share their unique voices with the world. Whether
          you’re here to read compelling stories or craft your next big blog, Fun-Blogging App has
          got you covered.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">Our Mission</h2>
            <p className="text-gray-700">
              Our mission is to connect people through the power of storytelling. We believe that
              everyone has a story to tell, and we aim to make blogging easy, fun, and accessible
              for everyone.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-purple-600 mb-3">Our Vision</h2>
            <p className="text-gray-700">
              We envision a world where creativity knows no bounds, where everyone can share their
              thoughts and ideas freely, and where bloggers can build vibrant communities around
              their content.
            </p>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">What Makes Us Unique?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>User-friendly interface for seamless blogging and reading experiences.</li>
            <li>Real-time messaging feature for better engagement and collaboration.</li>
            <li>A vibrant community of creators and readers.</li>
            <li>100% focus on creativity and freedom of expression.</li>
          </ul>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Connect With Us
          </h2>
          <p className="text-gray-700 mb-6">
            We’d love to hear from you! Connect with us on LinkedIn and GitHub to stay updated and
            explore more.
          </p>
          <div className="flex justify-center space-x-6">
            {/* <a
              href="https://www.linkedin.com/in/your-linkedin-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            > */}
              <i className="fa-brands fa-linkedin"></i>
            {/* </a> */}
            
              {/* href="https://github.com/your-github-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:underline" */}
            
              <i className="fa-brands fa-github"></i>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
