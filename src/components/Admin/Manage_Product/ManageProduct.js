import React from 'react';
import './ManageProduct.css'
import {IoAddCircle} from "react-icons/io5";
import {MdOutlineViewCarousel} from "react-icons/md";

export default function ManageProduct() {
    return (
        <div>
            <h1>Manage your products</h1>
            <div className="manage-product-grid">
                <a href="/addProduct" style={{textDecoration: "none", color: "black"}}>
                    <div className="manage-product-card">
                        <div><IoAddCircle/></div>
                        <div>Add Product</div>
                    </div>
                </a>
                <a href="/viewProduct" style={{textDecoration: "none", color: "black"}}>
                    <div className="manage-product-card">
                        <div><MdOutlineViewCarousel/></div>
                        <div>View Product</div>
                    </div>
                </a>


            </div>
        </div>
    );
}