import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import Calendar from "./Calendar";
import ProgressChart from "./ProgressChart";

const API_URL = "http://127.0.0.1:8000/api/tasks/";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setTasks(res.data))
      .catch(err => console.error("Error fetching tasks:", err));
  }, []);

  const addTask = (name, date) => {
    axios.post(API_URL, { name, date, completed: false })
      .then(res => {
        setTasks(prev => [...prev, res.data]);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      })
      .catch(() => alert("Failed to add task"));
  };

  const toggleComplete = (id, completed) => {
    axios.patch(`${API_URL}${id}/`, { completed: !completed })
      .then(res => {
        setTasks(prev => prev.map(t => (t.id === id ? res.data : t)));
      })
      .catch(() => alert("Failed to update task"));
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}${id}/`)
      .then(() => {
        setTasks(prev => prev.filter(t => t.id !== id));
      })
      .catch(() => alert("Failed to delete task"));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-teal-50 to-white px-6 py-10"
    id="dashboard">
      <h1 className="text-5xl font-extrabold text-teal-700 mb-8">Habit Hubby Dashboard</h1>

      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <TaskInput onAddTask={addTask} />
          {showNotification && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-center font-medium">
              Task added successfully!
            </div>
          )}
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
          />
        </div>

        <Calendar tasks={tasks} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />

        <ProgressChart tasks={tasks} />
      </div>
    </div>
  );
}
