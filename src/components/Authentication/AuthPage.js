import React, {useState} from "react";
import Login from "./Login";
import Register from "./Register";
import "./AuthPage.css"
import Footer from "../Footer/Footer";
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

