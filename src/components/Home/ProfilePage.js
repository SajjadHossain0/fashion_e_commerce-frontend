import React, {useEffect, useState} from "react";
import "./HomePage.css";
import './ProfilePage.css'
import Footer from "../Footer/Footer";
import apiClient from "../API/apiClient";
import {useNavigate} from "react-router-dom";
import HeaderWithSidebar from "./HeaderWithSidebar";

export default function Profile() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await apiClient.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem("userId");

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await apiClient.get(`/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [userId]);

    // Fetch user orders
    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const response = await apiClient.get(`/orders/${userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching user orders:", error);
            }
        };

        fetchUserOrders();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    };

    const isAdmin = () => {
        const role = localStorage.getItem("role");
        console.log("Checking admin role. Role:", role);
        return role === "ROLE_ADMIN";
    };
    const handleAdminBtn = () => {
        navigate("/admin-dashboard");
    }


    return (
                <div className="homepage">
                    <HeaderWithSidebar/>
                    <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
                        <div className="profile-container">
                            {/* Profile Header */}
                            <div className="profile-header">
                                <div className="profile-avatar">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="User Avatar"
                                        className="profile-avatar-image"
                                    />
                                </div>
                                <div className="profile-info">
                                    <h2 className="profile-name">{user.fullname}</h2>
                                    <p className="profile-email">{user.email}</p>
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div className="profile-details">
                                {/* Account Details Section */}
                                <div className="account-details">
                                    <h3 className="section-title">Account Details</h3>
                                    <ul className="account-details-list">
                                        <li>
                                            <strong>Phone:</strong> {user.number}
                                        </li>
                                        <li>
                                            <strong>Address:</strong> {user.address}
                                        </li>
                                        {/*<li>
                                            <strong>Membership:</strong> Gold Member
                                        </li>*/}
                                    </ul>
                                </div>

                                {/* Order History Section */}
                                <div className="order-history">
                                    <h3 className="section-title">Order History</h3>
                                    <div className="order-history-table-wrapper">
                                        <table className="order-history-table">
                                            <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Shipping Address</th>
                                                <th>Payment</th>
                                                <th>Status</th>
                                                <th>Order Date</th>
                                                <th>Total</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {orders.length > 0 ? (
                                                orders.map((order) => (
                                                    <tr key={order.id}>
                                                        <td>#{order.id}</td>
                                                        <td>{order.shippingAddress}</td>
                                                        <td>{order.paymentMethod}</td>
                                                        <td>{order.status}</td>
                                                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                                        <td>${order.totalPrice.toFixed(2)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: "center" }}>
                                                        No orders found.
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Account Actions Section */}
                                <div className="account-actions">
                                    <h3 className="section-title">Manage Account</h3>
                                    <div className="action-buttons">
                                        {isAdmin() && (
                                            <button className="btn-change-admin"
                                            onClick={handleAdminBtn}>
                                                Go to Admin Panel
                                            </button>
                                        )}
                                        <button className="btn-change-password">Change Password</button>
                                        <button className="btn-logout" onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer/>
                </div>
    );
}
