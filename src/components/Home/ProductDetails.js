import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "../Footer/Footer";
import './ProductDetails.css';
import apiClient from "../API/apiClient";
import HeaderWithSidebar from "./HeaderWithSidebar";

export default function ProductDetails() {
    const { state } = useLocation(); // Access state passed via navigate
    const product = state?.product; // Retrieve the product data

    // for header and sidebar===============
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    //=================================

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size!");
            return;
        }
        console.log(`Added ${quantity} of ${product?.title} (Size: ${selectedSize}) to the cart`);
    };

    const handleQuantityChange = (e) => {
        setQuantity(Math.max(1, e.target.value));
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    if (!product) {
        return <p>Product not found. Please select a product from the homepage.</p>;
    }

    return (
        <div className="homepage">
            <HeaderWithSidebar/>
            <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
                <div className="product-detail-page">

                    <div className="product-detail-container">

                        {/* Product Image */}
                        <div className="pd-new-image-container">
                            <img
                                src={`data:image/jpeg;base64,${product.image}`}
                                alt={product.title}
                                className="pd-new-product-image"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="pd-new-info-container">
                            <h1 className="pd-new-title">{product.title}</h1>
                            <p className="pd-new-brand">Brand: {product.brand}</p>
                            <p className="pd-new-description">{product.detaileddescription}</p>
                            <p className="pd-new-material">Material: {product.material}</p>
                            <p className={`pd-new-stock-status ${
                                product.stock > 0 ? "pd-in-stock" : "pd-out-of-stock"
                            }`}>
                                {product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </p>

                            {/* Price */}
                            <div className="pd-new-price-section">
                                <p className="pd-new-price">Price: ৳{product.price.toFixed(2)}</p>
                                {product.discount > 0 && (
                                    <p className="pd-new-discounted-price">
                                        Discounted Price: ৳{product.discountedPrice}
                                    </p>
                                )}
                            </div>

                            {/* Sizes */}
                            <div align="center" className="pd-new-size-section">
                                <h3>Select Size</h3>
                                <div className="pd-new-size-options">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`pd-new-size-option ${
                                                selectedSize === size ? "pd-size-selected" : ""
                                            }`}
                                            onClick={() => handleSizeChange(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="pd-new-quantity-section">
                                <h3>Quantity</h3>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    min="1"
                                    className="pd-new-quantity-input"
                                />
                            </div>

                            {/* Add to Cart */}
                            <button
                                onClick={handleAddToCart}
                                className="pd-new-add-to-cart-btn"
                                disabled={!product.available || product.stock === 0}
                            >
                                Add to Cart
                            </button>

                            {/* Tags */}
                            <div className="pd-new-tags-section">
                                <h4>Tags:</h4>
                                {product.tags.map((tag) => (
                                    <span key={tag} className="pd-new-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
