import React, { useState } from "react";
import apiClient from "../API/apiClient";
import HeaderWithSidebar from "./HeaderWithSidebar";
import Footer from "../Footer/Footer";
import "./CheckoutPage.css";
import {useNavigate} from "react-router-dom";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const [contactInfo, setContactInfo] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isDhaka, setIsDhaka] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const userId = localStorage.getItem("userId");

    const deleteCartItem = async () => {
        try{
            const response = await apiClient.delete(`/cart/clear/${userId}`);
            console.log(response);
        }catch(err){
            console.log(err);
        }
    }

/*
    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const response = await apiClient.post(
                `/orders/place?userId=${userId}&contactInfo=${encodeURIComponent(
                    contactInfo
                )}&shippingAddress=${encodeURIComponent(
                    shippingAddress
                )}&paymentMethod=${paymentMethod}&isDhaka=${isDhaka}`
            );

            alert("Order placed successfully!");
            //deleteCartItem();
            navigate("/")
            setContactInfo("");
            setShippingAddress("");
            setPaymentMethod("");
            //return response.data;
        } catch (error) {
            console.error("Failed to place order:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };
*/

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const response = await apiClient.post(
                `/orders/place?userId=${userId}&contactInfo=${encodeURIComponent(
                    contactInfo
                )}&shippingAddress=${encodeURIComponent(
                    shippingAddress
                )}&paymentMethod=${paymentMethod}&isDhaka=${isDhaka}`
            );

            const orderId = response.data.id; // Assuming the API returns the order ID
            if (paymentMethod === "COD") {
                alert("Order placed successfully with Cash on Delivery!");
                navigate("/");
            } else {
                // Initiate payment for online methods (Card, Bkash)
                await initiatePayment(orderId);
            }
        } catch (error) {
            console.error("Failed to place order:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    const initiatePayment = async (orderId) => {
        try {
            const paymentResponse = await apiClient.post(
                `/payment/initiate?orderId=${orderId}`
            );

            const gatewayUrl = paymentResponse.data.GatewayPageURL; // SSLCommerz redirect URL
            if (gatewayUrl) {
                window.location.href = gatewayUrl; // Redirect to the payment gateway
            } else {
                alert("Failed to initiate payment. Please try again.");
            }
        } catch (error) {
            console.error("Payment initiation failed:", error);
            alert("Payment initiation failed. Please try again.");
        }
    };

    return (
        <div className="homepage">
            <HeaderWithSidebar/>
            <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
                <h1>Checkout</h1>
                <div className="checkout-form">
                    <div className="form-group">
                        <label htmlFor="contactInfo">Contact Info</label>
                        <input
                            type="text"
                            id="contactInfo"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="shippingAddress">Shipping Address</label>
                        <textarea
                            id="shippingAddress"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Payment Method</label>
                        <div className="payment-methods">
                            <label>
                                <input
                                    type="radio"
                                    value="COD"
                                    checked={paymentMethod === "COD"}
                                    onChange={() => setPaymentMethod("COD")}
                                />
                                Cash on Delivery (COD)
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="card"
                                    checked={paymentMethod === "card"}
                                    onChange={() => setPaymentMethod("card")}
                                />
                                Credit/Debit Card
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="bkash"
                                    checked={paymentMethod === "bkash"}
                                    onChange={() => setPaymentMethod("bkash")}
                                />
                                Bkash
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Delivery Location</label>
                        <div className="location-options">
                            <label>
                                <input
                                    type="radio"
                                    checked={isDhaka}
                                    onChange={() => setIsDhaka(true)}
                                />
                                Dhaka
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    checked={!isDhaka}
                                    onChange={() => setIsDhaka(false)}
                                />
                                Outside Dhaka
                            </label>
                        </div>
                    </div>
                    <button
                        className="place-order-button"
                        onClick={handlePlaceOrder}
                        disabled={loading}
                    >
                        {loading ? "Placing Order..." : "Place Order"}
                    </button>
                </div>
            </main>
            <Footer/>
        </div>
    );
}
