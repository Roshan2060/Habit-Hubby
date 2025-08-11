import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CLIENT_ID = "1065829732167-bomjupoo8m74g7jf49tss2edg639606a.apps.googleusercontent.com";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://habit-hubby-2.onrender.com/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        setError(data);
      }
    } catch (err) {
      setError({ detail: "Network error, please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Optional: Google Sign-Up button setup here, similar to Login component

  return (
    <>
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white px-4">
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
        Create your account
      </h2>

      {error && (
        <div className="mb-4 text-red-600 text-sm">
          {typeof error === "string" ? error : JSON.stringify(error)}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Username */}
        <div>
          <label className="block text-gray-600 mb-1">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Your username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading ? "bg-teal-300" : "bg-teal-600 hover:bg-teal-700"
          } transition`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <div id="googleSignInDiv" className="mt-4 flex justify-center"></div>
      </form>

      <p className="text-sm text-center text-gray-600 mt-5">
        Already have an account?{" "}
        <Link to="/login" className="text-teal-600 hover:underline font-medium">
          Login
        </Link>
      </p>
    </div>
  </div>
</>
  );
};

export default Signup;
