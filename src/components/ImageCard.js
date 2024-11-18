import React from "react";
import "./ImageCard.css";

const ImageCard = ({ imageSrc, text, onClick }) => {
    return (
        <div className="image-card" onClick={onClick} style={{ cursor: "pointer" }}>
            <div className="image-overlay">{text}</div>
            <img src={imageSrc} alt={text} className="image" />
        </div>
    );
};

export default ImageCard;
