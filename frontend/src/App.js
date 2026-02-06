import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import your page components
import Landing from './Landing'; 
import LoginPage from './LoginPage';
import Dashboard from './Dashboard'; 
import DocumentView from './DocumentView';
import Database from './Database';
import ProfilePage from './ProfilePage';

function App() {
  return (
    <div>
      {/* The <Routes> component handles all your page routing */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/database" element={<Database />} />
         <Route path="/profile" element={<ProfilePage />} />
        {/* 2. Add the new route for your document page */}
        <Route path="/document/:id" element={<DocumentView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
