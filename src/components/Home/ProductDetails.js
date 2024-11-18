import React, { useState } from 'react';
import './ProductDetails.css';

export default function ProductDetails({ product }) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(Math.max(1, e.target.value));
    };

    const handleAddToCart = () => {
        console.log(`Added ${quantity} of ${product.title} to the cart`);
        // Implement add-to-cart logic here
    };

    return (
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
    );
}
