import React, { useEffect, useState } from "react";
import "./CreatorPage.css";

const demoCreators = [
  { id: 1, user: { username: "Alice" }, bio: "Music creator 🎵", wallet_address: "0xDEMO1" },
  { id: 2, user: { username: "Bob" }, bio: "Art enthusiast 🎨", wallet_address: "0xDEMO2" },
  { id: 3, user: { username: "Charlie" }, bio: "Tech reviewer 💻", wallet_address: "0xDEMO3" },
];

const demoPayments = [
  { id: 1, amount: 5, creator: demoCreators[0], status: "Completed" },
  { id: 2, amount: 2.5, creator: demoCreators[1], status: "Pending" },
  { id: 3, amount: 3, creator: demoCreators[2], status: "Pending" },
];

const TasksPage = ({ payments, setPayments, onBack }) => {
  const [tips, setTips] = useState({});
  const [aiPlan, setAiPlan] = useState("");


  const handleTip = (creatorId) => {
    const suggestedTip = Math.floor(Math.random() * 5 + 1);
    setTips({ ...tips, [creatorId]: suggestedTip });
  };

  const handleGenerateAIPlan = () => {
    setAiPlan("Demo AI Plan: Suggest paying top creators first and optimize tips!");
  };

  // Filter pending payments
  const pendingPayments = payments.filter((p) => p.status === "Pending");

  // Common button style
  const buttonStyle = {
    backgroundColor: "#4F46E5",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
    marginLeft: "0.5rem",
  };

  return (
    <div className="creatorpage-container">
      <header className="creatorpage-header">
        <div>
          <h1>Tasks Dashboard</h1>
          <p>Pending payments, AI suggestions, and tips</p>
        </div>
        <div className="header-actions">
          <button style={buttonStyle} onClick={onBack}>
            Back to Dashboard
          </button>
        </div>
      </header>

      <div className="card">
        <h2>Pending Payments</h2>
        <ul>
          {pendingPayments.length === 0 && <li>No pending payments</li>}
          {pendingPayments.map((p) => (
            <li key={p.id}>
              💵 ${p.amount} — {p.creator.user.username}{" "}
              <button style={buttonStyle} onClick={() => handleTip(p.creator.id)}>
                Suggest AI Tip
              </button>
              {tips[p.creator.id] && (
                <span className="tip-result"> 💰 Suggested Tip: ${tips[p.creator.id]} USDC</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>AI Payment Plan</h2>
        <button style={buttonStyle} onClick={handleGenerateAIPlan}>
          Generate AI Plan
        </button>
        {aiPlan && <p className="ai-result">💡 {aiPlan}</p>}
      </div>
    </div>
  );
};

export default TasksPage;
