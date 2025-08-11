import React, { useState, useEffect } from "react";
import axios from "axios";

import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import Calendar from "./Calendar";
import ProgressChart from "./ProgressChart";
import SectionsManager from "./SectionsManager"; // <-- Use the updated SectionsManager here

const API_URL = "http://127.0.0.1:8000/api/tasks/";

// Helper to get auth headers with Bearer token
const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function Dashboard() {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks for selected section
  useEffect(() => {
    if (!selectedSection) {
      setTasks([]);
      return;
    }

    setLoadingTasks(true);
    setError(null);

    axios
      .get(`${API_URL}?section=${selectedSection.id}`, { headers: getAuthHeaders() })
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks.");
        if (err.response && err.response.status === 401) {
          alert("Session expired or unauthorized. Please login again.");
        }
      })
      .finally(() => {
        setLoadingTasks(false);
      });
  }, [selectedSection]);

  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleComplete = (id, completed) => {
    axios
      .patch(
        `${API_URL}${id}/`,
        { completed: !completed },
        { headers: getAuthHeaders() }
      )
      .then((res) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      })
      .catch(() => alert("Failed to update task"));
  };

  const deleteTask = (id) => {
    axios
      .delete(`${API_URL}${id}/`, { headers: getAuthHeaders() })
      .then(() => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      })
      .catch(() => alert("Failed to delete task"));
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-teal-50 to-white px-6 py-10"
      id="dashboard"
    >
      <h1 className="text-5xl font-extrabold text-teal-700 mb-8">
        Habit Hubby Dashboard
      </h1>

      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sections Manager */}
        <div className="md:col-span-1">
          <SectionsManager onSectionSelected={setSelectedSection} />
          {selectedSection && (
            <p className="mt-4 text-center text-gray-700 font-semibold">
              Selected Section: <span className="text-teal-700">{selectedSection.title}</span>
            </p>
          )}
        </div>

        {/* Tasks and input */}
        <div className="md:col-span-1">
          {selectedSection ? (
            <>
              <TaskInput onTaskAdded={addTask} sectionId={selectedSection.id} />
              {showNotification && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-center font-medium">
                  Task added successfully!
                </div>
              )}
              {loadingTasks ? (
                <p>Loading tasks...</p>
              ) : (
                <TaskList
                  tasks={tasks}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteTask}
                />
              )}
            </>
          ) : (
            <p className="text-gray-600 text-center mt-6">
              Please select a section to see and add tasks.
            </p>
          )}
        </div>

        {/* Calendar */}
        <Calendar
          tasks={tasks}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          className="md:col-span-1"
        />

        {/* Progress Chart */}
        <ProgressChart tasks={tasks} className="md:col-span-1" />
      </div>
    </div>
  );
}
