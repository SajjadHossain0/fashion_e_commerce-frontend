import React from 'react';
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-columns">


                {/*Column 2: Quick Links*/}
                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <a href="#">Home</a>
                    <a href="#">About us</a>
                    <a href="#">Our vision</a>

                </div>

                {/*// <!-- Column 3: Contact -->*/}
                <div className="footer-column">
                    <h3>Contact Us</h3>
                    <a href="mailto:contact@yourwebsite.com">Email:</a>
                    <a href="tel:+1234567890">Phone:</a>
                    <a href="#">Support</a>
                </div>

                {/*// <!-- Column 4: Follow Us (Social Media Links) -->*/}
                <div className="footer-column">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook"></i> Facebook</a>
                        <a href="#"><i className="fab fa-twitter"></i> Twitter</a>
                        <a href="#"><i className="fab fa-instagram"></i> Instagram</a>
                        <a href="#"><i className="fab fa-linkedin"></i> LinkedIn</a>
                    </div>
                </div>
            </div>

            {/*// <!-- Footer Bottom: Copyright -->*/}
            <div className="footer-bottom">
                &copy; 2024 YourWebsite | All rights reserved.
            </div>
        </footer>
    )
}