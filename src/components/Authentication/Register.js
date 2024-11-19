import React, {useState} from "react";
import "./AuthPage.css";
import apiClient from "../API/apiClient";
import successNotify from "../successNotify";
import errorNotify from "../errorNotify";
import {ToastContainer} from "react-toastify";

const Register = ({toggleForm}) => {

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await apiClient.post("/auth/register", {fullname, email, password});
            successNotify("Registration successful! Please log in.");
            toggleForm();
        } catch (error) {
            errorNotify("Registration failed. Please try again.");
        }
    };

    return (
        <>
            <div className="form">
                <h2>Join Us!</h2>
                <div className="input-group">
                    <label htmlFor="reg-name">Full Name</label>
                    <input
                        type="text"
                        id="reg-name"
                        placeholder="Enter your name"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="reg-email">Email</label>
                    <input
                        type="email"
                        id="reg-email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="reg-password">Password</label>
                    <input
                        type="password"
                        id="reg-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn" onClick={handleRegister}>
                    Register
                </button>
                <p className="switch-link">
                    Already have an account? <span onClick={toggleForm}>Login</span>
                </p>
                <ToastContainer/>
            </div>
        </>

    );
};

export default Register;
