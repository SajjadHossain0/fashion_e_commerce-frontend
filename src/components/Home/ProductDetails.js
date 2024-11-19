import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "../Footer/Footer";
import './ProductDetails.css';
import apiClient from "../API/apiClient";

export default function ProductDetails() {
    const { state } = useLocation(); // Access state passed via navigate
    const product = state?.product; // Retrieve the product data
    const navigate = useNavigate();

    // for header and sidebar===============
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await apiClient.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCategoryClick = (category) => {
        navigate(`/category/${category.id}`);
    };

    const handleSubcategoryClick = (subcategory) => {
        navigate(`/subcategory/${subcategory.id}`);
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    //=================================

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(Math.max(1, e.target.value));
    };

    const handleAddToCart = () => {
        console.log(`Added ${quantity} of ${product?.title} to the cart`);
        // Implement add-to-cart logic here
    };

    if (!product) {
        return <p>Product not found. Please select a product from the homepage.</p>;
    }

    return (
        <div className="homepage">
            <>
                <Header toggleSidebar={toggleSidebar} />
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    categories={categories}
                    handleCategoryClick={handleCategoryClick}
                    handleSubcategoryClick={handleSubcategoryClick}
                />
            </>

            <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
                <div className="product-detail-page">
                    <div className="product-detail-container">
                        <div className="product-detail-page-product-image">
                            <img
                                src={`data:image/jpeg;base64,${product.image}`}
                                alt={product.title}
                                className="product-detail-page-product-detail-image"
                            />
                        </div>
                        <div className="product-detail-page-product-info">
                            <h1 className="product-detail-page-product-title">{product.title}</h1>
                            <p className="product-detail-page-product-description">{product.detaileddescription}</p>
                            <div className="product-detail-page-product-price-section">
                                <p className="product-detail-page-product-price">${product.price}</p>
                                {product.discountedPrice && (
                                    <p className="product-detail-page-product-discounted-price">
                                        ${product.discountedPrice}
                                    </p>
                                )}
                            </div>
                            <div className="product-detail-page-product-quantity">
                                <h3>Quantity</h3>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    min="1"
                                    className="product-detail-page-quantity-input"
                                />
                            </div>
                            <div className="product-detail-page-add-to-cart-btn-container">
                                <button onClick={handleAddToCart} className="product-detail-page-add-to-cart-btn">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
