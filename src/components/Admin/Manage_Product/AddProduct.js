import React, {useEffect, useState} from 'react';
import './AddProduct.css'
import apiClient from "../../API/apiClient";
import {Bounce, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function AddProduct() {

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        discount: "",
        description: "",
        detailedDescription: "",
        brand: "",
        categoryId: "",
        subCategoryId: "",
        sizes: "",
        material: "",
        stock: "",
        available: false,
        image: null,
        tags: "",
    });
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const successNotify = (message) => toast.success(message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
    const errorNotify = (message) => toast.error(message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });



    // Fetch categories on component mount
    useEffect(() => {
        apiClient.get("/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    // Handle category change to load subcategories
    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;

        // Update formData
        setFormData({...formData, categoryId: selectedCategoryId, subCategoryId: ""});

        // Fetch subcategories from the backend
        apiClient.get(`/categories/${selectedCategoryId}/subcategories`)
            .then((response) => {
                setSubCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching subcategories:", error);
                setSubCategories([]);
            });
    };


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleImageChange = (e) => {
        setFormData({...formData, image: e.target.files[0]});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "tags" || key === "sizes") {
                data.append(key, formData[key].split(","));
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await apiClient.post("/products", data, {
                headers: {"Content-Type": "multipart/form-data"},
            });
            successNotify("Product added successfully!");
            console.log(response.data);

            // Reset form
            setFormData({
                title: "",
                price: "",
                discount: "",
                description: "",
                detailedDescription: "",
                brand: "",
                categoryId: "",
                subCategoryId: "",
                sizes: "",
                material: "",
                stock: "",
                available: false,
                image: null,
                tags: "",
            });
        } catch (error) {
            console.error("Error adding product:", error);
            errorNotify("Failed to add product.");
        }
    };

    return (
        <div className="add-product">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit} className="add-product-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />

                <div className="price-discount-div">
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="discount"
                        placeholder="Discount"
                        value={formData.discount}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <textarea
                    name="description"
                    placeholder="Short Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                ></textarea>
                <textarea
                    name="detailedDescription"
                    placeholder="Detailed Description"
                    value={formData.detailedDescription}
                    onChange={handleInputChange}
                    required
                ></textarea>

                <div className="brand-material-div">
                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="material"
                        placeholder="Material"
                        value={formData.material}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="category-div">
                    {/* Category Dropdown */}
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value="">Category</option>
                        {categories && categories.length > 0
                            ? categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))
                            : <option disabled>Loading categories...</option>
                        }
                    </select>
                    {/* Subcategory Dropdown */}
                    <select
                        name="subCategoryId"
                        value={formData.subCategoryId}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Subcategory</option>
                        {subCategories && subCategories.length > 0
                            ? subCategories.map((subCategory) => (
                                <option key={subCategory.id} value={subCategory.id}>
                                    {subCategory.name}
                                </option>
                            ))
                            : <option disabled>No subcategories available</option>
                        }
                    </select>
                </div>


                <input
                    type="text"
                    name="sizes"
                    placeholder="Sizes (comma-separated)"
                    value={formData.sizes}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                />

                <div className="checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="available"
                            checked={formData.available}
                            onChange={handleInputChange}
                        />
                        Available
                    </label>
                </div>

                <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    required
                />
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma-separated)"
                    value={formData.tags}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="submit-btn">Add Product</button>
            </form>
            <ToastContainer />
        </div>
    );
}