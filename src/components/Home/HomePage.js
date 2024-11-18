import React, { useEffect, useState } from "react";
import "./HomePage.css";
import ProductCard from "../ProductCard";
import { CgProfile } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa";
import Footer from "../Footer/Footer";
import apiClient from "../API/apiClient";
import Advertisement from "./Advertisement";
import ImageCard from "../ImageCard";

export default function HomePage() {

    // State variables
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state (open or closed)
    const [products, setProducts] = useState([]); // All products
    const [categories, setCategories] = useState([]); // All categories
    const [subcategories, setSubcategories] = useState([]); // Subcategories of the selected category
    const [selectedCategory, setSelectedCategory] = useState(null); // Currently selected category
    const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Currently selected subcategory
    const [categoryProducts, setCategoryProducts] = useState([]); // Products for selected category
    const [subcategoryProducts, setSubcategoryProducts] = useState([]); // Products for selected subcategory

    // Fetch all products from the API
    const fetchProducts = async () => {
        try {
            const response = await apiClient.get("/products");
            setProducts(response.data); // Save the fetched products to state
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Fetch all categories from the API
    const fetchCategories = async () => {
        try {
            const response = await apiClient.get("/categories");
            setCategories(response.data); // Save the fetched categories to state
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Fetch products of a specific category
    const fetchProductsByCategory = async (categoryId) => {
        try {
            const response = await apiClient.get(`/products/category/${categoryId}`);
            setCategoryProducts(response.data); // Save the fetched products for the category
        } catch (error) {
            console.error("Error fetching category products:", error);
        }
    };

    // Fetch products of a specific subcategory
    const fetchProductsBySubcategory = async (subcategoryId) => {
        try {
            const response = await apiClient.get(`/products/subcategories/${subcategoryId}`);
            setSubcategoryProducts(response.data); // Save the fetched products for the subcategory
        } catch (error) {
            console.error("Error fetching subcategory products:", error);
        }
    };

    // Handle category click - updates selected category, resets subcategories, and fetches products for the category
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSubcategories(category.subcategories || []); // Update subcategories for the selected category
        setSelectedSubcategory(null); // Reset selected subcategory
        setSubcategoryProducts([]); // Clear any subcategory products
        fetchProductsByCategory(category.id); // Fetch products of the selected category
    };

    // Handle subcategory click - updates selected subcategory and fetches its products
    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
        fetchProductsBySubcategory(subcategory.id); // Fetch products of the selected subcategory
    };

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // Toggle between true and false
    };

    // Fetch initial data and handle window resizing to adjust sidebar visibility
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsSidebarOpen(true); // Sidebar open on larger screens
            } else {
                setIsSidebarOpen(false); // Sidebar closed on smaller screens
            }
        };

        fetchProducts(); // Fetch all products
        fetchCategories(); // Fetch all categories
        window.addEventListener("resize", handleResize); // Add resize event listener

        // Cleanup function to remove event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <div className="homepage">
            {/* Navbar section */}
            <header className="navbar">
                <button className="toggle-btn" onClick={toggleSidebar}>☰</button> {/* Button to toggle sidebar */}
                <div className="logo">MyLogo</div>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." /> {/* Search bar */}
                </div>
                <div className="nav-icons">
                    <a className="icon"><CgProfile /></a> {/* Profile icon */}
                    <a className="icon"><FaCartPlus /></a> {/* Cart icon */}
                </div>
            </header>

            {/* Sidebar section */}
            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <h3 className="sidebar-title">Categories</h3>
                <div className="category-list">
                    {categories.map((category) => (
                        <details key={category.id} className="category-details">
                            <summary className="category-name" onClick={() => handleCategoryClick(category)}>
                                {category.name}
                            </summary>
                            <ul className="subcategory-list">
                                {(category.subcategories || []).map((subCategory) => (
                                    <li key={subCategory.id} className="subcategory-item" onClick={() => handleSubcategoryClick(subCategory)}>
                                        {subCategory.name}
                                    </li>
                                ))}
                            </ul>
                        </details>
                    ))}
                </div>
            </div>

            {/* Main content section */}
            <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>

                {/* Display advertisements and categories if no category is selected */}
                {!selectedCategory && (
                    <>
                        <div className="ads-div">
                            <Advertisement /> {/* Advertisement component */}
                        </div>

                        <div className="category-image-grid-div">
                            <div className="category-image-grid">
                                {categories.map((category) => (
                                    <ImageCard
                                        key={category.id}
                                        text={category.name}
                                        imageSrc={`data:image/jpeg;base64,${category.image}`}
                                        onClick={() => handleCategoryClick(category)} // Show subcategories on category click
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Display subcategories and products for the selected category */}
                {selectedCategory && (
                    <>
                        <div className="subcategory-image-grid-div">
                            <div className="subcategory-image-grid">
                                {subcategories.map((subcategory) => (
                                    <ImageCard
                                        key={subcategory.id}
                                        text={subcategory.name}
                                        imageSrc={`data:image/jpeg;base64,${subcategory.image}`}
                                        onClick={() => handleSubcategoryClick(subcategory)} // Show products on subcategory click
                                    />
                                ))}
                            </div>
                        </div>

                        {selectedSubcategory && (
                            <div className="product-grid-div">
                                <div className="product-grid">
                                    {subcategoryProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            image={`data:image/jpeg;base64,${product.image}`}
                                            title={product.title}
                                            description={product.description}
                                            price={product.price}
                                            discountedPrice={product.discountedPrice}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="product-grid-div">
                            <div className="product-grid">
                                {categoryProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        image={`data:image/jpeg;base64,${product.image}`}
                                        title={product.title}
                                        description={product.description}
                                        price={product.price}
                                        discountedPrice={product.discountedPrice}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Display all products if no category or subcategory is selected */}
                <div className="product-grid-div">
                    <div className="product-grid">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                image={`data:image/jpeg;base64,${product.image}`}
                                title={product.title}
                                description={product.description}
                                price={product.price}
                                discountedPrice={product.discountedPrice}
                            />
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer section */}
            <Footer />
        </div>
    );
}
