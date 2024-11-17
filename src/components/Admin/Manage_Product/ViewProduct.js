import React, {useEffect, useState} from 'react';
import './ViewProduct.css'
import {Link} from "react-router-dom";
import axios from "axios";
import apiClient from "../../API/apiClient";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Bounce, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function ViewProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
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


    // Fetch all products on component mount
    useEffect(() => {
        apiClient.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
                setLoading(false);
            });
    }, []);

    // Handle delete product
    const handleDelete = (productId) => {
        apiClient.delete(`/products/${productId}`)
            .then(response => {
                successNotify('Product deleted successfully')
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
                    <CircularProgress/>
                    <p>Loading products...</p>
                </div>
            ) : (
                <table className="product-table">
                    <thead>
                    <tr>
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
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>৳{product.price}</td>
                            <td>৳{product.discountedPrice}</td>
                            <td>{product.category?.name}</td>
                            <td>{product.subCategory?.name}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Link to={`/update-product/${product.id}`}>
                                    <button className="btn-update">Update</button>
                                </Link>
                                <button className="btn-delete" onClick={() => handleDelete(product.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <ToastContainer />
        </div>
    );
}