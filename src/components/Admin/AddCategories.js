import React, { useState, useEffect } from "react";
import apiClient from "../API/apiClient";
import "./AddCategories.css";

export default function AddCategories() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [categoryImage, setCategoryImage] = useState(null);

    const [subcategoryName, setSubcategoryName] = useState("");
    const [subcategoryImage, setSubcategoryImage] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    // Fetch all categories on load
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await apiClient.get("/categories");
            console.log("Fetched categories:", response.data);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Handle adding a new category
    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!categoryName || !categoryImage) {
            alert("Please fill in all fields for the category.");
            return;
        }

        const formData = new FormData();
        formData.append("name", categoryName);
        formData.append("image", categoryImage);

        try {
            const response = await apiClient.post("/categories", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Added category:", response.data);
            alert("Category added successfully!");
            setCategoryName("");
            setCategoryImage(null);
            fetchCategories();
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    // Handle adding a new subcategory
    const handleAddSubcategory = async (e) => {
        e.preventDefault();
        if (!subcategoryName || !subcategoryImage || !selectedCategoryId) {
            alert("Please fill in all fields for the subcategory.");
            return;
        }

        const formData = new FormData();
        formData.append("name", subcategoryName);
        formData.append("image", subcategoryImage);

        try {
            const response = await apiClient.post(
                `/categories/${selectedCategoryId}/subcategories`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log("Added subcategory:", response.data);
            alert("Subcategory added successfully!");
            setSubcategoryName("");
            setSubcategoryImage(null);
            fetchCategories(); // Refresh categories to include the new subcategory
        } catch (error) {
            console.error("Error adding subcategory:", error);
        }
    };

    // Handle deleting a category
    const handleDeleteCategory = async (categoryId) => {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return;
        }

        try {
            await apiClient.delete(`/categories/${categoryId}`);
            alert("Category deleted successfully!");
            fetchCategories(); // Refresh categories
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    // Handle deleting a subcategory
    const handleDeleteSubcategory = async (subCategoryId) => {
        if (!window.confirm("Are you sure you want to delete this subcategory?")) {
            return;
        }

        try {
            await apiClient.delete(`/categories/subcategories/${subCategoryId}`);
            alert("Subcategory deleted successfully!");
            fetchCategories(); // Refresh categories
        } catch (error) {
            console.error("Error deleting subcategory:", error);
        }
    };

    return (
        <div className="admin-panel">
            <h1 className="admin-panel__title">Admin Panel</h1>
            <div className="admin-panel__container">
                {/* Add Category Section */}
                <div className="admin-panel__section admin-panel__add-category">
                    <h2>Add Category</h2>
                    <form onSubmit={handleAddCategory}>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="admin-panel__input"
                        />
                        <input
                            type="file"
                            onChange={(e) => setCategoryImage(e.target.files[0])}
                            className="admin-panel__input-file"
                        />
                        <button type="submit" className="admin-panel__button">
                            Add Category
                        </button>
                    </form>
                </div>

                {/* Add Subcategory Section */}
                <div className="admin-panel__section admin-panel__add-subcategory">
                    <h2>Add Subcategory</h2>
                    <form onSubmit={handleAddSubcategory}>
                        <select
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                            className="admin-panel__select"
                        >
                            <option value="">Select a Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Subcategory Name"
                            value={subcategoryName}
                            onChange={(e) => setSubcategoryName(e.target.value)}
                            className="admin-panel__input"
                        />
                        <input
                            type="file"
                            onChange={(e) => setSubcategoryImage(e.target.files[0])}
                            className="admin-panel__input-file"
                        />
                        <button type="submit" className="admin-panel__button">
                            Add Subcategory
                        </button>
                    </form>
                </div>
            </div>

            {/* Display Categories and Subcategories */}
            <div className="admin-panel__list">
                <h2>Categories</h2>
                <ul className="admin-panel__category-list">
                    {categories.map((category) => (
                        <li key={category.id} className="admin-panel__category-item">
                            <img
                                src={`data:image/jpeg;base64,${category.image}`}
                                alt={category.name}
                                className="admin-panel__image"
                            />
                            <p className="admin-panel__category-name">{category.name}</p>
                            <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="admin-panel__delete-button"
                            >
                                Delete Category
                            </button>
                            <ul className="admin-panel__subcategory-list">
                                {category.subcategories?.map((sub) => (
                                    <li key={sub.id} className="admin-panel__subcategory-item">
                                        <img
                                            src={`data:image/jpeg;base64,${sub.image}`}
                                            alt={sub.name}
                                            className="admin-panel__image"
                                        />
                                        {sub.name}
                                        <button
                                            onClick={() => handleDeleteSubcategory(sub.id)}
                                            className="admin-panel__delete-button"
                                        >
                                            Delete Subcategory
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
