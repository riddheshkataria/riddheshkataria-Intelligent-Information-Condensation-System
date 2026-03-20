import React, { useState, useEffect } from 'react';
import './Database.css';

// --- Icon Components (unchanged) ---
const BackArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const DatabaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>;
const StarIcon = ({ isFilled, onClick }) => ( <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="star-icon"> <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon> </svg> );
const ArchiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
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
const TableViewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;
const BlockViewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;

const initialMockData = [ { id: 1, title: 'Rolling Stock Maintenance SOP', description: 'Standard operating procedures for daily train maintenance and checks.', category: 'Operations & Maintenance', time: '9:15 AM', isStarred: false }, { id: 2, title: 'Station Staffing Roster Q4', description: 'Weekly duty roster for all customer service and station staff for the fourth quarter.', category: 'Operations & Maintenance', time: '8:30 AM', isStarred: false }, { id: 3, title: 'Track Inspection Report - Sept', description: 'Monthly inspection report for the main line tracks and signalling.', category: 'Operations & Maintenance', time: 'Yesterday', isStarred: true }, { id: 4, title: 'Q3 Financial Statement', description: 'Quarterly financial statements and corporate performance review.', category: 'Finance', time: '10:02 AM', isStarred: true }, { id: 5, title: 'Annual Budget Proposal 2026', description: 'The proposed budget allocation for all departments for the upcoming fiscal year.', category: 'Finance', time: '2:10 PM', isStarred: false }, { id: 6, title: 'Vendor Payment Records', description: 'Ledger of all payments made to approved vendors in Q3.', category: 'Finance', time: '4 Days Ago', isStarred: false }, { id: 7, title: 'Employee Onboarding Manual', description: 'A comprehensive handbook for new hires detailing all company policies.', category: 'Human Resources', time: '11:30 AM', isStarred: false }, { id: 8, title: 'Recruitment Drive Plan - Technicians', description: 'Strategy and planning document for hiring new train operators and technicians.', category: 'Human Resources', time: '12:00 PM', isStarred: false }, { id: 9, title: 'Performance Review Guidelines', description: 'SOP for conducting annual employee performance reviews.', category: 'Human Resources', time: '2 Weeks Ago', isStarred: false }, { id: 10, title: 'New Line Extension Blueprint', description: 'Technical drawings and project plan for the Phase 2 extension.', category: 'Projects & Planning', time: '1:45 PM', isStarred: false }, { id: 11, title: 'Signalling System Spec Sheet', description: 'Technical specifications for the new CBTC signalling system tender.', category: 'Projects & Planning', time: 'Yesterday', isStarred: true }, { id: 12, title: 'Platform Safety Audit - Oct 2025', description: 'Monthly safety and security inspection report for all metro stations.', category: 'Safety & Security', time: '3:20 PM', isStarred: true }, { id: 13, title: 'CCTV Footage Access Policy', description: 'Rules and regulations for requesting and accessing security camera footage.', category: 'Safety & Security', time: 'Yesterday', isStarred: false }, { id: 14, title: 'Emergency Evacuation Drill Report', description: 'Post-action report from the latest system-wide emergency drill.', category: 'Safety & Security', time: 'Last Week', isStarred: false }, { id: 15, title: 'IT Server Infrastructure Upgrade', description: 'Detailed plan and budget for the upcoming server hardware replacement.', category: 'Information Technology', time: '4:55 PM', isStarred: false }, { id: 16, title: 'Ticketing System API Docs', description: 'Technical documentation for the automated fare collection (AFC) system API.', category: 'Information Technology', time: 'Yesterday', isStarred: false }, { id: 17, title: 'Cybersecurity Policy v3.1', description: 'Updated company-wide policy on data security and acceptable use.', category: 'Information Technology', time: '3 Days Ago', isStarred: true }, { id: 18, title: 'Land Acquisition Contract - Phase 2', description: 'Legal contracts pertaining to land acquisition for the new line.', category: 'Legal', time: '1 Week Ago', isStarred: false }, { id: 19, title: 'Regulatory Compliance Checklist', description: 'Checklist of all national and state transport regulations.', category: 'Legal', time: '5 Days Ago', isStarred: false }, { id: 20, title: 'Press Release - New Smart Card', description: 'Official press release document for the launch of the new smart card.', category: 'Marketing & PR', time: '10:00 AM', isStarred: false }, { id: 21, title: 'Social Media Content Calendar', description: 'Monthly schedule for posts on all social media platforms.', category: 'Marketing & PR', time: 'Yesterday', isStarred: false }, { id: 22, title: 'Tender Document - Station Cleaning Services', description: 'Request for Proposal (RFP) for station housekeeping and cleaning.', category: 'Procurement', time: '2 Days Ago', isStarred: false }, { id: 23, title: 'Vendor Onboarding SOP', description: 'Standard procedure for registering new suppliers and vendors.', category: 'Procurement', time: 'Last Month', isStarred: false }, { id: 24, title: 'Monthly Feedback Analysis Report', description: 'Analysis of customer feedback collected from all channels in September.', category: 'Customer Relations', time: '3 Days Ago', isStarred: false }, { id: 25, title: 'Complaint Resolution SOP', description: 'Step-by-step guide for customer service agents on handling complaints.', category: 'Customer Relations', time: '2 Weeks Ago', isStarred: true }, ];

