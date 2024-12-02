import React, { useEffect, useState } from "react";
import './AllOrders.css'
import {Modal, ModalBody, ModalHeader } from "reactstrap";
import apiClient from "../../API/apiClient";

export default function AllOrders(args) {
    const [orders, setOrders] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Fetch all orders on component mount
    useEffect(() => {
        apiClient
            .get("/orders/all")
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    const toggleModal = () => setModal(!modal);

    const handleViewSummary = (orderId) => {
        // Fetch the specific order details
        apiClient
            .get(`/orders/summary/${orderId}`)
            .then((response) => {
                setSelectedOrder(response.data); // Set the selected order data
                toggleModal(); // Open the modal
            })
            .catch((error) => {
                console.error("Error fetching order summary:", error);
            });
    };

    const handleStatusChange = (orderId, status) => {
        apiClient
            .put(`/orders/${orderId}/status`, { status })
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
            apiClient
                .delete(`/orders/${orderId}`)
                .then(() => {
                    alert("Order cancelled successfully!");
                    setOrders((prevOrders) =>
                        prevOrders.filter((order) => order.id !== orderId)
                    );
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
                            <th>Payment Method</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.user.fullname}</td>
                                <td>৳{order.totalPrice.toFixed(2)}</td>
                                <td>{order.status}</td>
                                <td>{order.payment_method}</td>
                                <td>
                                    <button onClick={() => handleViewSummary(order.id)}>
                                        View Summary
                                    </button>
                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            handleStatusChange(order.id, e.target.value)
                                        }
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    <button onClick={() => handleCancelOrder(order.id)}>
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Order Summary */}
            <Modal isOpen={modal} toggle={toggleModal} {...args}>
                <ModalHeader toggle={toggleModal}>Order Summary</ModalHeader>
                <ModalBody>
                    {selectedOrder ? (
                        <div>
                            <p><strong>Order ID :</strong> #{selectedOrder.id}</p>
                            <p><strong>User :</strong> {selectedOrder.user.fullname}</p>
                            <p><strong>Shipping Address :</strong> {selectedOrder.shippingAddress}</p>
                            <p><strong>Total Price :</strong> ৳{selectedOrder.totalPrice.toFixed(2)}</p>
                            <p><strong>Items :</strong></p>
                            <ul>
                                {selectedOrder.orderItems.map((orderItem) => (
                                    <li key={orderItem.id}>
                                        <img src={`data:image/jpeg;base64,${orderItem.product.image}`}
                                             alt={orderItem.title}
                                             height="80" width="80"/>
                                        {orderItem.product.title} - {orderItem.quantity} x ৳
                                        {orderItem.product.discountedPrice.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>Loading order details...</p>
                    )}
                </ModalBody>
            </Modal>
        </>
    );
}
