import React, {useEffect, useState} from "react";
import {CgProfile} from "react-icons/cg";
import {FaCartPlus} from "react-icons/fa";
import {TiThMenu} from "react-icons/ti";
import {useNavigate} from "react-router-dom";


const Header = ({toggleSidebar}) => {
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const handleProfileClick = () => {
        setProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleOptionClick = (option) => {
        console.log(`Selected option: ${option}`);
        setProfileDropdownOpen(false); // Close dropdown after selection
    };

// chexk authentication==============
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/auth"); // Redirect to login
    };
//========================

    const [searchKeyword, setSearchKeyword] = useState(""); // Search input state
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            navigate(`/search?keyword=${searchKeyword}`); // Navigate with query string
        }
    };



    return (
        <header className="navbar">
            <button className="toggle-btn" onClick={toggleSidebar}>
                <TiThMenu/>
            </button>
            <div className="logo">
                <a href="/" style={{textDecoration: "none", color: "white"}}>
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
                        <CgProfile/>
                    </a>
                    {isProfileDropdownOpen && (
                        <div className="dropdown-menu">
                            <ul>
                                {!isAuthenticated && (
                                    <a href="/auth" style={{textDecoration: "none", color: "black"}}>
                                        <li onClick={() => handleOptionClick("login")}>Login</li>
                                    </a>
                                )}
                                {isAuthenticated && (
                                    <a href="/auth" style={{textDecoration: "none", color: "black"}}>
                                        <li onClick={handleLogout}>Logout</li>
                                    </a>
                                )}

                                <a href="/profile" style={{textDecoration: "none", color: "black"}}>
                                    <li onClick={() => handleOptionClick("profile")}>Profile</li>
                                </a>

                                <li onClick={() => handleOptionClick("order")}>Order</li>

                            </ul>
                        </div>
                    )}
                </div>

                <a href="/cart" style={{textDecoration: "none", color: "white"}} className="icon">
                    <FaCartPlus/>
                </a>
            </div>
        </header>
    );
};

export default Header;
