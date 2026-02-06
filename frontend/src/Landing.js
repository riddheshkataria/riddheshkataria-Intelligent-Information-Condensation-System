import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

// --- NEW Social Media Icons ---
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>;
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.617l-5.21-6.817-6.042 6.817h-3.308l7.746-8.85-8.502-10.64h6.617l4.686 6.102 5.574-6.102zm-1.164 17.52h1.839l-11.417-15.34h-1.839l11.417 15.34z"/></svg>;
const LinkedInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>;
const YouTubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>;

function Landing() {
  return (
    <div className="landing-container">
      {/* Header */}
<header className="header">
  <div className="logo-section">
    <img src="/logo.png" alt="Kochi Metro Logo" className="header-logo" />
    <span className="header-text"><h1>KMRL SAARAM</h1></span>
  </div>
  <Link to="/login" className="login-button">Login</Link>
</header>


      {/* Hero Section with Train Image */}
<section className="hero-section">
  <div className="hero-image-container">
    <img
      src="/heroimg.png"
      alt="Kochi Metro Train"
      className="hero-train-image"
    />
  </div>
</section>

{/* Welcome Card OUTSIDE hero section */}
<div className="welcome-card">
  <h1>Welcome to KMRL</h1>
  <p>Our objective is to make Kochi the first city in the country where the entire public transport system: the metro, the buses, the boats, the auto-rickshaws and the taxies work together as a seamless integrated system; with a common timetable, common ticketing and centralised 'command and control'.</p>
</div>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="content-container">
          <div className="vision-card">
            <h2>Our Vision</h2>
            <p>To enrich the quality of life for everyone in Kochi by facilitating better connectivity between people, between people and places, and between people and prosperity.</p>
          </div>
          <div className="connecting-dots">
            <div className="dot large"></div>
            <div className="dot medium"></div>
            <div className="dot small"></div>
          </div>
          <div className="vision-image">
            <img
              src="/i1.png"
              alt="Metro at Station"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="content-container">
          <div className="mission-image">
            <img
              src="/i2.png"
              alt="KMRL Office"
            />
          </div>
          <div className="connecting-dots">
            <div className="dot large"></div>
            <div className="dot medium"></div>
            <div className="dot small"></div>
          </div>
          <div className="mission-card">
            <h2>Our Mission</h2>
            <p>To make Kochi a more liveable and pleasant city for residents and visitors alike, where public transportation would be used by all – connecting people and places safely, seamlessly, reliably and comfortably.</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-container">
          <h2>Values</h2>
          <div className="values-content">
            <p><strong>Safety and Service:</strong> We commit to provide a safe, reliable and customer-friendly transportation experience.</p>
            <p><strong>Community Involvement:</strong> We value being a part of the greater Kochi community and strive to contribute to the economic growth and development of the area.</p>
            <p><strong>Stakeholder Engagement:</strong> We pledge to work with all the stakeholders, including customers, employees, local businesses, local community, civic societies and appropriate state and federal governmental authorities, in our operations.</p>
            <p><strong>Cultural and Environmental Sustainability:</strong> We believe in sustainable economic development where infrastructural, economic and ecological concerns are integrated into smart growth.</p>
            <p><strong>Employee Empowerment:</strong> We commit to a work environment where employees are treated with respect, they take responsibility for results and their teamwork is rewarded.</p>
            <p><strong>Fiscal Responsibility & Accountability:</strong> We pledge to being fiscally responsible as well as being accountable for our actions.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src="/logo.png" alt="KMRL Logo" />
          </div>
          
          <div className="contact-details">
            <div className="contact-section">
              <h4>Contact Us</h4>
              <p>+91 0000000000 / +91 0000000000</p>
              <p>project@kmrl.com</p>
            </div>
            
            <div className="address-section">
              <h4>Address</h4>
              <p>Kochi Metro Rail Ltd. (KMRL), 4th Floor, Revenue Tower,</p>
              <p>Park Avenue, Kochi - 682011, Kerala, India.</p>
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
    </div>
  );
}

export default Landing;
