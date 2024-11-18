import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../API/apiClient';
import './ProductDetails.css';

export default function ProductDetails() {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null); // State for storing product details
    const [quantity, setQuantity] = useState(1); // Default quantity is 1

    // Fetch product details based on the product ID
    const fetchProductDetails = async () => {
        try {
            const response = await apiClient.get(`/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    useEffect(() => {
        fetchProductDetails(); // Fetch product details when the page loads
    }, [id]);

    const handleQuantityChange = (e) => {
        setQuantity(Math.max(1, e.target.value)); // Ensure quantity is at least 1
    };

    const handleAddToCart = () => {
        console.log(`Added ${quantity} of ${product.title} to the cart`);
        // Here, you can implement logic to add the product to the cart
    };

    if (!product) return <div>Loading...</div>; // Show loading if product data is not fetched yet

    return (
        <>
            <div className="product-detail-page">
                <div className="product-detail-container">
                    {/* Product Image */}
                    <div className="product-image">
                        <img
                            src={`data:image/jpeg;base64,${product.image}`}
                            alt={product.title}
                            className="product-detail-image"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                        <h1 className="product-title">{product.title}</h1>
                        <p className="product-description">{product.detaileddescription}</p>

                        <div className="product-price-section">
                            <p className="product-price">
                                ${product.price}
                            </p>
                            {product.discountedPrice && (
                                <p className="product-discounted-price">
                                    ${product.discountedPrice}
                                </p>
                            )}
                        </div>

                        <div className="product-size">
                            <h3>Available Sizes</h3>
                            <select className="size-select">
                                {product.sizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="product-quantity">
                            <h3>Quantity</h3>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                className="quantity-input"
                            />
                        </div>

                        <div className="add-to-cart-btn-container">
                            <button onClick={handleAddToCart} className="add-to-cart-btn">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
