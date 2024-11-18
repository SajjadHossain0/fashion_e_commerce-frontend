import React, {useEffect, useState} from "react";
import "./HomePage.css";
import ProductCard from "../ProductCard";
import {CgProfile} from "react-icons/cg";
import {FaCartPlus} from "react-icons/fa";
import Footer from "../Footer/Footer";
import apiClient from "../API/apiClient";
import Advertisement from "../Ads/Advertisement";
import ImageCard from "../ImageCard";

export default function HomePage() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default based on screen size
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // To store categories with subcategories
    const [ads, setAds] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await apiClient.get("/products");
            setProducts(response.data); // Set the fetched products to state
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    const fetchCategories = async () => {
        try {
            const response = await apiClient.get("/categories");
            console.log("Fetched categories:", response.data);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    const fetchAdvertisements = async () => {
        try {
            const response = await apiClient.get("/ads");
            setAds(response.data);
        } catch (error) {
            console.error("Error fetching ads:", error);
        }
    };

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

        fetchAdvertisements();
        fetchProducts();
        fetchCategories();

        // Attach resize event listener
        window.addEventListener("resize", handleResize);
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const images = [
        'https://via.placeholder.com/800x300?text=Ad+1',
        'https://via.placeholder.com/800x300?text=Ad+2',
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

                <div className="ads-div">
                    <Advertisement/>
                    {/*{ads.map((ad) => (
                        <Advertisement
                            key={ad.id}
                            images={[`data:image/jpeg;base64,${ad.image}`]}  // Ensure it's an array
                        />
                    ))}*/}
                </div>


                <div className="image-grid-div">
                    <h1 align="center" style={{marginTop: 20, fontSize: 30, fontWeight: 700}}>New Arrival</h1>

                    <div className="image-grid">
                        {categories.map((category) => (
                            <ImageCard key={category.id} text={category.name}
                                       imageSrc={`data:image/jpeg;base64,${category.image}`}/>
                        ))}
                    </div>
                </div>

                <div className="product-grid-div">
                    <div className="product-grid">
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
                </div>

            </main>
            <Footer/>
        </div>
    );
}