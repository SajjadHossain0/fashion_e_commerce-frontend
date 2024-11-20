import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import apiClient from "../API/apiClient";
import ImageCard from "../ImageCard";
import ProductCard from "../ProductCard";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "../Footer/Footer";
import HeaderWithSidebar from "./HeaderWithSidebar";
import {addToWishlist} from "../addToWishlist";

export default function CategoryPage() {
    const { categoryId } = useParams(); // Get category ID from URL
    const [subcategories, setSubcategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        // Fetch subcategories
        const fetchSubcategories = async () => {
            try {
                const response = await apiClient.get(`/categories/${categoryId}/subcategories`);
                setSubcategories(response.data);
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        };

        // Fetch products
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get(`/products/category/${categoryId}`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchSubcategories();
        fetchProducts();
    }, [categoryId]);

    const handleSubcategoryClick = (subcategory) => {
        navigate(`/subcategory/${subcategory.id}`); // Navigate to Subcategory Page
    };
    const handleProductClick = (product) => {
        navigate(`/product-details`, { state: { product } }); // Navigate to product details with data
    };


    return (
        <>
            <div className="homepage">
                <>
                    <HeaderWithSidebar/>
                </>

                <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
                    <div className="category-page">
                        <div className="subcategory-image-grid">
                            {subcategories.length > 0 ? (
                                subcategories.map((subcategory) => (
                                    <ImageCard
                                        key={subcategory.id}
                                        text={subcategory.name}
                                        imageSrc={`data:image/jpeg;base64,${subcategory.image}`}
                                        onClick={() => handleSubcategoryClick(subcategory)} // Added click handler
                                    />
                                ))
                            ) : (
                                <p>No subcategories available.</p> // Fallback when no subcategories
                            )}
                        </div>


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
                                    onWishlistClick={() => addToWishlist(userId, product.id)}
                                />
                            ))}
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>

        </>

    );
}
