import React from "react";

export default function TaskList({ tasks, onToggleComplete, onDelete }) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <ul className="max-h-[350px] overflow-y-auto">
        {tasks.length === 0 && <p className="text-gray-500">No tasks found.</p>}

        {tasks.map(task => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b border-teal-100 py-2"
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id, task.completed)}
                className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500"
              />
              <span
                className={`select-none ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.name} - <span className="font-mono">{task.date}</span>
              </span>
            </label>

            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:text-red-800 transition"
              aria-label={`Delete task ${task.name}`}
            >
              &#10005;
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

