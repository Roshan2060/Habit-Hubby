import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const userPanelRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
  ];

  const activeClass = "text-teal-500 font-bold";
  const inactiveClass = "text-gray-700 hover:text-teal-600";

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUsername = localStorage.getItem("username");
    setIsLoggedIn(!!token);
    setUsername(storedUsername || "");
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userPanelRef.current && !userPanelRef.current.contains(event.target)) {
        setUserPanelOpen(false);
      }
    }
    if (userPanelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userPanelOpen]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    setUserPanelOpen(false);
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-teal-600">
          Habit Hubby
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              {link.name}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <div className="relative" ref={userPanelRef}>
              <button
                onClick={() => setUserPanelOpen(!userPanelOpen)}
                className="text-teal-800 font-medium focus:outline-none"
                aria-haspopup="true"
                aria-expanded={userPanelOpen}
              >
                {username}
              </button>

              {userPanelOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg p-4 z-50">
                  <h3 className="font-semibold mb-2">Your Habit Stats</h3>
                  <p>Here you can show user-specific info, progress charts, etc.</p>
                  {/* You can import and use your ProgressChart component here */}
                  <button
                    onClick={handleLogout}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white shadow-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <>
              <span
                className="text-teal-800 font-medium cursor-pointer"
                onClick={() => setUserPanelOpen(!userPanelOpen)}
              >
               {username}
              </span>

              {userPanelOpen && (
                <div className="bg-white border border-gray-300 rounded shadow-lg p-4 mt-2">
                  <h3 className="font-semibold mb-2">Your Habit Stats</h3>
                  <p>Here you can show user-specific info, progress charts, etc.</p>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="bg-teal-600 text-white text-center px-4 py-2 rounded-lg hover:bg-teal-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
