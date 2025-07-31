import React from "react";
import { CheckCircle, CalendarDays, BarChart2, Bell, User } from "lucide-react";

const features = [
  {
    title: "Track Daily Habits",
    description: "Effortlessly log your habits and stay on top of your routine.",
    icon: <CheckCircle className="h-8 w-8 text-teal-600" />,
  },
  {
    title: "Visual Calendar",
    description: "See your progress clearly across weeks and months.",
    icon: <CalendarDays className="h-8 w-8 text-teal-600" />,
  },
  {
    title: "Progress Analytics",
    description: "View habit strength, consistency, and completion trends.",
    icon: <BarChart2 className="h-8 w-8 text-teal-600" />,
  },
  {
    title: "Smart Reminders",
    description: "Stay consistent with intelligent, daily reminders.",
    icon: <Bell className="h-8 w-8 text-teal-600" />,
  },
  {
    title: "Personalized Dashboard",
    description: "A central hub to manage, track, and view your progress.",
    icon: <User className="h-8 w-8 text-teal-600" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-teal-700 mb-6">
          Why Use Habit Hubby?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Designed to keep you focused, consistent, and motivated.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-teal-50 border border-teal-100 rounded-2xl shadow hover:shadow-md transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-teal-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
