import React, {useEffect, useState} from "react";
import "./HomePage.css";
import ProductCard from "../ProductCard";
import Footer from "../Footer/Footer";
import apiClient from "../API/apiClient";
import Advertisement from "./Advertisement";
import ImageCard from "../ImageCard";
import {useNavigate} from "react-router-dom";
import HeaderWithSidebar from "./HeaderWithSidebar";

export default function HomePage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await apiClient.get("/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await apiClient.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/category/${category.id}`); // Redirect to category-specific page
    };
    const handleProductClick = (product) => {
        navigate(`/product-details`, { state: { product } }); // Navigate to product details with data
    };


    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    return (
        <div className="homepage">
            <>
                <HeaderWithSidebar/>
            </>

            <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>

                <div className="ads-div">
                    <Advertisement/>
                </div>

                <div className="category-image-grid-div">
                    <div className="category-image-grid">
                        {categories.map((category) => (<ImageCard
                            key={category.id}
                            text={category.name}
                            imageSrc={`data:image/jpeg;base64,${category.image}`}
                            onClick={() => handleCategoryClick(category)} // Show subcategories on category click
                        />))}
                    </div>
                </div>

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
                            onClick={() => handleProductClick(product)}
                        />
                        ))}
                    </div>
                </div>

            </main>
            <Footer/>
        </div>
    );
}
