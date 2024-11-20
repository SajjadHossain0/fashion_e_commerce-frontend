import React, { useState, useEffect } from "react";
import HeaderWithSidebar from "./HeaderWithSidebar";
import Footer from "../Footer/Footer";
import apiClient from "../API/apiClient";
import "./CartPage.css";

export default function CartPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const userId = localStorage.getItem("userId"); // Replace with dynamic user ID

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await apiClient.get(`/cart/${userId}`);
            setCartItems(response.data);

            // Calculate total price
            const total = response.data.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            );
            setTotalPrice(total);
        } catch (error) {
            console.error("Failed to fetch cart items:", error);
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        try {
            await apiClient.delete(`/cart/remove/${cartItemId}`);
            setCartItems(cartItems.filter((item) => item.id !== cartItemId));
            window.location.reload();
        } catch (error) {
            console.error("Failed to remove item:", error);
        }
    };

    return (
        <div className="homepage">
            <HeaderWithSidebar />
            <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
                <div className="cart-page">
                    <h1 className="cart-title">Your Cart</h1>
                    {cartItems.length === 0 ? (
                        <p className="cart-empty-message">Your cart is empty!</p>
                    ) : (
                        <>
                            <div className="cart-items-container">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <img
                                            src={`data:image/jpeg;base64,${item.product.image}`}
                                            alt={item.product.title}
                                            className="cart-item-image"
                                        />
                                        <div className="cart-item-details">
                                            <h2 className="cart-item-title">{item.product.title}</h2>
                                            <p className="cart-item-description">{item.product.description}</p>
                                            <p className="cart-item-size">Size: {item.size}</p>
                                            <div className="cart-item-quantity">
                                                Quantity: {item.quantity}
                                            </div>
                                            <p className="cart-item-price">
                                                ৳{(item.product.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                        <button
                                            className="remove-item-button"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-summary">
                                <h2>Total Price: ৳{totalPrice.toFixed(2)}</h2>
                                <button className="checkout-button">Proceed to Checkout</button>
                            </div>
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
