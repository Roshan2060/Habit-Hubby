import React from "react";

export default function Calendar({ tasks, currentMonth, setCurrentMonth }) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const tasksByDate = tasks.reduce((acc, task) => {
    acc[task.date] = acc[task.date] ? [...acc[task.date], task] : [task];
    return acc;
  }, {});

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const formatDate = (day) => {
    const d = day < 10 ? `0${day}` : day;
    const m = month + 1 < 10 ? `0${month + 1}` : month + 1;
    return `${year}-${m}-${d}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="px-3 py-1 rounded hover:bg-teal-100 transition"
          aria-label="Previous month"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold">
          {currentMonth.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button
          onClick={nextMonth}
          className="px-3 py-1 rounded hover:bg-teal-100 transition"
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-teal-600 select-none mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells before first day */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={"empty-" + i} className="h-10"></div>
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const dateStr = formatDate(dayNum);
          const dayTasks = tasksByDate[dateStr] || [];
          const isToday = dateStr === todayStr;

          return (
            <div
              key={dateStr}
              className={`h-10 rounded cursor-pointer select-none
                ${isToday ? "bg-teal-500 text-white font-semibold" : ""}
                ${dayTasks.length ? "border border-teal-300" : ""}
              `}
              title={dayTasks.map(t => t.name).join(", ")}
            >
              <span className="inline-block leading-10">{dayNum}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
