import React, {useEffect, useState} from "react";
import './AdminPage.css';
import {CgProfile} from "react-icons/cg";
import {FaCog, FaUsers, FaProductHunt, FaShoppingCart} from "react-icons/fa";
import {MdDashboard} from "react-icons/md";
import Dashboard from "./Dashboard";
import ManageProduct from "./ManageProduct";
import AddProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";
import AddCategories from "./AddCategories";
import AddAdvertisement from "./AddAdvertisement";
import ShippingCharge from "./ShippingCharge";

export default function AdminPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
    const [currentComponent, setCurrentComponent] = useState("dashboard"); // Tracks which component to render

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
                    <a className="admin-icon"><CgProfile/></a>
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
                        <FaProductHunt/> Add Product
                    </li>
                    <li className="admin-sidebar-link" style={{textDecoration: "none", color: "black"}}
                        onClick={() => setCurrentComponent("view-product")}>
                        <FaProductHunt/> View Products
                    </li>
                    <li className="admin-sidebar-link" style={{textDecoration: "none", color: "black"}}
                        onClick={() => setCurrentComponent("add-categories")}>
                        <FaProductHunt/> Manage Categories
                    </li>
                    <li className="admin-sidebar-link" style={{textDecoration: "none", color: "black"}}
                        onClick={() => setCurrentComponent("add-advertisement")}>
                        <FaProductHunt/> Manage Ads
                    </li>
                    <li className="admin-sidebar-link" style={{textDecoration: "none", color: "black"}}
                        onClick={() => setCurrentComponent("set-shipping-charge")}>
                        <FaProductHunt/> Set Shipping Charge
                    </li>

                    <li><FaUsers/> Manage Users</li>
                    <li><FaShoppingCart/> Manage Orders</li>
                    <li><FaCog/> Settings</li>
                </ul>
            </div>

            <main className={`admin-main-content ${isSidebarOpen ? "" : "full-width"}`}>
                {renderComponent()}
            </main>
        </div>
    );
}
