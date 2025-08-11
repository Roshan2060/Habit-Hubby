import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://habit-hubby-2.onrender.com/api/sections/";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function SectionsManager({ onSectionSelected }) {
  const [sections, setSections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load sections on mount
  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = () => {
    axios
      .get(API_URL, { headers: getAuthHeaders() })
      .then((res) => {
        setSections(res.data);
        if (res.data.length > 0) {
          setSelectedSectionId(res.data[0].id);
          onSectionSelected(res.data[0]);
          setShowForm(false);
        } else {
          setShowForm(true);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch sections", err);
      });
  };

  const handleCreate = () => {
    if (!title.trim()) {
      alert("Section title is required");
      return;
    }
    setLoading(true);
    axios
      .post(API_URL, { title }, { headers: getAuthHeaders() })
      .then((res) => {
        setSections((prev) => [...prev, res.data]);
        setTitle("");
        setSelectedSectionId(res.data.id);
        onSectionSelected(res.data);
        setShowForm(false);
      })
      .catch((err) => {
        console.error("Failed to create section", err);
        alert("Could not create section");
      })
      .finally(() => setLoading(false));
  };

  const handleSelect = (section) => {
    setSelectedSectionId(section.id);
    onSectionSelected(section);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this section?")) return;

    axios
      .delete(`${API_URL}${id}/`, { headers: getAuthHeaders() })
      .then(() => {
        setSections((prev) => prev.filter((sec) => sec.id !== id));
        if (selectedSectionId === id) {
          if (sections.length > 1) {
            const newSelected = sections.find((sec) => sec.id !== id);
            setSelectedSectionId(newSelected.id);
            onSectionSelected(newSelected);
          } else {
            setSelectedSectionId(null);
            onSectionSelected(null);
          }
        }
      })
      .catch((err) => {
        alert("Failed to delete section");
        console.error(err);
      });
  };

  return (
    <div>
      {showForm ? (
        <div className="p-4 border rounded shadow-md bg-white">
          <h3 className="text-xl font-semibold mb-3 text-teal-700">Create New Section</h3>
          <input
            type="text"
            placeholder="Section title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-teal-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={loading}
          />
          <button
            onClick={handleCreate}
            disabled={loading || !title.trim()}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 w-full"
          >
            {loading ? "Saving..." : "Save Section"}
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="mt-3 text-sm text-teal-600 hover:underline"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow-md max-h-64 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-teal-700">Your Sections</h3>
          {sections.length === 0 ? (
            <p className="text-gray-600">No sections found. Create one!</p>
          ) : (
            <ul>
              {sections.map((section) => (
                <li
                  key={section.id}
                  className={`flex justify-between items-center cursor-pointer px-3 py-2 rounded mb-2 transition-colors
                    ${
                      section.id === selectedSectionId
                        ? "bg-teal-100 text-teal-900 font-semibold"
                        : "text-gray-800"
                    }`}
                  onClick={() => handleSelect(section)}
                >
                  <span>{section.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(section.id);
                    }}
                    className="text-red-600 hover:text-red-800 font-bold px-2"
                    title="Delete section"
                  >
                    &#x2716;
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 w-full bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            + Create New Section
          </button>
        </div>
      )}
    </div>
  );
}