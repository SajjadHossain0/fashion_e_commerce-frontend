import React from "react";
import "./AuthPage.css";

const Login = ({ toggleForm }) => {
    return (
        <div className="form">
            <h2>Welcome Back!</h2>
            <div className="input-group">
                <label htmlFor="login-email">Email</label>
                <input
                    type="email"
                    id="login-email"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="login-password">Password</label>
                <input
                    type="password"
                    id="login-password"
                    placeholder="Enter your password"
                    required
                />
            </div>
            <button type="submit" className="btn">
                Login
            </button>
            <p className="switch-link">
                Don't have an account? <span onClick={toggleForm}>Register</span>
            </p>
        </div>
    );
};

export default Login;
