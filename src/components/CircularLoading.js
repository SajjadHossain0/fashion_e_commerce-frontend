import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./CircularLoading.css";

const CircularLoading = () => {
    return (
        <div className="loader-container">
            <div className="loader">
                <CircularProgress />
                {/*<p className="loader-text">Fetching the latest styles for you...</p>*/}
            </div>
        </div>
    );
};

export default CircularLoading;
