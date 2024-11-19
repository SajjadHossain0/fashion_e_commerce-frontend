import React from "react";
import './ProductCard.css'
import {FaHotjar} from "react-icons/fa";

export default function ProductCard(props) {

    // Function to truncate text
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div>
            <a style={{ textDecoration: "none", color: "black" }}>
                <div className="product-card" onClick={props.onClick}>
                    <img
                        src={props.image}
                        alt={props.title}
                    />
                    <h3>{props.title}</h3>
                    <p>{truncateText(props.description, 30)}</p>
                    <div className="original-price">৳{props.price}</div>
                    <div className="discount-price">৳{props.discountedPrice}</div>
                    <button className="add-to-cart-btn">
                        <a href="#">Add to Cart</a>
                    </button>
                </div>
            </a>
        </div>
    );
}