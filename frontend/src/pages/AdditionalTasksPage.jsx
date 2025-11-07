import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const barData = [
  { name: 'Mon', completed: 3 },
  { name: 'Tue', completed: 4 },
  { name: 'Wed', completed: 5 },
  { name: 'Thu', completed: 2 },
  { name: 'Fri', completed: 6 },
];

const pieData = [
  { name: "Completed", value: 20 },
  { name: "Remaining", value: 10 },
];

const COLORS = ["#10B981", "#E5E7EB"];

// Demo tasks
const tasks = [
  { id: 1, title: "Finish report", status: "Completed" },
  { id: 2, title: "Email client", status: "Pending" },
  { id: 3, title: "Update website", status: "Completed" },
  { id: 4, title: "Organize files", status: "Pending" },
];

const AdditionalTasksPage = ({ onBack }) => {
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

      <h2>Additional Tasks Completion</h2>

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
        <p style={{ textAlign: "center" }}>Total Tasks: 30 | Completed: 20 | Pending: 10</p>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" fill="#10B981" />
        </BarChart>
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

export default AdditionalTasksPage;
