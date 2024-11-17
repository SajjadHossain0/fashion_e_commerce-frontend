import React, {useEffect, useState} from "react";
import './AdminPage.css'
import {CgProfile} from "react-icons/cg";
import {FaCog, FaUsers, FaProductHunt, FaShoppingCart} from "react-icons/fa";
import {MdDashboard} from "react-icons/md";
import Dashboard from "./Dashboard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ManageProduct from "./Manage_Product/ManageProduct";
import AddProduct from "./Manage_Product/AddProduct";
import ViewProduct from "./Manage_Product/ViewProduct";
import UpdateProductPage from "./Manage_Product/UpdateProductPage";

export default function AdminPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

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

    return (
        <div className="admin-page">
            <header className="navbar">
                <button className="toggle-btn" onClick={toggleSidebar}>
                    ☰
                </button>
                <div className="logo">AdminPanel</div>
                <div className="search-bar">
                    <input type="text" placeholder="Search..."/>
                </div>
                <div className="nav-icons">
                    <a className="icon"><CgProfile/></a>
                    <a className="icon"><FaCog/></a>
                </div>
            </header>

            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <ul>
                    <a className="admin-sidebar-link" href="/"
                       style={{textDecoration: "none", color: "black"}}>
                        <li><MdDashboard/> Dashboard</li>
                    </a>

                    <a className="admin-sidebar-link" href="/manage-product"
                       style={{textDecoration: "none", color: "black"}}>
                        <li><FaProductHunt/> Manage Products</li>
                    </a>

                    <li><FaUsers/> Manage Users</li>
                    <li><FaShoppingCart/> Manage Orders</li>
                    <li><FaCog/> Settings</li>
                </ul>
            </div>

            <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>

                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                    </Routes>
                    <Routes>
                        <Route path="/manage-product" element={<ManageProduct/>}/>
                        <Route path="/addProduct" element={<AddProduct/>}/>
                        <Route path="/viewProduct" element={<ViewProduct/>}/>
                        <Route path="/update-product/:productId" component={UpdateProductPage} />
                    </Routes>

                </BrowserRouter>
            </main>
        </div>
    );
}
