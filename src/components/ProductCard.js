import React from "react";
import './ProductCard.css'
import {FaRegHeart} from "react-icons/fa";
import {addToWishlist} from "./addToWishlist";

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
            <a style={{textDecoration: "none", color: "black"}}>
                <div className="product-card">
                    <div onClick={props.onClick}>
                        <img
                            src={props.image}
                            alt={props.title}
                        />
                        <h3>{props.title}</h3>
                        <p>{truncateText(props.description, 30)}</p>
                        <div className="original-price">৳{props.price}</div>
                        <div className="discount-price">৳{props.discountedPrice}</div>
                        <div className="product-action-btn">
                            <button className="add-to-cart-btn">
                                <a>Add to Cart</a>
                            </button>
                            <a href="/my-wishlist" onClick={props.onWishlistClick} className="wishlist-btn">
                                <FaRegHeart/>
                            </a>
                        </div>
                    </div>


                </div>
            </a>
        </div>
    );
}