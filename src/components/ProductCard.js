import React from "react";
import './ProductCard.css'
import {FaHotjar} from "react-icons/fa";

export default function ProductCard(props) {
    return (
        <div>
            <a href="#" style={{ textDecoration: "none", color: "black" }}>
                <div className="product-card">
                    <img
                        src={props.image}
                        alt={props.title}
                    />
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
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


/*
<a href="" style={{textDecoration:"none",color:"black"}}>
                <div className="product-card">
                    {/!*<div className="tag"><FaHotjar /> Hot</div>*!/}
<br/>
<img
    src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
    alt="Product Image"
/>

<h3>Product Title</h3>
<p>Short description of the product goes here.</p>
<div className="original-price">৳30.00</div>
<div className="discount-price">৳19.99</div>
<button className="add-to-cart-btn"><a href="">Add to Cart</a></button>
</div>
</a>*/
