import React, { useState } from "react";
import CreatorPage from "./pages/CreatorPage";
import "./App.css";
import heroImage from "./assets/hero_image.png"; // ✅ Import the hero image

function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("");
  const [authForm, setAuthForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: authForm.username,
          password: authForm.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setUser({ username: authForm.username });
        setMessage("✅ Login successful!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("❌ Invalid credentials");
      }
    } catch {
      setMessage("❌ Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authForm),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setUser({ username: authForm.username });
        setMessage("✅ Registration successful!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("❌ " + (data.detail || "Registration failed"));
      }
    } catch {
      setMessage("❌ Registration failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setMessage("");
  };

  const features = [
    {
      icon: "🎯",
      title: "AI-Powered Tipping",
      description:
        "Our AI analyzes engagement levels and metrics to suggest fair USDC tips so creators get rewarded for real impact.",
    },
    {
      icon: "💡",
      title: "Smart Payment Plans",
      description:
        "AI-generated payment plans let you automate recurring support for your favorite creators and projects.",
    },
    {
      icon: "🔒",
      title: "Secure Blockchain Payments",
      description:
        "SmartPay ensures every transaction is secure, transparent, and tamper-proof through blockchain technology.",
    },
  ];

  if (user) return <CreatorPage user={user} onLogout={handleLogout} />;

  return (
    <div className="app-container">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">SmartPay</div>
        <div className="auth-buttons-top">
          <button
            className="auth-button login"
            onClick={() => {
              setAuthMode("login");
              setMessage("");
            }}
          >
            Login
          </button>
          <button
            className="auth-button register"
            onClick={() => {
              setAuthMode("register");
              setMessage("");
            }}
          >
            Register
          </button>
        </div>
      </header>

      {!authMode && (
        <>
          {/* HERO SECTION */}
          <section className="hero-section">
            <div className="hero-text">
              <h1>
                Take your <span>payment experience</span> to the next level
              </h1>
              <p>
                We are dedicated to helping creators and businesses grow through
                secure AI-powered blockchain payments.
              </p>
              <button
                className="hero-btn"
                onClick={() => setAuthMode("register")}
              >
                Get Started
              </button>
            </div>

            {/* ✅ Hero Image */}
            <div className="hero-image">
              <img src={heroImage} alt="SmartPay Hero" className="hero-img" />
            </div>
          </section>

          {/* FEATURES */}
          <section className="features-section">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <p className="feature-description">{f.description}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {/* AUTH FORM */}
      {authMode && (
        <div className="auth-form-container">
          <h2 className="auth-form-title">
            {authMode === "login" ? "Login" : "Register"}
          </h2>
          <form
            onSubmit={authMode === "login" ? handleLogin : handleRegister}
          >
            <input
              className="auth-input"
              placeholder="Username"
              value={authForm.username}
              onChange={(e) =>
                setAuthForm({ ...authForm, username: e.target.value })
              }
              required
            />
            {authMode === "register" && (
              <input
                className="auth-input"
                type="email"
                placeholder="Email"
                value={authForm.email}
                onChange={(e) =>
                  setAuthForm({ ...authForm, email: e.target.value })
                }
                required
              />
            )}
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
              required
            />
            <button type="submit" className={`submit-button ${authMode}`}>
              {authMode === "login" ? "Login" : "Register"}
            </button>
          </form>
          {message && <p className="message">{message}</p>}
          <div
            className="back-button"
            onClick={() => {
              setAuthMode("");
              setMessage("");
            }}
          >
            ← Back to Home
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