const Header = () => ( <header className="page-header"> <img src="/logo.png" alt="IICS Logo" className="logo" /> <div className="header-middle"> <div className="search-bar-header"> <SearchIcon /> <input type="text" placeholder="Search..." /> </div> </div> <div className="header-controls"> <div className="user-profile"> <UserIcon /> </div> </div> </header> );
const Sidebar = ({ isOpen }) => ( <aside className={`sidebar ${isOpen ? 'open' : ''}`}> <nav> <ul> <li className="active"><DatabaseIcon /><span>Database</span></li> <li><StarIcon isFilled={false}/><span>Starred</span></li> <li><ArchiveIcon /><span>Archive</span></li> <li><UploadIcon /><span>Uploaded Documents</span></li> </ul> </nav> </aside> );
const DocumentCard = ({ doc, onStarClick }) => ( <div className="document-card"> <div className="card-header"> <span className="card-category">{doc.category}</span> <StarIcon isFilled={doc.isStarred} onClick={() => onStarClick(doc.id)} /> </div> <h4 className="card-title">{doc.title}</h4> <p className="card-description">{doc.description}</p> <div className="card-footer"> <span className="card-time">{doc.time}</span> </div> </div> );
const DataView = ({ data, viewMode, onStarClick }) => { if (viewMode === 'block') { return ( <div className="block-view-container"> {data.map((doc) => ( <DocumentCard key={doc.id} doc={doc} onStarClick={onStarClick} /> ))} </div> ); } return ( <table className="data-table"> <thead> <tr> <th></th> <th>Document Title</th> <th>Description</th> <th>Category</th> <th>Last Modified</th> </tr> </thead> <tbody> {data.map((row) => ( <tr key={row.id}> <td><StarIcon isFilled={row.isStarred} onClick={() => onStarClick(row.id)} /></td> <td>{row.title}</td> <td>{row.description}</td> <td>{row.category}</td> <td>{row.time}</td> </tr> ))} </tbody> </table> ); };
const Footer = () => ( <footer className="page-footer"> <div className="footer-content"> <div className="footer-logo-section"> <img src="/logo.png" alt="IICS Logo" className="footer-logo" /> </div> <div className="footer-section"> <h4>Contact Us</h4> <p><PhoneIcon />+91 0000000000 / +91 0000000000</p> <p><MailIcon />project@iics.com</p> </div> <div className="footer-section"> <h4>Address</h4> <p><MapPinIcon />IICS Headquarters, Innovation Hub, Cyber City - 682011</p> </div> <div className="footer-social"> <h4>Follow Us</h4> <div className="social-icons"> <FacebookIcon /> <InstagramIcon /> <XIcon /> <LinkedinIcon /> <YoutubeIcon /> </div> </div> </div> </footer> );

const DatabasePage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [viewMode, setViewMode] = useState('table');
    const [sortCategory, setSortCategory] = useState('all');
    const [documents, setDocuments] = useState(initialMockData);
    const [displayedData, setDisplayedData] = useState(initialMockData);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const handleStarClick = (docId) => {
        setDocuments(prevDocs => 
            prevDocs.map(doc => 
                doc.id === docId ? { ...doc, isStarred: !doc.isStarred } : doc
            )
        );
    };

    useEffect(() => {
        let filteredData = [...documents];

        if (searchQuery) {
            filteredData = filteredData.filter(doc =>
                doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sortCategory === 'starred') {
            filteredData = filteredData.filter(doc => doc.isStarred);
        } else if (sortCategory !== 'all') {
            filteredData = filteredData.filter(doc => doc.category === sortCategory);
        }

        setDisplayedData(filteredData);
    }, [sortCategory, documents, searchQuery]);

    const categories = ['all', 'starred', ...new Set(initialMockData.map(item => item.category))];

    return (
        <div className="page-container">
            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
            
            <Sidebar isOpen={isSidebarOpen} />
            
            <div className="content-wrapper">
                <Header />
                <main className="main-content">
                    {/* --- THIS WRAPPER IS THE FIX --- */}
                    <div className="main-header-buttons">
                        <button className="back-button"><BackArrowIcon /><span>Dashboard</span></button>
                        <button className="hamburger-btn-main" onClick={toggleSidebar}><HamburgerIcon /></button>
                    </div>

                    <div className="content-body">
                        <div className="data-table-container">
                            <div className="table-toolbar">
                                <input 
                                    type="text" 
                                    placeholder="Search Documents..." 
                                    className="table-search-box"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="toolbar-controls">
                                    <div className="select-wrapper">
                                        <select className="category-sort" value={sortCategory} onChange={(e) => setSortCategory(e.target.value)}>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>
                                                    {cat === 'all' ? 'All Categories' : cat === 'starred' ? 'Show Starred Only' : cat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="view-toggle">
                                        <button className={viewMode === 'table' ? 'active' : ''} onClick={() => setViewMode('table')}><TableViewIcon /></button>
                                        <button className={viewMode === 'block' ? 'active' : ''} onClick={() => setViewMode('block')}><BlockViewIcon /></button>
                                    </div>
                                </div>
                            </div>
                            <DataView data={displayedData} viewMode={viewMode} onStarClick={handleStarClick} />
                        </div>
                    </div>
                </main>
            </div>
            
            <Footer />
        </div>
    );
};

export default DatabasePage;