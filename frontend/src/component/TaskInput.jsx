import React, { useState } from "react";

export default function TaskInput({ sectionId, onTaskAdded }) {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!taskName || !taskDate) {
      alert("Please enter task name and date");
      return;
    }

    if (!sectionId) {
      alert("Please select a section first.");
      return;
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("You must be logged in to add tasks.");
      return;
    }

    const taskData = {
      name: taskName,
      date: taskDate,
      section: sectionId,  // <-- Add section ID here
    };

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (response.status === 401) {
        alert("Unauthorized. Please login again.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        let errorMessage = "Failed to add task";
        try {
          const errorData = await response.json();
          errorMessage = JSON.stringify(errorData);
          console.error("Backend error:", errorData);
        } catch {
          console.error("Could not parse error response.");
        }
        alert(errorMessage);
        setLoading(false);
        return;
      }

      const result = await response.json();
      alert("Task added successfully!");

      setTaskName("");
      setTaskDate("");

      if (onTaskAdded) onTaskAdded(result);
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error: Unable to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="w-full border border-teal-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        disabled={loading}
      />
      <input
        type="date"
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
        className="w-full border border-teal-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        disabled={loading}
      />
      <button
        onClick={handleAdd}
        disabled={loading || !taskName || !taskDate}
        className="w-full bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </div>
  );
}
