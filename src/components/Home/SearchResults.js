import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import apiClient from "../API/apiClient";
import ProductCard from "../ProductCard";
import Footer from "../Footer/Footer";
import HeaderWithSidebar from "./HeaderWithSidebar";
import {addToWishlist} from "../addToWishlist";

const SearchResults = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("keyword");
    const userId = localStorage.getItem("userId");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log("Fetching products with keyword:", keyword); // Debugging log
            try {
                const response = await apiClient.get(`/products/search?keyword=${keyword}`);
                console.log("Response data:", response.data); // Debugging log
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setLoading(false);
            }
        };


        if (keyword) {
            fetchProducts();
        }
    }, [keyword]);
    if (loading) {
        return <div>Loading...</div>;
    }


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
                    <div className="search-results">
                        <div align="left"><h5>Search results for "{keyword}"</h5></div>
                        {products.length > 0 ? (
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
                        ) : (
                            <p>No products found for "{keyword}"</p>
                        )}
                    </div>
                </main>
                <Footer/>
            </div>

        </>


    );
};

export default SearchResults;
