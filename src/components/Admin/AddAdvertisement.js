import React, { useState, useEffect } from "react";
import apiClient from "../API/apiClient";
import "./AddAdvertisement.css";

export default function AddAdvertisement() {
    const [ads, setAds] = useState([]);
    const [adTitle, setAdTitle] = useState("");
    const [adImage, setAdImage] = useState(null);

    // Fetch all ads on load
    useEffect(() => {
        fetchAdvertisements();
    }, []);

    const fetchAdvertisements = async () => {
        try {
            const response = await apiClient.get("/ads");
            setAds(response.data);
        } catch (error) {
            console.error("Error fetching ads:", error);
        }
    };

    // Handle adding a new advertisement
    const handleAddAdvertisement = async (e) => {
        e.preventDefault();
        if (!adTitle || !adImage) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("title", adTitle);
        formData.append("image", adImage);

        try {
            const response = await apiClient.post("/ads", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Advertisement added successfully!");
            setAdTitle("");
            setAdImage(null);
            fetchAdvertisements(); // Refresh advertisements
        } catch (error) {
            console.error("Error adding advertisement:", error);
        }
    };

    // Handle deleting an advertisement
    const handleDeleteAdvertisement = async (id) => {
        if (!window.confirm("Are you sure you want to delete this advertisement?")) {
            return;
        }

        try {
            await apiClient.delete(`/ads/${id}`);
            alert("Advertisement deleted successfully!");
            fetchAdvertisements(); // Refresh advertisements
        } catch (error) {
            console.error("Error deleting advertisement:", error);
        }
    };

    return (
        <div className="ads-page">
            {/* Left Side: Add Advertisement */}
            <div className="ads-page__add">
                <h2 className="ads-page__title">Add Advertisement</h2>
                <form onSubmit={handleAddAdvertisement} className="ads-page__form">
                    <input
                        type="text"
                        placeholder="Advertisement Title"
                        value={adTitle}
                        onChange={(e) => setAdTitle(e.target.value)}
                        className="ads-page__input"
                    />
                    <input
                        type="file"
                        onChange={(e) => setAdImage(e.target.files[0])}
                        className="ads-page__input-file"
                    />
                    <button type="submit" className="ads-page__button">
                        Add Advertisement
                    </button>
                </form>
            </div>

            {/* Right Side: View Advertisements */}
            <div className="ads-page__view">
                <h2 className="ads-page__title">View Advertisements</h2>
                <div className="ads-page__list">
                    {ads.map((ad) => (
                        <div key={ad.id} className="ads-page__card">
                            <img
                                src={`data:image/jpeg;base64,${ad.image}`}
                                alt={ad.title}
                                className="ads-page__image"
                            />
                            <h3 className="ads-page__ad-title">{ad.title}</h3>
                            <button
                                onClick={() => handleDeleteAdvertisement(ad.id)}
                                className="ads-page__delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
