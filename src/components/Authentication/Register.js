import React from "react";
import "./AuthPage.css";

const Register = ({ toggleForm }) => {
    return (
        <div className="form">
            <h2>Join Us!</h2>
            <div className="input-group">
                <label htmlFor="reg-name">Full Name</label>
                <input
                    type="text"
                    id="reg-name"
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="reg-email">Email</label>
                <input
                    type="email"
                    id="reg-email"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="reg-password">Password</label>
                <input
                    type="password"
                    id="reg-password"
                    placeholder="Enter your password"
                    required
                />
            </div>
            <button type="submit" className="btn">
                Register
            </button>
            <p className="switch-link">
                Already have an account? <span onClick={toggleForm}>Login</span>
            </p>
        </div>
    );
};

export default Register;
