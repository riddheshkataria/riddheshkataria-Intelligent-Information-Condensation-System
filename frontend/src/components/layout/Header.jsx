import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, ProfileIcon } from '../icons/Icons';
import './Header.css';

const Header = memo(() => {
    const [language, setLanguage] = useState('English');
    const toggleLanguage = () => setLanguage((c) => (c === 'English' ? 'മലയാളം' : 'English'));

    return (
        <header className="dashboard-header">
            <div className="logo">
                <span className="logo-text">IICS</span>
            </div>
            <div className="search-bar">
                <SearchIcon />
                <input type="text" placeholder="Search documents, tasks..." />
            </div>
            <div className="header-controls">
                <button onClick={toggleLanguage} className="language-toggle">
                    {language} <span>Aあ</span>
                </button>
                <Link to="/profile" className="profile-button" aria-label="Profile">
                    <ProfileIcon />
                </Link>
            </div>
        </header>
    );
});

Header.displayName = 'Header';
export default Header;
