import React, { useState } from 'react';
import './ProfilePage.css'; // New CSS for this page

// --- Icon Components (Re-used/New) ---
// In a real app, these would be imported from a centralized icon library.
// For consistency, I'm including common ones here along with new ones.
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const HamburgerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;

const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.1-3.1A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4.18 2h3a2 2 0 0 1 2 1.72c.1.72.32 1.44.64 2.15a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.71.32 1.43.54 2.15.64a2 2 0 0 1 1.72 2z"></path></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const YoutubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C2 8.15 2 12 2 12s0 3.85.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C22 15.85 22 12 22 12s0-3.85-.46-5.58z"></path><path d="M10 15l5-3-5-3z"></path></svg>;

// --- NEW ICONS for Profile Page ---
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-8.15"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;

// --- Header Component (from Database.js) ---
const Header = () => (
    <header className="page-header">
        <img src="/logo.png" alt="IICS Logo" className="logo" />
        <div className="header-middle">
            <div className="search-bar-header">
                <SearchIcon />
                <input type="text" placeholder="Search..." />
            </div>
        </div>
        <div className="header-controls">
            <div className="user-profile">
                <UserIcon />
            </div>
        </div>
    </header>
);

// --- Footer Component (from Database.js) ---
const Footer = () => (
    <footer className="page-footer">
        <div className="footer-content">
            <div className="footer-logo-section">
                <img src="/logo.png" alt="IICS Logo" className="footer-logo" />
            </div>
            <div className="footer-section">
                <h4>Contact Us</h4>
                <p><PhoneIcon />+91 98765 43210 / +91 99887 76655</p>
                <p><MailIcon />hr@iics.com</p>
            </div>
            <div className="footer-section">
                <h4>Address</h4>
                <p><MapPinIcon />IICS Headquarters, Innovation Hub, Cyber City - 682011</p>
            </div>
            <div className="footer-social">
                <h4>Follow Us</h4>
                <div className="social-icons">
                    <FacebookIcon />
                    <InstagramIcon />
                    <XIcon />
                    <LinkedinIcon />
                    <YoutubeIcon />
                </div>
            </div>
        </div>
    </footer>
);

// --- Simplified Sidebar Component ---
// In a full app, this would be a detailed component imported from a shared location.
const Sidebar = ({ isOpen }) => (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
            <ul>
                {/* Example sidebar items - you can fill these in as needed */}
                <li><UserIcon /><span>My Profile</span></li>
                <li><SearchIcon /><span>Documents</span></li>
                <li><HamburgerIcon /><span>Settings</span></li>
            </ul>
        </nav>
    </aside>
);


const ProfilePage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen); // Function to toggle sidebar

    // --- Employee Data ---
    const employeeData = {
        name: "Aisha Sharma",
        role: "Station Operations Manager",
        id: "101234030482",
        birthDate: "15/05/1988",
        address: "Apartment 1201, Tech View Towers, MG Road, Cyber City - 682016",
        phone: "+91 98765 43210",
        email: "aisha.sharma@iics.com",
        lastLogin: "10th Sept, 10:45PM",
        accessRoles: ["Operations Team", "Emergency Response", "Safety Auditor", "Owner"]
    };

    return (
        <div className="profile-page-container">
            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

            <Sidebar isOpen={isSidebarOpen} /> {/* Sidebar component */}

            <Header />

            <main className="profile-main-content">
                {/* Hamburger menu button on the profile page */}
                <button className="hamburger-btn-profile" onClick={toggleSidebar}>
                    <HamburgerIcon />
                </button>

                <div className="profile-card">
                    <div className="profile-header-section">
                        <div className="profile-avatar">
                            <UserIcon />
                        </div>
                        <div className="profile-info-basic">
                            <h2 className="profile-name">{employeeData.name}</h2>
                            <p className="profile-role">{employeeData.role}</p>
                            <span className="profile-id">ID: {employeeData.id}</span>
                        </div>
                        <button className="edit-profile-btn"><EditIcon /></button>
                    </div>

                    <div className="profile-section">
                        <h3 className="section-title">Personal Info</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Name</span>
                                <span className="info-value">{employeeData.name}</span>
                                <ArrowRightIcon />
                            </div>
                            <div className="info-item">
                                <span className="info-label">Birth Date</span>
                                <span className="info-value">{employeeData.birthDate}</span>
                                <ArrowRightIcon />
                            </div>
                            <div className="info-item">
                                <span className="info-label">Address</span>
                                <span className="info-value">{employeeData.address}</span>
                                <ArrowRightIcon />
                            </div>
                            <div className="info-item">
                                <span className="info-label">Phone</span>
                                <span className="info-value">{employeeData.phone}</span>
                                <ArrowRightIcon />
                            </div>
                            <div className="info-item">
                                <span className="info-label">Email ID</span>
                                <span className="info-value">{employeeData.email}</span>
                                <ArrowRightIcon />
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <h3 className="section-title">Data and Privacy</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Login history</span>
                                <span className="info-value">Last Login was on {employeeData.lastLogin}</span>
                                <LockIcon />
                            </div>
                            <div className="info-item">
                                <span className="info-label">Password</span>
                                <span className="info-value">******* *****</span>
                                <LockIcon />
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <h3 className="section-title">Access</h3>
                        <div className="access-tags">
                            {employeeData.accessRoles.map((role, index) => (
                                <div key={index} className={`access-tag ${role === "Owner" ? "owner" : ""}`}>
                                    <span>{role}</span>
                                    {role === "Owner" ? <ShieldIcon /> : <CheckCircleIcon />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProfilePage;