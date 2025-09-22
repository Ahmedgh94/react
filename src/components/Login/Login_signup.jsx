import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate
import './login_signup.css';

const Login_signup = ({ onAuth }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navigate = useNavigate(); // استخدام useNavigate للتوجيه بعد تسجيل الدخول

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      // 📌 Login Mode
      const response = await fetch("http://localhost:5000/users");
      const users = await response.json();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        alert("✅ Login successful");
        onAuth(user); // We send the user info to the father(App or Movielist)
        navigate("/"); // التوجيه إلى الصفحة الرئيسية بعد تسجيل الدخول
      } else {
        alert("❌ Invalid email or password");
      }
    } else {
      // 📌 Signup Mode
      if (password !== confirmPass) {
        alert("❌ Passwords do not match");
        return;
      }

      const newUser = { name, email, password };

      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const _savedUser = await response.json();
        alert("✅ Signup successful, you can login now!");
        setIsLoginMode(true); // العودة إلى وضع تسجيل الدخول
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPass('');
      } else {
        alert("❌ Error while signing up");
      }
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
          className={`toggle-btn ${isLoginMode ? 'active' : ''}`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLoginMode(false)}
          className={`toggle-btn ${!isLoginMode ? 'active' : ''}`}
        >
          Signup
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {!isLoginMode && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
        )}

        {isLoginMode && (
          <div>
            <p>Forgot Password?</p>
          </div>
        )}

        <button type="submit" className="submit-btn">
          {isLoginMode ? "Login" : "Signup"}
        </button>

        <p className="switch-text">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsLoginMode(!isLoginMode);
            }}
          >
            {isLoginMode ? " Signup now" : " Login"}
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login_signup;
