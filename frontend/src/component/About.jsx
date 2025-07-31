import React from "react";

const AboutSection = () => {
  return (
    <section className="bg-white py-20 px-6" id="about">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text */}
        <div>
          <h2 className="text-4xl font-bold text-teal-700 mb-4">About Habit Hubby</h2>
          <p className="text-gray-700 text-lg mb-6">
            Habit Hubby is your personal assistant to help you develop good habits and stay consistent every day.
            Whether you're trying to build a morning routine, exercise regularly, or focus on your personal growth,
            Habit Hubby makes tracking simple and motivating.
          </p>
          <div className="bg-teal-100 p-6 rounded-xl border-l-4 border-teal-600 shadow">
            <h3 className="text-xl font-semibold text-teal-700 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-700 text-sm">
              To empower individuals with tools that build discipline and consistency—one habit at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
