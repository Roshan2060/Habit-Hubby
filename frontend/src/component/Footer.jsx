import React from "react";

const Footer = () => {
  return (
    <footer className="bg-teal-50 border-t border-teal-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between text-gray-700">
        
        {/* Logo & Name */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-teal-700">Habit Hubby</h1>
          <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Navigation or Links */}
        <div className="flex gap-6 text-sm">
          <a href="/about" className="hover:text-teal-600 transition">About</a>
          <a href="/features" className="hover:text-teal-600 transition">Features</a>
          <a href="/dashboard" className="hover:text-teal-600 transition">Dashboard</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
