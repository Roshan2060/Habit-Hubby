import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CLIENT_ID = "1065829732167-bomjupoo8m74g7jf49tss2edg639606a.apps.googleusercontent.com";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load Google script and render the button
  useEffect(() => {
    /* global google */
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: handleGoogleResponse,
        });
        google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large" }
        );
      };
      document.body.appendChild(script);
    };

    if (!window.google) {
      loadGoogleScript();
    } else {
      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  // Google OAuth callback handler
  const handleGoogleResponse = async (response) => {
    setLoading(true);
    setError(null);

    try {
      // response.credential contains the Google ID token
      const res = await fetch("http://127.0.0.1:8000/api/auth/google/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_token: response.credential }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("username", data.user.username);

        alert("Login successful!");
        navigate("/");
      } else {
        setError(data.error || "Google login failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error during Google login.");
    } finally {
      setLoading(false);
    }
  };

  // Your existing email/password login logic unchanged
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
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        // Fetch user profile
        const profileRes = await fetch("http://127.0.0.1:8000/api/me/", {
          headers: {
            Authorization: `Bearer ${data.access}`,
            "Content-Type": "application/json",
          },
        });

        const profileData = await profileRes.json();

        if (profileRes.ok) {
          localStorage.setItem("username", profileData.username);
          alert("Login successful!");
          navigate("/");
        } else {
          console.warn("Failed to fetch user profile");
        }
      } else {
        setError(data.detail || "Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white px-4">
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
        Login to Habit Hubby
      </h2>

      {error && (
        <div className="mb-4 text-red-600 text-sm">
          {typeof error === "string" ? error : JSON.stringify(error)}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
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

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading ? "bg-teal-300" : "bg-teal-600 hover:bg-teal-700"
          } transition`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Google Sign-In button below the login button */}
        <div id="googleSignInDiv" className="mt-4 flex justify-center"></div>
      </form>

      <p className="text-sm text-center text-gray-600 mt-5">
        Don't have an account?{" "}
        <Link to="/signup" className="text-teal-600 hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  </div>
   </>
  );
};

export default Login;
