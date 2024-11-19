import React, {useEffect, useState} from "react";
import "./HomePage.css";
import ProductCard from "../ProductCard";
import {CgProfile} from "react-icons/cg";
import {FaCartPlus} from "react-icons/fa";
import Footer from "../Footer/Footer";
import apiClient from "../API/apiClient";
import Advertisement from "./Advertisement";
import ImageCard from "../ImageCard";
import {Link, useNavigate} from "react-router-dom";
import ProductDetails from "./ProductDetails";
import {TiThMenu} from "react-icons/ti";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Profile() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await apiClient.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
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


    return (
        <div className="homepage">
            <Header toggleSidebar={toggleSidebar}/>
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                categories={categories}
                handleCategoryClick={handleCategoryClick}
                handleSubcategoryClick={handleSubcategoryClick}
            />
            <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
                <h1>hello</h1>
            </main>
            <Footer/>
        </div>
    );
}
