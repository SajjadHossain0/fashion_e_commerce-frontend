import React from "react";
import "./AuthPage.css";
import apiClient from "../API/apiClient";
import errorNotify from "../errorNotify";
import successNotify from "../successNotify";
import {ToastContainer} from "react-toastify";

const Login = ({ toggleForm }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = async () => {
        try {
            const response = await apiClient.post("/auth/login", { email, password });
            const { token, role } = response.data;

            // Debug: Log the received role
            console.log("User role received from backend:", role);

            // Save token and role to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            successNotify("Login successful!");

            // Redirect based on role
            if (role === "ROLE_ADMIN") {
                console.log("Redirecting to /admin-dashboard");
                window.location.href = "/admin-dashboard"; // Admin dashboard
            } else if (role === "ROLE_USER") {
                console.log("Redirecting to /profile");
                window.location.href = "/profile"; // User profile
            } else {
                console.log("Unexpected role, redirecting to default /");
                window.location.href = "/";
            }
        } catch (error) {
            errorNotify("Login failed. Please check your credentials.");
            console.error("Error during login:", error);
        }
    };


    return (
        <>
            <div className="form">
                <h2>Welcome Back!</h2>
                <div className="input-group">
                    <label htmlFor="login-email">Email</label>
                    <input
                        type="email"
                        id="login-email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="login-password">Password</label>
                    <input
                        type="password"
                        id="login-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn" onClick={handleLogin}>
                    Login
                </button>
                <p className="switch-link">
                    Don't have an account? <span onClick={toggleForm}>Register</span>
                </p>
                <ToastContainer/>
            </div>
        </>

    );
};

export default Login;
