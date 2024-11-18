import React, { useState, useEffect } from "react";
import apiClient from "../API/apiClient"; // Use your configured API client
import './ShppingCharge.css'
const ShippingCharge = () => {
    const [chargeDhaka, setChargeDhaka] = useState(0);
    const [chargeOutsideDhaka, setChargeOutsideDhaka] = useState(0);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Fetch current shipping charges
    const fetchShippingCharges = async () => {
        try {
            const response = await apiClient.get("/shipping/view");
            setChargeDhaka(response.data.chargeDhaka);
            setChargeOutsideDhaka(response.data.chargeOutsideDhaka);
        } catch (error) {
            console.error("Error fetching shipping charges:", error);
            alert("Failed to load shipping charges. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Update shipping charges
    const updateShippingCharges = async () => {
        if (chargeDhaka < 0 || chargeOutsideDhaka < 0) {
            alert("Shipping charges must be non-negative.");
            return;
        }

        setUpdating(true);
        try {
            await apiClient.post("/shipping/set", null, {
                params: { chargeDhaka, chargeOutsideDhaka },
            });
            alert("Shipping charges updated successfully!");
        } catch (error) {
            console.error("Error updating shipping charges:", error);
            alert("Failed to update shipping charges. Please try again.");
        } finally {
            setUpdating(false);
        }
    };

    // Fetch charges on component mount
    useEffect(() => {
        fetchShippingCharges();
    }, []);

    if (loading) return <p>Loading shipping charges...</p>;

    return (
        <div className="shipping-charge-page">
            <h1>Shipping Charges</h1>
            <div className="shipping-charge-form">
                <label>
                    Charge (Dhaka):
                    <input
                        type="number"
                        min="0"
                        value={chargeDhaka}
                        onChange={(e) => setChargeDhaka(parseFloat(e.target.value))}
                    />
                </label>
                <label>
                    Charge (Outside Dhaka):
                    <input
                        type="number"
                        min="0"
                        value={chargeOutsideDhaka}
                        onChange={(e) => setChargeOutsideDhaka(parseFloat(e.target.value))}
                    />
                </label>
                <button onClick={updateShippingCharges} disabled={updating}>
                    {updating ? "Updating..." : "Update Charges"}
                </button>
            </div>
            <div className="current-charges">
                <h2>Current Charges</h2>
                <p>
                    <strong>Dhaka:</strong> <span style={{color:"green"}}>{chargeDhaka} BDT</span>
                </p>
                <p>
                    <strong>Outside Dhaka:</strong> <span style={{color:"green"}}>{chargeOutsideDhaka} BDT</span>
                </p>
            </div>
        </div>
    );
};

export default ShippingCharge;
