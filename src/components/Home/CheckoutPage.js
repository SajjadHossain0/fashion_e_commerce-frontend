import React, {useEffect, useState} from "react";
import apiClient from "../API/apiClient";
import HeaderWithSidebar from "./HeaderWithSidebar";
import Footer from "../Footer/Footer";
import "./CheckoutPage.css";
import { useNavigate } from "react-router-dom";
import bkash from "../images/bkash.png"
import cod from "../images/cod.png"
import card from "../images/card.png"
import nagad from "../images/nagad.png"
import errorNotify from "../errorNotify";

export default function CheckoutPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [contactInfo, setContactInfo] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isDhaka, setIsDhaka] = useState(true);
    const [loading, setLoading] = useState(false);
    const [chargeDhaka, setChargeDhaka] = useState(0);
    const [chargeOutsideDhaka, setChargeOutsideDhaka] = useState(0);

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
            const gatewayUrl = paymentResponse.data.GatewayPageURL;
            if (gatewayUrl) {
                window.location.href = gatewayUrl;
            } else {
                alert("Failed to initiate payment. Please try again.");
            }
        } catch (error) {
            console.error("Payment initiation failed:", error);
            alert("Payment initiation failed. Please try again.");
        }
    };

    useEffect(() => {
        const fetchShippingCharges = async () => {
            try {
                const response = await apiClient.get("/shipping/view");
                setChargeDhaka(response.data.chargeDhaka);
                setChargeOutsideDhaka(response.data.chargeOutsideDhaka);
            } catch (error) {
                console.error("Error fetching shipping charges:", error);
                errorNotify("Failed to load shipping charges. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchShippingCharges();
    }, []);
    const deliveryLocations = [
        {
            id: "dhaka",
            name: "Dhaka",
            charge: chargeDhaka,
            selected: isDhaka
        },
        {
            id: "outsideDhaka",
            name: "Outside Dhaka",
            charge: chargeOutsideDhaka,
            selected: !isDhaka
        },
    ];

    const paymentMethods = [
        { id: "COD", name: "Cash on Delivery", logo: cod },
        { id: "bkash", name: "Bkash", logo: bkash },
        { id: "nagad", name: "Nagad", logo: nagad },
        { id: "card", name: "Card Payment", logo: card },
    ];

    return (
        <div className="homepage">
            <HeaderWithSidebar />
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

                    {/* Delivery Location Cards */}
                    <div className="form-group">
                        <label>Delivery Location</label>
                        <div className="card-container">
                            {deliveryLocations.map((location) => (
                                <div
                                    key={location.id}
                                    className={`card ${
                                        location.selected ? "selected" : ""
                                    }`}
                                    onClick={() => setIsDhaka(location.id === "dhaka")}
                                >
                                    <h3>{location.name}</h3>
                                    <h6>{location.charge} BDT</h6>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Method Cards */}
                    <div className="form-group">
                        <label>Payment Method</label>
                        <div className="card-container">
                            {paymentMethods.map((method) => (
                                <div
                                    key={method.id}
                                    className={`card ${
                                        paymentMethod === method.id ? "selected" : ""
                                    }`}
                                    onClick={() => setPaymentMethod(method.id)}
                                >
                                    <img
                                        src={method.logo}
                                        alt={method.name}
                                        className="card-logo"
                                    />
                                    <p>{method.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/*<button
                        className="place-order-button"
                        onClick={handlePlaceOrder}
                        disabled={loading}
                    >
                        {loading ? "Placing Order..." : "Place Order"}
                    </button>*/}
                    <button
                        className={`place-order-button ${
                            paymentMethod === "COD" ? "cod" : paymentMethod ? "pay-now" : ""
                        }`}
                        onClick={
                            paymentMethod === "COD"
                                ? handlePlaceOrder
                                : paymentMethod
                                    ? initiatePayment
                                    : null
                        }
                        disabled={!paymentMethod || loading}
                    >
                        {loading
                            ? "Processing..."
                            : paymentMethod === "COD"
                                ? "Place Order"
                                : paymentMethod
                                    ? "Pay Now"
                                    : "Select Payment Method"}
                    </button>


                </div>
            </main>
            <Footer/>
        </div>
    );
}
