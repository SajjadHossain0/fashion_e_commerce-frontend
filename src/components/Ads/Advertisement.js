import React, { useState, useEffect } from 'react';
import './Advertisement.css';
import apiClient from '../API/apiClient';  // Ensure your API client is correctly imported

const Advertisement = () => {
    const [ads, setAds] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Fetch advertisements from the API
    const fetchAdvertisements = async () => {
        try {
            const response = await apiClient.get("/ads");
            setAds(response.data);  // Set the fetched advertisements in state
        } catch (error) {
            console.error("Error fetching ads:", error);
        }
    };

    // Fetch ads when the component is mounted
    useEffect(() => {
        fetchAdvertisements();
    }, []);

    // Auto-slide to the next image every 5 seconds
    useEffect(() => {
        if (ads.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % ads.length);
            }, 5000); // Change image every 5 seconds

            return () => clearInterval(interval); // Cleanup interval on unmount
        }
    }, [ads]);

    // Navigate to a specific slide when clicked
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // If ads are not yet loaded, show loading message
    if (ads.length === 0) return <p>Loading advertisements...</p>;

    return (
        <div className="carousel">
            <div
                className="carousel-slides"
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`, // Sliding effect
                }}
            >
                {ads.map((ad, index) => (
                    <div key={ad.id} className="carousel-slide">
                        <img
                            src={`data:image/jpeg;base64,${ad.image}`}
                            alt={`Ad ${index + 1}`}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="carousel-dots">
                {ads.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Advertisement;
