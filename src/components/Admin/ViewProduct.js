import React, { useEffect, useState } from 'react';
import './ViewProduct.css';
import { Link } from "react-router-dom";
import axios from "axios";
import apiClient from "../API/apiClient";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Button } from "reactstrap";

export default function ViewProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const successNotify = (message) => toast.success(message, {
        position: "bottom-left",
        autoClose: 3000,
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
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });

    // Fetch products, categories, and subcategories on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await apiClient.get('/products');
                setProducts(productsResponse.data);

                const categoriesResponse = await apiClient.get('/categories');
                setCategories(categoriesResponse.data);

                const subCategoriesResponse = await apiClient.get('/subcategories');
                setSubCategories(subCategoriesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleOpenModal = (product) => {
        setSelectedProduct({ ...product });
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedProduct(null);
    };

    const handleUpdateProduct = () => {
        if (!selectedProduct.title || !selectedProduct.price) {
            errorNotify('Please fill in all required fields');
            return;
        }

        const {
            id, title, price, discountedPrice, discount,
            description, detaileddescription, brand, categoryId,
            subCategoryId, sizes, material, stock, available, tags
        } = selectedProduct;

        const sizesString = Array.isArray(sizes) ? sizes.join(',') : sizes;
        const tagsString = Array.isArray(tags) ? tags.join(',') : tags;

        apiClient.put(`/products/${id}`, null, {
            params: {
                title, price, discountedPrice, discount,
                description, detaileddescription, brand, categoryId,
                subCategoryId, sizes: sizesString, material, stock,
                available, tags: tagsString,
            }
        })
            .then(response => {
                successNotify('Product updated successfully');
                setOpenModal(false);
                setSelectedProduct(null);
                setProducts(products.map(product => product.id === id ? response.data : product));
            })
            .catch(error => {
                errorNotify('Error updating product');
                console.error(error);
            });
    };

    // Handle delete product
    const handleDelete = (productId) => {
        apiClient.delete(`/products/${productId}`)
            .then(response => {
                successNotify('Product deleted successfully');
                setProducts(products.filter(product => product.id !== productId));
            })
            .catch(error => {
                errorNotify('Error deleting product');
                console.error(error);
            });
    };

    return (
        <div className="product-view-container">
            <h2>Product List</h2>
            {loading ? (
                <div align="center">
                    <CircularProgress />
                    <p>Loading products...</p>
                </div>
            ) : (
                <table className="product-table">
                    <thead>
                    <tr>
                        <th>S/L</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Discount-Price</th>
                        <th>Category</th>
                        <th>Sub-Category</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product,index) => (
                        <tr key={product.id}>
                            <td>{index+1}</td>
                            <td><img src={`data:image/jpeg;base64,${product.image}`} alt={product.title} height="100" width="100"/></td>
                            <td>{product.title}</td>
                            <td>৳{product.price}</td>
                            <td>৳{product.discountedPrice}</td>
                            <td>{product.category?.name}</td>
                            <td>{product.subCategory?.name}</td>
                            <td>{product.stock}</td>
                            <td>
                                <button className="btn-update" onClick={() => handleOpenModal(product)}>
                                    Update
                                </button>
                                <button className="btn-delete" onClick={() => handleDelete(product.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* Update Product Modal */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Update Product</DialogTitle>
                <DialogContent>
                    {selectedProduct && (
                        <form>
                            <TextField
                                label="Title"
                                value={selectedProduct.title}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <div className="price-discount-div">
                                <TextField
                                    label="Price"
                                    type="number"
                                    value={selectedProduct.price}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    label="Discount"
                                    type="number"
                                    value={selectedProduct.discount}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, discount: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            </div>

                            <TextField
                                label="Short Description"
                                multiline
                                rows={3}
                                value={selectedProduct.description}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Detailed Description"
                                multiline
                                rows={5}
                                value={selectedProduct.detaileddescription}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, detaileddescription: e.target.value })}
                                fullWidth
                                margin="normal"
                                required
                            />

                            <div className="brand-material-div">
                                <TextField
                                    label="Brand"
                                    value={selectedProduct.brand}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, brand: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    label="Material"
                                    value={selectedProduct.material}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, material: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            </div>

                            <div className="category-div">
                                {/* Category Dropdown */}
                                <select
                                    name="categoryId"
                                    value={selectedProduct.categoryId}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, categoryId: e.target.value })}
                                    required
                                >
                                    <option value="">Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                {/* Subcategory Dropdown */}
                                <select
                                    name="subCategoryId"
                                    value={selectedProduct.subCategoryId}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, subCategoryId: e.target.value })}
                                    required
                                >
                                    <option value="">Subcategory</option>
                                    {subCategories.map((subCategory) => (
                                        <option key={subCategory.id} value={subCategory.id}>
                                            {subCategory.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <TextField
                                label="Sizes (comma-separated)"
                                value={selectedProduct.sizes}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, sizes: e.target.value })}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Stock"
                                type="number"
                                value={selectedProduct.stock}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value })}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <div className="tags-div">
                                <TextField
                                    label="Tags (comma-separated)"
                                    value={selectedProduct.tags}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, tags: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            </div>
                        </form>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateProduct} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer />
        </div>
    );
}
