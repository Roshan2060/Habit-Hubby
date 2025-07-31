// src/pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-white px-6 text-center">
      <h1 className="text-5xl font-extrabold text-teal-700 mb-6">
        Welcome to Habit Hubby
      </h1>
      <p className="text-lg text-gray-700 max-w-xl">
        Build and track your habits effortlessly. Stay consistent and
        motivated with Habit Hubby, your personal habit tracker.
      </p>
      <button className="mt-8 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">
        Get Started
      </button>
    </div>
  );
};

export default Home;
