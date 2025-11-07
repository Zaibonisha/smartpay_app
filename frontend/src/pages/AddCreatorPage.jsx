import React, { useState } from "react";

// Define creator types with icons
const creatorTypes = [
  { value: "Music", label: "Music 🎵" },
  { value: "Art", label: "Art 🎨" },
  { value: "Tech", label: "Tech 💻" },
];

const AddCreatorPage = ({ onBack, onAddCreator }) => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [wallet, setWallet] = useState("");
  const [creatorType, setCreatorType] = useState("");
  const [aiTip, setAiTip] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !bio || !wallet || !creatorType) {
      alert("Please fill in all required fields");
      return;
    }

    const typeLabel = creatorTypes.find((t) => t.value === creatorType)?.label;

    onAddCreator({
      id: Date.now(),
      user: { username },
      bio,
      wallet_address: wallet,
      creator_type: typeLabel,
      suggested_ai_tip: aiTip || "💡 Default AI Tip",
    });

    setUsername("");
    setBio("");
    setWallet("");
    setCreatorType("");
    setAiTip("");
    alert("Creator added successfully!");
  };

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#F9FAFB",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "450px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            marginBottom: "1.5rem",
            backgroundColor: "#4F46E5",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#4338CA")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4F46E5")}
        >
          ← Back
        </button>

        <h2 style={{ marginBottom: "1rem", color: "#1F2937" }}>Add New Creator</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #D1D5DB",
              outline: "none",
              transition: "border 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
            onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
          />
          <input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #D1D5DB",
              outline: "none",
              transition: "border 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
            onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
          />
          <input
            type="text"
            placeholder="Wallet Address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #D1D5DB",
              outline: "none",
              transition: "border 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
            onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
          />

          <select
            value={creatorType}
            onChange={(e) => setCreatorType(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #D1D5DB",
              outline: "none",
              backgroundColor: "#fff",
              transition: "border 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
            onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
          >
            <option value="">Select Creator Type</option>
            {creatorTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Suggested AI Tip (optional)"
            value={aiTip}
            onChange={(e) => setAiTip(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #D1D5DB",
              outline: "none",
              transition: "border 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
            onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
          />

          {aiTip && (
            <div
              style={{
                backgroundColor: "#FEF3C7",
                color: "#B45309",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                display: "inline-block",
                alignSelf: "flex-start",
              }}
            >
              {aiTip}
            </div>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: "#10B981",
              color: "#fff",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#059669")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#10B981")}
          >
            Add Creator
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCreatorPage;
