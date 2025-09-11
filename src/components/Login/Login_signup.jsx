import React from 'react';
import './login_signup.css';

const Login_signup = () => {
  const [isLoginMode, setIsLoginMode] = React.useState(true); // Toggle between login and signup
  
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

      {/* form section */}
      <form action="">
        {!isLoginMode && (
          <input type="text" placeholder="Name" required />
        )}

        {/* shared input fields */}
        <input type="email" placeholder="Email address" required />
        <input type="password" placeholder="Password" required />

        {/* signup mode */}
        {!isLoginMode && (
          <input type="password" placeholder="Confirm Password" required />
        )}

        {/* forget password for login mode */}
        {isLoginMode && (
          <div>
            <p>Forgot Password?</p>
          </div>
        )}

        {/* shared button */}
        <button className="submit-btn">
          {isLoginMode ? "Login" : "Signup"}
        </button>

        {/* switch link */}
        <p className="switch-text">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}  
          <a href="#" onClick={() => setIsLoginMode(!isLoginMode)}>
            {isLoginMode ? "Signup now" : "Login"}
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login_signup;
