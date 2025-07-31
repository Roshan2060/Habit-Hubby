import React, { useState } from "react";

export default function TaskInput({ onAddTask }) {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleAdd = () => {
    if (!taskName || !taskDate) {
      alert("Please enter task name and date");
      return;
    }
    onAddTask(taskName, taskDate);
    setTaskName("");
    setTaskDate("");
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Task name"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        className="w-full border border-teal-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <input
        type="date"
        value={taskDate}
        onChange={e => setTaskDate(e.target.value)}
        className="w-full border border-teal-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <button
        onClick={handleAdd}
        className="w-full bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
      >
        Add Task
      </button>
    </div>
  );
}
