// SubcategoryPage.js
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ProductCard from "../ProductCard";
import apiClient from "../API/apiClient";
import Header from "./Header";
import Footer from "../Footer/Footer";
import Sidebar from "./Sidebar";
import ImageCard from "../ImageCard";
import CircularLoading from "../CircularLoading";

export default function SubcategoryPage() {
    const {subcategoryId} = useParams(); // Get subcategory ID from the URL
    const [subcategoryProducts, setSubcategoryProducts] = useState([]);
    const [subcategoryName, setSubcategoryName] = useState("");

    // for header and sidebar===============
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const navigate = useNavigate();
    const fetchCategories = async () => {
        try {
            const response = await apiClient.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    const handleCategoryClick = (category) => {
        navigate(`/category/${category.id}`); // Redirect to category-specific page
    };
    const handleSubcategoryClick = (subcategory) => {
        navigate(`/subcategory/${subcategory.id}`); // Navigate to Subcategory Page
    };
    //=================================

    const handleProductClick = (product) => {
        navigate(`/product-details`, { state: { product } }); // Navigate to product details with data
    };


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get(`/products/subcategories/${subcategoryId}`);
                setSubcategoryProducts(response.data); // Save the fetched products for the subcategory
            } catch (error) {
                console.error("Error fetching subcategory products:", error);
            }
        };

        fetchProducts();
    }, [subcategoryId]);

    useEffect(() => {
        console.log("Updated subcategoryProducts:", subcategoryProducts);
    }, [subcategoryProducts]);

    return (
        <>
            <div className="homepage">
                <>
                    <Header toggleSidebar={toggleSidebar}/>
                    <Sidebar
                        isSidebarOpen={isSidebarOpen}
                        categories={categories}
                        handleCategoryClick={handleCategoryClick}
                        handleSubcategoryClick={handleSubcategoryClick}
                    />
                </>

                <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
                    <div className="product-grid">
                        {subcategoryProducts.length > 0 ? (
                            subcategoryProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    image={`data:image/jpeg;base64,${product.image}`}
                                    title={product.title}
                                    description={product.description}
                                    price={product.price}
                                    discountedPrice={product.discountedPrice}
                                    onClick={() => handleProductClick(product)}
                                />
                            ))
                        ) : (
                            <CircularLoading/> // Placeholder while data is fetched
                        )}
                    </div>
                </main>
                <Footer/>
            </div>

        </>

    );
}
