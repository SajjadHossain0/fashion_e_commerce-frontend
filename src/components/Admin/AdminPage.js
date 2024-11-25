import React, {useEffect, useState} from "react";
import './AdminPage.css';
import {CgProfile} from "react-icons/cg";
import {
    FaCog,
    FaUsers,
    FaProductHunt,
    FaShoppingCart,
    FaEye,
    FaBuysellads,
    FaShippingFast,
    FaHistory
} from "react-icons/fa";
import {MdDashboard, MdManageHistory} from "react-icons/md";
import Dashboard from "./Dashboard";
import ManageProduct from "./ManageProduct";
import AddProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";
import AddCategories from "./AddCategories";
import AddAdvertisement from "./AddAdvertisement";
import ShippingCharge from "./ShippingCharge";
import {useNavigate} from "react-router-dom";
import OrderHistory from "./OrderHistory";
import {IoMdAddCircle} from "react-icons/io";
import ManageOrder from "./ManageOrder/ManageOrder";

export default function AdminPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
    const [currentComponent, setCurrentComponent] = useState("dashboard"); // Tracks which component to render

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
// Check authentication on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/auth"); // Redirect to login
    };

    // Function to dynamically render the selected component
    const renderComponent = () => {
        switch (currentComponent) {
            case "dashboard":
                return <Dashboard/>;
            case "manage-product":
                return <ManageProduct/>;
            case "add-product":
                return <AddProduct/>;
            case "view-product":
                return <ViewProduct/>
            case "add-categories":
                return <AddCategories/>
            case "add-advertisement":
                return <AddAdvertisement/>
            case "set-shipping-charge":
                return <ShippingCharge/>
            case "order-history":
                return <OrderHistory/>
            case "manage-order":
                return <ManageOrder/>

            default:
                return <Dashboard/>;
        }
    };

    return (
        <div className="admin-page">
            <header className="admin-navbar">
                <button className="admin-toggle-btn" onClick={toggleSidebar}>
                    ☰
                </button>
                <div className="admin-logo">AdminPanel</div>
                <div className="admin-search-bar">
                    <input type="text" placeholder="Search..."/>
                </div>
                <div className="admin-nav-icons">
                    <a onClick={handleLogout} className="admin-icon"><CgProfile/></a>
                    <a className="admin-icon"><FaCog/></a>
                </div>
            </header>

            <div className={`admin-sidebar ${isSidebarOpen ? "open" : ""}`}>
                <ul>
                    <li className="admin-sidebar-link" style={{textDecoration: "none", color: "black"}}
                        onClick={() => setCurrentComponent("dashboard")}>
                        <MdDashboard/> Dashboard
                    </li>
                    {/*
                    <li
                        className="admin-sidebar-link"
                        style={{ textDecoration: "none", color: "black" }}
                        onClick={() => setCurrentComponent("manage-product")}
                    >
                        <FaProductHunt /> Manage Products
                    </li>*/}
                    <li className="admin-sidebar-link" style={{textDecoration: "none", color: "black"}}
                        onClick={() => setCurrentComponent("add-product")}>
                        <IoMdAddCircle />Add Product
                    </li>
                    <li className="admin-sidebar-link" style={{textDecoration: "none", color: "black"}}
                        onClick={() => setCurrentComponent("view-product")}>
                        <FaEye />View Products
                    </li>
                    <li className="admin-sidebar-link" style={{textDecoration: "none", color: "black"}}
                        onClick={() => setCurrentComponent("add-categories")}>
                        <MdManageHistory />Manage Categories
                    </li>
                    <li className="admin-sidebar-link" style={{textDecoration: "none", color: "black"}}
                        onClick={() => setCurrentComponent("add-advertisement")}>
                        <FaBuysellads />Manage Ads
                    </li>
                    <li className="admin-sidebar-link" style={{textDecoration: "none", color: "black"}}
                        onClick={() => setCurrentComponent("set-shipping-charge")}>
                        <FaShippingFast />Set Shipping Charge
                    </li>
                    <li className="admin-sidebar-link" style={{textDecoration: "none", color: "black"}}
                        onClick={() => setCurrentComponent("order-history")}>
                        <FaHistory />Order History
                    </li>
                    <li className="admin-sidebar-link" style={{textDecoration: "none", color: "black"}}
                        onClick={() => setCurrentComponent("manage-order")}>
                        <FaShoppingCart/> Manage Orders
                    </li>

                    <li><FaUsers/> Manage Users</li>
                    <li><FaCog/> Settings</li>
                </ul>
            </div>

            <main className={`admin-main-content ${isSidebarOpen ? "" : "full-width"}`}>
                {renderComponent()}
            </main>
        </div>
    );
}
