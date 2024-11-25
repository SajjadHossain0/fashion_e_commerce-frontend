import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../API/apiClient";

const OrderSummary = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        apiClient.get(`/orders/summary/${orderId}`)
            .then((response) => {
                setOrder(response.data);
            })
            .catch((error) => {
                console.error("Error fetching order summary:", error);
            });
    }, [orderId]);

    if (!order) return <div>Loading...</div>;

    return (
        <div>
            <h2>Order Summary</h2>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>User:</strong> {order.user.fullname}</p>
            <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
            <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
            <p><strong>Items:</strong></p>
            <ul>
                {order.items.map((item) => (
                    <li key={item.id}>
                        {item.product.title} - {item.quantity} x ${item.product.discountedPrice.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderSummary;
