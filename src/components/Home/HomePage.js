import React, {useEffect, useState} from "react";
import "./HomePage.css";
import ProductCard from "../ProductCard";
import {CgProfile} from "react-icons/cg";
import {FaCartPlus} from "react-icons/fa";
import Footer from "../Footer/Footer";
import apiClient from "../API/apiClient";

export default function HomePage() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768); // Default based on screen size
    const [products, setProducts] = useState([]);

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

        // Attach resize event listener
        window.addEventListener("resize", handleResize);
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="homepage">
            <header className="navbar">
                <button className="toggle-btn" onClick={toggleSidebar}>
                    ☰
                </button>
                <div className="logo">MyLogo</div>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                </div>
                <div className="nav-icons">
                    <a className="icon"><CgProfile /></a>
                    <a className="icon"><FaCartPlus/></a>
                </div>
            </header>

            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <ul>
                    <li>Dashboard</li>
                    <li>Profile</li>
                    <li>Orders</li>
                    <li>Settings</li>
                    <li>Logout</li>
                </ul>
            </div>

            <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
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
            <Footer />
        </div>
    );
}