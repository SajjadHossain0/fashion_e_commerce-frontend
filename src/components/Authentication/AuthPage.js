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

const AuthPage = () => {

    // for header and sidebar===============
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const fetchCategories = async () => {
        try {
            const response = await apiClient.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    const navigate = useNavigate();
    const handleCategoryClick = (category) => {
        navigate(`/category/${category.id}`); // Redirect to category-specific page
    };
    const handleSubcategoryClick = (subcategory) => {
        navigate(`/subcategory/${subcategory.id}`); // Navigate to Subcategory Page
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    //=================================

    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => setIsLogin(!isLogin);

    return (
        <>
            <div className="homepage">
                <>
                    <Header toggleSidebar={toggleSidebar}/>
                    <Sidebar
                        isSidebarOpen={isSidebarOpen}
                        categories={categories}
                        handleCategoryClick={handleCategoryClick}
                        handleSubcategoryClick={handleSubcategoryClick}
                    />
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

