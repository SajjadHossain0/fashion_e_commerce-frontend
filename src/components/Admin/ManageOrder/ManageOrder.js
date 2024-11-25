import React, { useState } from 'react';
import PendingOrder from "./PendingOrder";
import ShippedOrder from "./ShippedOrder";
import DeliveredOrder from "./DeliveredOrder";
import AllOrders from "./AllOrders";

export default function ManageOrder() {
    const [currentComponent, setCurrentComponent] = useState(null); // Tracks which component to render

    const renderComponent = () => {
        if (currentComponent === null) return null; // No component selected

        return (
            <div>
                <div align="right">
                    <button
                        className="back-button"
                        onClick={() => setCurrentComponent(null)}>
                        Back to Manage Orders
                    </button>
                </div>

                {currentComponent === "all-orders" && <AllOrders/>}
                {currentComponent === "pending-orders" && <PendingOrder/>}
                {currentComponent === "shipped-orders" && <ShippedOrder/>}
                {currentComponent === "delivered-orders" && <DeliveredOrder />}
            </div>
        );
    };

    return (
        <>
            {/* Show the grid only if no component is selected */}
            {currentComponent === null ? (
                <div className="dashboard-grid">
                    <div className="dashboard-card"
                        onClick={() => setCurrentComponent("all-orders")}>
                        All Orders
                    </div>
                    <div className="dashboard-card"
                        onClick={() => setCurrentComponent("pending-orders")}>
                        Pending Orders
                    </div>
                    <div className="dashboard-card"
                        onClick={() => setCurrentComponent("shipped-orders")}>
                        Shipped Orders
                    </div>
                    <div className="dashboard-card"
                        onClick={() => setCurrentComponent("delivered-orders")}>
                        Delivered Orders
                    </div>
                </div>
            ) : (
                // Render the selected component with a back button
                <div className="component-container">
                    {renderComponent()}
                </div>
            )}
        </>
    );
}
