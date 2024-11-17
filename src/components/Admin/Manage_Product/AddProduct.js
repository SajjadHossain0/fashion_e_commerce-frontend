import React, {useState} from 'react';
import './AddProduct.css'
import {Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";


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

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : files ? files[0] : value,
        }));
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
            const response = await axios.post("http://localhost:8080/api/products", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Product added successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product.");
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
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="discount"
                    placeholder="Discount"
                    value={formData.discount}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Short Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>
                <textarea
                    name="detailedDescription"
                    placeholder="Detailed Description"
                    value={formData.detailedDescription}
                    onChange={handleChange}
                    required
                ></textarea>
                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="categoryId"
                    placeholder="Category ID"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="subCategoryId"
                    placeholder="Subcategory ID"
                    value={formData.subCategoryId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="sizes"
                    placeholder="Sizes (comma-separated)"
                    value={formData.sizes}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="material"
                    placeholder="Material"
                    value={formData.material}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />
                <div className="checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="available"
                            checked={formData.available}
                            onChange={handleChange}
                        />
                        Available
                    </label>
                </div>
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma-separated)"
                    value={formData.tags}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="submit-btn">Add Product</button>
            </form>
        </div>
    );
}