import React, {useEffect, useState} from "react";
import Login from "./Login";
import Register from "./Register";
import "./AuthPage.css";
import Header from "../Home/Header";
import Sidebar from "../Home/Sidebar";
import ProductCard from "../ProductCard";
import Footer from "../Footer/Footer";
import ImageCard from "../ImageCard";
import apiClient from "../API/apiClient";
import {useNavigate} from "react-router-dom";
import HeaderWithSidebar from "../Home/HeaderWithSidebar";

const AuthPage = () => {

    // for header and sidebar===============
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => setIsLogin(!isLogin);

    return (
        <>
            <div className="homepage">
                <>
                    <HeaderWithSidebar/>
                </>

                <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
                    <div className="container">
                        <div className="form-wrapper">
                            <div className="tabs">
                                <button
                                    className={`tab ${isLogin ? "active" : ""}`}
                                    onClick={() => setIsLogin(true)}
                                >
                                    Login
                                </button>
                                <button
                                    className={`tab ${!isLogin ? "active" : ""}`}
                                    onClick={() => setIsLogin(false)}
                                >
                                    Register
                                </button>
                            </div>
                            {isLogin ? <Login toggleForm={toggleForm}/> : <Register toggleForm={toggleForm}/>}
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>

        </>

    );
};

export default AuthPage;

