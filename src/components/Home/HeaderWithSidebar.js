import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import apiClient from "../API/apiClient";

const HeaderWithSidebar = () => {
    // Shared State
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const navigate = useNavigate();

    // Fetch Categories
    const fetchCategories = async () => {
        try {
            const response = await apiClient.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    // Handlers
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCategoryClick = (category) => {
        navigate(`/category/${category.id}`);
    };

    const handleSubcategoryClick = (subcategory) => {
        navigate(`/subcategory/${subcategory.id}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            navigate(`/search?keyword=${searchKeyword}`);
        }
    };

    const handleProfileClick = () => {
        setProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/auth");
    };

    return (
        <>
            {/* Header */}
            <header className="navbar">
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <TiThMenu />
                </button>
                <div className="logo">
                    <a href="/" style={{ textDecoration: "none", color: "white" }}>
                        MyLogo
                    </a>
                </div>
                <div className="search-bar">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                    </form>
                </div>
                <div className="nav-icons">
                    <div className="profile-dropdown">
                        <a className="icon" onClick={handleProfileClick}>
                            <CgProfile />
                        </a>
                        {isProfileDropdownOpen && (
                            <div className="dropdown-menu">
                                <ul>
                                    {!isAuthenticated && (
                                        <a href="/auth" style={{ textDecoration: "none", color: "black" }}>
                                            <li>Login</li>
                                        </a>
                                    )}
                                    {isAuthenticated && (
                                        <a href="/auth" style={{ textDecoration: "none", color: "black" }}>
                                            <li onClick={handleLogout}>Logout</li>
                                        </a>
                                    )}
                                    <a href="/profile" style={{ textDecoration: "none", color: "black" }}>
                                        <li>Profile</li>
                                    </a>
                                    <li>Order</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <a href="/cart" style={{ textDecoration: "none", color: "white" }} className="icon">
                        <FaCartPlus />
                    </a>
                </div>
            </header>

            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <h3 className="sidebar-title">Categories</h3>
                <div className="category-list">
                    {categories.map((category) => (
                        <details key={category.id} className="category-details">
                            {/* Category Header */}
                            <summary className="category-name">
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCategoryClick(category);
                                    }}
                                >
                                    {category.name}
                                </span>
                            </summary>

                            {/* Subcategories */}
                            <ul className="subcategory-list">
                                {(category.subcategories || []).map((subCategory) => (
                                    <li
                                        key={subCategory.id}
                                        className="subcategory-item"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSubcategoryClick(subCategory);
                                        }}
                                    >
                                        {subCategory.name}
                                    </li>
                                ))}
                            </ul>
                        </details>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HeaderWithSidebar;
