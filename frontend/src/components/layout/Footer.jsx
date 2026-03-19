import React, { memo } from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon, YouTubeIcon } from '../icons/Icons';
import './Footer.css';

const Footer = memo(() => (
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-logo">
                <span className="footer-brand">IICS</span>
                <p className="footer-tagline">Intelligent Information Condensation System</p>
            </div>
            <div className="contact-details">
                <div className="contact-section">
                    <h4>Contact Us</h4>
                    <p>+91 0000000000 / +91 0000000000</p>
                    <p>project@iics.com</p>
                </div>
                <div className="address-section">
                    <h4>Address</h4>
                    <p>IICS Headquarters,</p>
                    <p>Kochi, Kerala, India.</p>
                </div>
            </div>
            <div className="social-media">
                <h4>Follow Us</h4>
                <div className="social-icons">
                    <a href="#" aria-label="Facebook"><FacebookIcon /></a>
                    <a href="#" aria-label="Instagram"><InstagramIcon /></a>
                    <a href="#" aria-label="Twitter"><TwitterIcon /></a>
                    <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
                    <a href="#" aria-label="YouTube"><YouTubeIcon /></a>
                </div>
            </div>
        </div>
    </footer>
));

Footer.displayName = 'Footer';
export default Footer;
