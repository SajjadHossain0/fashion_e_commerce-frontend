import React from "react";
import "./HomePage.css";
import {IoMenu} from "react-icons/io5";
import {MdAccountCircle} from "react-icons/md";
import {FaCartPlus} from "react-icons/fa";
import ProductCard from "../ProductCard"; // Extracted inline styles into this CSS file

function HomePage() {
    const toggleSidebar = () => {
        document.getElementById("sidebar").classList.toggle("open");
    };

    return (
        <div>
            <header className="header">
                <div className="hamburger" onClick={toggleSidebar}>
                    <IoMenu/>
                </div>
                &nbsp;
                <div className="logo">LOGO</div>
                <div className="search-bar">
                    <input type="text" className="pcsrch" placeholder="Search..." />
                </div>
                <div className="navIcon">
                    <a href="#"><MdAccountCircle/></a>  <a href="#"><FaCartPlus /></a>
                </div>
            </header>

            <div className="container">

                <aside className="sidebar" id="sidebar">
                    <h3>Categories</h3>
                    <br />
                    <details>
                        <summary>Man</summary>
                        <a href="#"><li>Shirt</li></a>
                        <a href="#"><li>Shirt</li></a>
                        <a href="#"><li>Shirt</li></a>
                        <a href="#"><li>Shirt</li></a>
                    </details>
                    <details>
                        <summary>Women</summary>
                        <a href="#"><li>Western</li></a>
                        <a href="#"><li>Western</li></a>
                        <a href="#"><li>Western</li></a>
                        <a href="#"><li>Western</li></a>
                    </details>
                </aside>

                <main className="main-content">
                    <input type="text" className="mobsrch" placeholder="Search..."/>
                    <br/>

                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>

                </main>
            </div>
        </div>
    );
}

export default HomePage;
