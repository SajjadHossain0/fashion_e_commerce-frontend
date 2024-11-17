import React, {useEffect, useState} from "react";
import "./HomePage.css";
import ProductCard from "../ProductCard";
import {CgProfile} from "react-icons/cg";
import {FaCartPlus} from "react-icons/fa";
import Footer from "../Footer/Footer";
import apiClient from "../API/apiClient";
import Advertisement from "../Ads/Advertisement";

export default function HomePage() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default based on screen size
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // To store categories with subcategories
    const [expandedCategory, setExpandedCategory] = useState(null); // To track expanded category

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            // Adjust sidebar visibility based on screen size
            if (window.innerWidth > 768) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        // Fetch products on mount
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get("/products");
                setProducts(response.data); // Set the fetched products to state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();

        const fetchCategories = async () => {
            try {
                const response = await apiClient.get("/categories");
                console.log("Fetched categories:", response.data);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();

        // Attach resize event listener
        window.addEventListener("resize", handleResize);
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

// Toggle subcategory visibility
    const toggleCategory = (categoryId) => {
        console.log("Toggling category:", categoryId);
        setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
        console.log("Expanded Category State:", expandedCategory);

    };
    const adImages = [
        "https://via.placeholder.com/851x285",
        "https://via.placeholder.com/851x285",
        "https://via.placeholder.com/851x285",
        "https://via.placeholder.com/851x285",
        "https://via.placeholder.com/851x285",
    ];

    return (
        <div className="homepage">
            <header className="navbar">
                <button className="toggle-btn" onClick={toggleSidebar}>
                    ☰
                </button>
                <div className="logo">MyLogo</div>
                <div className="search-bar">
                    <input type="text" placeholder="Search..."/>
                </div>
                <div className="nav-icons">
                    <a className="icon"><CgProfile/></a>
                    <a className="icon"><FaCartPlus/></a>
                </div>
            </header>

            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <h3 className="sidebar-title">Categories</h3>
                <div className="category-list">
                    {categories.map((category) => (
                        <details key={category.id} className="category-details">
                            <summary className="category-name">{category.name}</summary>
                            <ul className="subcategory-list">
                                {(category.subcategories || []).map((subCategory) => (
                                    <li key={subCategory.id} className="subcategory-item">
                                        {subCategory.name}
                                    </li>
                                ))}
                            </ul>
                        </details>
                    ))}
                </div>
            </div>

            <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
                <Advertisement images={adImages} interval={3000}/>
                <div className="product-grid">
                    {/* Render multiple ProductCards */}
                    {products.map((product) => (
                        <ProductCard key={product.id}
                                     image={`data:image/jpeg;base64,${product.image}`}
                                     title={product.title}
                                     description={product.description}
                                     price={product.price}
                                     discountedPrice={product.discountedPrice}
                        />
                    ))}
                </div>
            </main>
            <Footer/>
        </div>
    );
}