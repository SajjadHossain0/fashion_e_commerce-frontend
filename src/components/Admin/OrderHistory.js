import React, {useEffect, useState} from 'react';
import axios from "axios";
import apiClient from "../API/apiClient";
import {useNavigate} from "react-router-dom";

export default function OrderHistory(){
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all orders on component mount
        apiClient.get("/orders/all")
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    const handleViewSummary = (orderId) => {
        navigate(`/admin/order-summary/${orderId}`);
    };

    const handleStatusChange = (orderId, status) => {
        apiClient.put(`/orders/${orderId}/status`, { status })
            .then(() => {
                alert("Order status updated!");
                // Optionally refresh orders
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === orderId ? { ...order, status } : order
                    )
                );
            })
            .catch((error) => {
                console.error("Error updating order status:", error);
            });
    };

    const handleCancelOrder = (orderId) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            apiClient.delete(`/orders/${orderId}`)
                .then(() => {
                    alert("Order cancelled successfully!");
                    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
                })
                .catch((error) => {
                    console.error("Error cancelling order:", error);
                });
        }
    };
    return (
        <>
            <div className="admin-order-history">
                <div>
                    <h2>Admin Order History</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.user.fullname}</td>
                                <td>${order.totalPrice.toFixed(2)}</td>
                                <td>{order.status}</td>
                                <td>
                                    <button onClick={() => handleViewSummary(order.id)}>View Summary</button>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    <button onClick={() => handleCancelOrder(order.id)}>Cancel</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}