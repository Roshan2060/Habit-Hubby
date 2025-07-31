import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#10B981", "#D1D5DB"]; // green, gray

export default function ProgressChart({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;

  const data = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: totalTasks - completedTasks },
  ];

  if (totalTasks === 0) {
    return <p className="text-gray-500">Add some tasks to see progress.</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Progress</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
            fill="#10B981"
            paddingAngle={3}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
