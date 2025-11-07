import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const lineData = [
  { name: 'Mon', completed: 5 },
  { name: 'Tue', completed: 8 },
  { name: 'Wed', completed: 6 },
  { name: 'Thu', completed: 10 },
  { name: 'Fri', completed: 7 },
];

const pieData = [
  { name: "Completed", value: 35 },
  { name: "Remaining", value: 15 },
];

const COLORS = ["#4F46E5", "#E5E7EB"];

// Demo tasks
const tasks = [
  { id: 1, title: "Launch campaign", status: "Completed" },
  { id: 2, title: "Prepare presentation", status: "Pending" },
  { id: 3, title: "Client meeting", status: "Completed" },
  { id: 4, title: "Review budget", status: "Pending" },
];

const PrioritizedTasksPage = ({ onBack }) => {
  const completedTasks = tasks.filter(t => t.status === "Completed");
  const pendingTasks = tasks.filter(t => t.status === "Pending");

  return (
    <div style={{ padding: "1rem" }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: "1rem",
          backgroundColor: "#4F46E5",
          color: "#fff",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h2>Prioritized Tasks Completion</h2>

      {/* Pie Chart */}
      <div style={{ width: "300px", margin: "1rem auto" }}>
        <PieChart width={300} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <p style={{ textAlign: "center" }}>Total Tasks: 50 | Completed: 35 | Pending: 15</p>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="completed" stroke="#4F46E5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* Task Lists */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Completed Tasks</h3>
        <ul>
          {completedTasks.map(t => <li key={t.id}>✅ {t.title}</li>)}
        </ul>

        <h3>Pending Tasks</h3>
        <ul>
          {pendingTasks.map(t => <li key={t.id}>⏳ {t.title}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default PrioritizedTasksPage;
