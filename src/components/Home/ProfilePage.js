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
import HeaderWithSidebar from "./HeaderWithSidebar";

export default function Profile() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await apiClient.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    return (
        <div className="homepage">
            <HeaderWithSidebar/>
            <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
                <h1>hello</h1>
            </main>
            <Footer/>
        </div>
    );
}
