import React, { useState } from "react";
import "./CreatorPage.css";

const ProfileSettings = ({ user, onUpdateUser }) => {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = () => {
    // Example: Normally you'd call an API here
    const updatedUser = { ...user, username, bio, email };
    if (password) updatedUser.password = password;

    onUpdateUser(updatedUser); // update parent state
    setMessage("Profile updated successfully!");
    setPassword(""); // clear password field
  };

  // Button style same as logout / dashboard buttons
  const buttonStyle = {
    backgroundColor: "#4F46E5",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
    marginTop: "0.5rem",
  };

  return (
    <div className="creatorpage-container">
      <header className="creatorpage-header">
        <div>
          <h1>Profile Settings</h1>
          <p>Update your personal information</p>
        </div>
      </header>

      <div className="creatorpage-grid">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="avatar">{username[0]}</div>
          <h2>{username}</h2>
          <p>{bio || "Your bio goes here..."}</p>
        </div>

        {/* Settings Form */}
        <div className="card">
          <h2>Edit Information</h2>
          <div className="input-row">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-row">
            <input
              type="text"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="input-row">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-row">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button style={buttonStyle} onClick={handleSave}>
            Save Changes
          </button>
          {message && <p className="success-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
