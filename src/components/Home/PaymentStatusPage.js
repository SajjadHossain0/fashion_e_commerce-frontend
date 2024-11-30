import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import apiClient from "../API/apiClient";

export default function PaymentStatusPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const handlePaymentStatus = async () => {
            const status = searchParams.get("status");
            const transactionId = searchParams.get("tran_id");

            if (!status || !transactionId) {
                alert("Invalid payment response!");
                navigate("/");
                return;
            }

            if (status === "VALID") {
                try {
                    await apiClient.post(`/payment/success`, {
                        tran_id: transactionId,
                        status,
                    });
                    alert("Payment Successful!");
                    navigate("/");
                } catch (error) {
                    console.error("Payment validation failed:", error);
                    alert("Payment validation failed!");
                    navigate("/");
                }
            } else if (status === "FAILED") {
                alert("Payment Failed!");
                navigate("/checkout");
            } else if (status === "CANCELLED") {
                alert("Payment Cancelled!");
                navigate("/checkout");
            }
        };

        handlePaymentStatus();
    }, [searchParams, navigate]);

    return <div>Processing Payment...</div>;
}
