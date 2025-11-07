import React, { useEffect, useState } from "react";
import "./CreatorPage.css";
import ProfileSettings from "./ProfileSettings";
import TasksPage from "./TasksPage";
import PrioritizedTasksPage from "./PrioritizedTasksPage";
import AdditionalTasksPage from "./AdditionalTasksPage";
import AddCreatorPage from "./AddCreatorPage";

const demoCreators = [
  { id: 1, user: { username: "Alice" }, bio: "Music creator 🎵", wallet_address: "0xDEMO1", creator_type: "Music", suggested_ai_tip: "💡 Tip: Engage fans" },
  { id: 2, user: { username: "Bob" }, bio: "Art enthusiast 🎨", wallet_address: "0xDEMO2", creator_type: "Art", suggested_ai_tip: "💡 Tip: Showcase portfolio" },
  { id: 3, user: { username: "Charlie" }, bio: "Tech reviewer 💻", wallet_address: "0xDEMO3", creator_type: "Tech", suggested_ai_tip: "💡 Tip: Review trending gadgets" },
];

const demoPayments = [
  { id: 1, amount: 5, creator: demoCreators[0], status: "Completed" },
  { id: 2, amount: 2.5, creator: demoCreators[1], status: "Pending" },
  { id: 3, amount: 3, creator: demoCreators[2], status: "Pending" },
];

