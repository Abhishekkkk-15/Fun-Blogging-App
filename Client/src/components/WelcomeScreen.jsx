import React from "react";

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col justify-between items-center h-screen bg-gradient-to-b from-blue-300 to-blue-500 p-6 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Traveling made easy!</h1>
        <p className="mt-2 text-sm">
          Experience the world's best adventure around the world with us.
        </p>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <img
          src="https://via.placeholder.com/200x400"
          alt="Pagoda"
          className="h-96"
        />
      </div>
      <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full text-sm font-semibold">
        Let's go!
      </button>
    </div>
  );
};

export default WelcomeScreen;
