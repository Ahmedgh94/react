import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login_signup.css";

const Login_signup = ({ onAuth }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLoginMode) {
        // 🔐 LOGIN
        const response = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Bewaar token in localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          alert("✅ Login succesvol!");
          onAuth(data.user);
          navigate("/");
        } else {
          alert(data.message || "❌ Ongeldige inloggegevens");
        }
      } else {
        // 📝 SIGNUP
        if (password !== confirmPass) {
          alert("❌ Wachtwoorden komen niet overeen");
          return;
        }

        const response = await fetch("http://localhost:8000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("✅ Registratie succesvol! Je kunt nu inloggen.");
          setIsLoginMode(true);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPass("");
        } else {
          alert(data.message || "❌ Er ging iets mis bij registratie");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Serverfout — controleer je API");
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{isLoginMode ? "Login" : "Signup"}</h2>
      </div>

      <div className="form-toggle">
        <button
          onClick={() => setIsLoginMode(true)}
          className={`toggle-btn ${isLoginMode ? "active" : ""}`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLoginMode(false)}
          className={`toggle-btn ${!isLoginMode ? "active" : ""}`}
        >
          Signup
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <input
            type="text"
            placeholder="Naam"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="E-mailadres"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Wachtwoord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {!isLoginMode && (
          <input
            type="password"
            placeholder="Bevestig wachtwoord"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
        )}

        <button type="submit" className="submit-btn">
          {isLoginMode ? "Login" : "Signup"}
        </button>

        <p className="switch-text">
          {isLoginMode
            ? "Nog geen account?"
            : "Heb je al een account?"}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsLoginMode(!isLoginMode);
            }}
          >
            {isLoginMode ? " Registreer nu" : " Log in"}
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login_signup;
