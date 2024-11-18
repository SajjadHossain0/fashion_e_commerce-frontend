import React from "react";
import "./ImageCard.css";

export default function ImageCard({imageSrc, text}) {
    return (
        <a href="#" style={{textDecoration: "none", color: "black"}}>
            <div className="image-card">
                <div className="text-overlay">{text}</div>
                <img src={imageSrc} alt={text} className="image"/>
            </div>
        </a>
    );
}
