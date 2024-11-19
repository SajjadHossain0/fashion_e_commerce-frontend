import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";


const Header = ({ toggleSidebar }) => {
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const handleProfileClick = () => {
        setProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleOptionClick = (option) => {
        console.log(`Selected option: ${option}`);
        setProfileDropdownOpen(false); // Close dropdown after selection
    };

    return (
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
                <input type="text" placeholder="Search..." />
            </div>
            <div className="nav-icons">
                <div className="profile-dropdown">
                    <a className="icon" onClick={handleProfileClick}>
                        <CgProfile />
                    </a>
                    {isProfileDropdownOpen && (
                        <div className="dropdown-menu">
                            <ul>
                                <a href="/auth" style={{ textDecoration: "none", color: "black" }}>
                                    <li onClick={() => handleOptionClick("login")}>Login</li>
                                </a>
                                <a href="/profile" style={{ textDecoration: "none", color: "black" }}>
                                    <li onClick={() => handleOptionClick("profile")}>Profile</li>
                                </a>
                                <li onClick={() => handleOptionClick("order")}>Order</li>
                            </ul>
                        </div>
                    )}
                </div>
                <a className="icon">
                    <FaCartPlus />
                </a>
            </div>
        </header>
    );
};

export default Header;
