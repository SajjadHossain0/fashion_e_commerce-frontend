import React from 'react';
import './Dashboard.css'

export default function Dashboard() {
    return (
        <div>
            <h1>Welcome to Admin Panel</h1>
            <div className="dashboard-grid">
                <div className="dashboard-card">Total Users: 120</div>
                <div className="dashboard-card">Total Products: 45</div>
                <div className="dashboard-card">Pending Orders: 12</div>
                <div className="dashboard-card">Revenue: $5000</div>
            </div>
        </div>
    )
}