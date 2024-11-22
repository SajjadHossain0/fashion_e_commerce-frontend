import React, {useEffect, useState} from 'react';
import {BrowserRouter, useNavigate} from 'react-router-dom';
import apiClient from "../API/apiClient";
import './CartPage.css';
import HeaderWithSidebar from "./HeaderWithSidebar";
import {FaHeart, FaTrashAlt} from "react-icons/fa";
import {ToastContainer} from "react-toastify";
import Footer from "../Footer/Footer";
import {Button} from "reactstrap";

export default function CartPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const fetchCartItems = async () => {
        try {
            const response = await apiClient.get(`/cart/${userId}`);
            console.log("Raw API Response:", response.data);

            // Check if response.data is a string and attempt to parse it
            let items = response.data;

            // If it's a string, try to parse it as JSON
            if (typeof response.data === 'string') {
                try {
                    items = JSON.parse(response.data);
                } catch (e) {
                    console.error("Error parsing JSON:", e);
                    setCartItems([]);
                    setTotalPrice(0);
                    return;
                }
            }

            // Ensure items is an array
            if (Array.isArray(items)) {
                setCartItems(items);
                calculateTotalPrice(items);
            } else {
                setCartItems([]);
                setTotalPrice(0);
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setCartItems([]);
            setTotalPrice(0);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const calculateTotalPrice = (items) => {
        if (!Array.isArray(items)) {
            console.error("Expected an array but got:", items);
            return;
        }
        const total = items.reduce((sum, item) => {
            // Ensure each item has the necessary properties
            if (item && item.totalprice) {
                return sum + item.totalprice;
            }
            return sum; // Skip invalid items
        }, 0);
        setTotalPrice(total);
    };

    const handleRemoveItem = async (cartItemId) => {
        try {
            await apiClient.delete(`/cart/remove/${cartItemId}`);
            fetchCartItems(); // Refresh cart items after removal
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };
    const continueShopping = () => {
        navigate('/');
    };


    return (
        <div className="homepage">
            <HeaderWithSidebar/>
            <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>

                {(cartItems.length === 0) ? (
                    <div className="cart-page">
                        <h2>Your Shopping Cart</h2>
                        <p>Your cart is empty. Add some products!</p>
                        <div align="center">
                            <Button onClick={continueShopping}>
                                    Continue Shopping
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="cart-page">
                        <h2>Your Shopping Cart</h2>
                        <div className="cart-items-container">
                            {cartItems.map(item => {
                                // Check if the item has a valid product object before rendering
                                if (item && item.product) {
                                    return (
                                        <div key={item.id} className="cart-item">
                                            <img
                                                src={`data:image/jpeg;base64,${item.product.image}`}
                                                alt={item.product.title}
                                                className="cart-item-image"
                                            />
                                            <div className="cart-item-details">
                                                <h3>{item.product.title}</h3>
                                                <p>Size: {item.size}</p>
                                                <p>Price: ৳{item.product.discountedPrice.toFixed(2)}</p>
                                                <p>Quantity: {item.quantity}</p>
                                                <p>Total: ৳{item.totalprice.toFixed(2)}</p>
                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="remove-item-btn"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    // Return null if item is invalid
                                    return null;
                                }
                            })}
                        </div>
                        <div className="cart-summary">
                            <h3>Order Summary</h3>
                            <p>Total Items: {cartItems.length}</p>
                            <p>Total Price: ৳{totalPrice.toFixed(2)}</p>
                            <button onClick={handleCheckout} className="checkout-btn">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}


                <ToastContainer/>
            </main>
            <Footer/>
        </div>

    );
};
