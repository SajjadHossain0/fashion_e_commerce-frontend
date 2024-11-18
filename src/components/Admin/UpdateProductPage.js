import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null); // To handle image uploads

    useEffect(() => {
        if (productId) {
            axios.get(`http://localhost:8080/api/products/${productId}`)
                .then(response => {
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                    setLoading(false);
                });
        }
    }, [productId]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('price', product.price);
        formData.append('discount', product.discount);
        formData.append('description', product.description);
        formData.append('detailedDescription', product.detailedDescription);
        formData.append('brand', product.brand);
        formData.append('categoryId', product.categoryId);
        formData.append('subCategoryId', product.subCategoryId);
        formData.append('sizes', JSON.stringify(product.sizes)); // If sizes is an array
        formData.append('material', product.material);
        formData.append('stock', product.stock);
        formData.append('available', product.available);
        formData.append('tags', JSON.stringify(product.tags)); // If tags is an array
        if (image) formData.append('image', image); // If image is selected

        // Send the updated product data to the backend
        axios.put(`http://localhost:8080/api/products/${productId}`, product)
            .then(response => {
                alert('Product updated successfully');
            })
            .catch(error => {
                console.error('Error updating product:', error);
                alert('Error updating product');
            });
    };

    return (
        <div className="update-product-container">
            <h2>Update Product</h2>
            {loading ? (
                <p>Loading product details...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Discount:
                        <input
                            type="number"
                            name="discount"
                            value={product.discount}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Detailed Description:
                        <textarea
                            name="detailedDescription"
                            value={product.detailedDescription}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Brand:
                        <input
                            type="text"
                            name="brand"
                            value={product.brand}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Category:
                        <input
                            type="text"
                            name="category"
                            value={product.category?.name}
                            disabled
                        />
                    </label>
                    <label>
                        Sub-category:
                        <input
                            type="text"
                            name="subCategory"
                            value={product.subCategory?.name}
                            disabled
                        />
                    </label>
                    <label>
                        Sizes:
                        <input
                            type="text"
                            name="sizes"
                            value={product.sizes?.join(', ')}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Material:
                        <input
                            type="text"
                            name="material"
                            value={product.material}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Stock:
                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Available:
                        <input
                            type="checkbox"
                            name="available"
                            checked={product.available}
                            onChange={() => setProduct({ ...product, available: !product.available })}
                        />
                    </label>
                    <label>
                        Tags:
                        <input
                            type="text"
                            name="tags"
                            value={product.tags?.join(', ')}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Image:
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                        />
                    </label>
                    <button type="submit">Update Product</button>
                </form>
            )}
        </div>
    );
};

export default UpdateProductPage;