const CreatorPage = ({ user, onLogout }) => {
  const [creators, setCreators] = useState([]);
  const [tips, setTips] = useState({});
  const [payments, setPayments] = useState([]);
  const [amount, setAmount] = useState("");
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [aiTopic, setAiTopic] = useState("");
  const [aiPlan, setAiPlan] = useState("");
  const [aiTipTopic, setAiTipTopic] = useState("");
  const [aiTipResult, setAiTipResult] = useState("");
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [showTasksPage, setShowTasksPage] = useState(false);
  const [showPrioritizedTasks, setShowPrioritizedTasks] = useState(false);
  const [showAdditionalTasks, setShowAdditionalTasks] = useState(false);
  const [showAddCreatorPage, setShowAddCreatorPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCreators(demoCreators);
    setPayments(demoPayments);
  }, []);

  // --- Tip suggestion ---
  const handleTip = (creatorId) => {
    const suggestedTip = Math.floor(Math.random() * 5 + 1);
    setTips({ ...tips, [creatorId]: suggestedTip });
  };

  // --- Add Payment ---
  const handleCreatePayment = () => {
    if (!selectedCreator || !amount) {
      alert("Select creator and enter amount");
      return;
    }
    const newPayment = {
      id: payments.length + 1,
      amount: parseFloat(amount),
      creator: creators.find((c) => c.id === parseInt(selectedCreator)),
      status: "Pending",
    };
    setPayments([...payments, newPayment]);
    setAmount("");
    setSelectedCreator(null);
  };

  // --- Generate AI Plan ---
  const handleGeneratePlan = () => {
    if (aiTopic) {
      setAiPlan(`Demo AI plan for "${aiTopic}"`);
    } else {
      const filteredCreators = creators.filter((c) =>
        c.user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredCreators.length > 0) {
        const names = filteredCreators.map((c) => c.user.username).join(", ");
        setAiPlan(`Suggest paying ${names} first and optimize tips!`);
      } else {
        setAiPlan("No creators to suggest payment for.");
      }
    }
  };

  // --- Generate AI Tip ---
  const handleGenerateAITip = () => {
    if (!aiTipTopic) {
      alert("Please enter a topic for AI tip generation");
      return;
    }
    const generatedTip = `💡 AI Tip for "${aiTipTopic}": Focus on consistency and engagement!`;
    setAiTipResult(generatedTip);
    setAiTipTopic("");
  };

  // --- Update user ---
  const handleUpdateUser = (updatedUser) => {
    console.log("Updated user info:", updatedUser);
    setShowProfileSettings(false);
  };

  // --- Add Creator ---
  const handleAddCreator = (newCreator) => {
    setCreators([...creators, newCreator]);
    setShowAddCreatorPage(false);
  };

  // --- Remove Creator ---
  const handleRemoveCreator = (creatorId) => {
    const confirmed = window.confirm("Are you sure you want to remove this creator?");
    if (!confirmed) return;

    const updatedCreators = creators.filter((c) => c.id !== creatorId);
    const updatedPayments = payments.filter((p) => p.creator.id !== creatorId);
    setCreators(updatedCreators);
    setPayments(updatedPayments);
  };

  // --- Conditional rendering ---
  if (showProfileSettings) return <ProfileSettings user={user} onUpdateUser={handleUpdateUser} />;
  if (showTasksPage)
  return (
    <TasksPage
      payments={payments}         // pass current payments
      setPayments={setPayments}   // so tips/additions can update state
      onBack={() => setShowTasksPage(false)}
    />
  );

  if (showPrioritizedTasks) return <PrioritizedTasksPage onBack={() => setShowPrioritizedTasks(false)} />;
  if (showAdditionalTasks) return <AdditionalTasksPage onBack={() => setShowAdditionalTasks(false)} />;
  if (showAddCreatorPage) return <AddCreatorPage onBack={() => setShowAddCreatorPage(false)} onAddCreator={handleAddCreator} />;

  // --- Filter creators & payments ---
  const filteredCreators = creators.filter((c) =>
    c.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPayments = payments.filter((p) =>
    p.creator.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="creatorpage-container">
      {/* Header */}
      <header className="creatorpage-header">
        <div>
          <h1>Welcome, {user.username}</h1>
          <p>Your personal dashboard overview</p>
        </div>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search creators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            style={{
              backgroundColor: "#4F46E5",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
            }}
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="creatorpage-grid">
        <div className="profile-card" onClick={() => setShowProfileSettings(true)} style={{ cursor: "pointer" }}>
          <div className="avatar">{user.username[0]}</div>
          <h2>{user.username}</h2>
          <p>Design Manager</p>
          <small>Click to edit profile</small>
        </div>

        <div className="stat-card purple" onClick={() => setShowPrioritizedTasks(true)} style={{ cursor: "pointer" }}>
          <p>Prioritized Tasks</p>
          <h2>83%</h2>
          <small>Avg. Completed</small>
        </div>

        <div className="stat-card blue" onClick={() => setShowAdditionalTasks(true)} style={{ cursor: "pointer" }}>
          <p>Additional Tasks</p>
          <h2>56%</h2>
          <small>Avg. Completed</small>
        </div>
      </div>

      {/* Add Creator Button */}
      <div style={{ margin: "1rem 0" }}>
        <button
          onClick={() => setShowAddCreatorPage(true)}
          style={{
            backgroundColor: "#10B981",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          + Add New Creator
        </button>
      </div>

      {/* AI Payment Plan */}
      <div className="card">
        <h2>AI Payment Plan</h2>
        <div className="input-row">
          <input type="text" placeholder="Enter topic (optional)" value={aiTopic} onChange={(e) => setAiTopic(e.target.value)} />
          <button onClick={handleGeneratePlan}>Generate</button>
        </div>
        {aiPlan && <p className="ai-result">💡 {aiPlan}</p>}
      </div>

      {/* AI Tip Generator */}
      <div className="card" style={{ marginTop: "1rem" }}>
        <h2>AI Tip Generator</h2>
        <div className="input-row">
          <input type="text" placeholder="Enter topic for AI tip" value={aiTipTopic} onChange={(e) => setAiTipTopic(e.target.value)} />
          <button onClick={handleGenerateAITip}>Generate Tip</button>
        </div>
        {aiTipResult && <p className="ai-result">{aiTipResult}</p>}
      </div>

      {/* Payments */}
      <div className="card">
        <h2>Payments</h2>
        <div className="input-row">
          <select value={selectedCreator || ""} onChange={(e) => setSelectedCreator(e.target.value)}>
            <option value="">Select Creator</option>
            {creators.map((c) => (
              <option key={c.id} value={c.id}>{c.user.username}</option>
            ))}
          </select>
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button onClick={handleCreatePayment}>Add Payment</button>
        </div>
        <ul>
          {filteredPayments.length === 0 && <li>No payments match your search.</li>}
          {filteredPayments.map((p) => (
            <li key={p.id}>
              💵 ${p.amount} — {p.creator.user.username} <span className={`status ${p.status.toLowerCase()}`}>{p.status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Creators & Tips */}
      <div className="card">
        <h2>Creators & AI Tips</h2>
        <div className="creator-grid">
          {filteredCreators.length === 0 && <p>No creators match your search.</p>}
          {filteredCreators.map((creator) => (
            <div key={creator.id} className="creator-card">
              <p className="creator-name">{creator.user.username}</p>
              <p className="creator-bio">{creator.bio}</p>
              <p>Type: {creator.creator_type || "N/A"}</p>
              <small>Wallet: {creator.wallet_address}</small>
              <p>AI Tip: {creator.suggested_ai_tip || "💡 Default Tip"}</p>

              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button
                  onClick={() => handleTip(creator.id)}
                  style={{
                    backgroundColor: "#4F46E5",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  Suggest AI Tip
                </button>

                <button
                  onClick={() => handleRemoveCreator(creator.id)}
                  style={{
                    backgroundColor: "#EF4444",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  Remove
                </button>
              </div>

              {tips[creator.id] && <p className="tip-result">💰 Suggested Tip: ${tips[creator.id]} USDC</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Button to Tasks Page */}
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => setShowTasksPage(true)}
          style={{
            backgroundColor: "#4F46E5",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          View Pending Tasks
        </button>
      </div>
    </div>
  );
};

export default CreatorPage;
