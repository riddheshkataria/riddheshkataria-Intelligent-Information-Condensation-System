import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Eagerly loaded (most visited after login)
import Dashboard from './pages/Dashboard/Dashboard';

// Lazy loaded pages
const Landing = lazy(() => import('./Landing'));
const LoginPage = lazy(() => import('./LoginPage'));
const DocumentView = lazy(() => import('./DocumentView'));
const Database = lazy(() => import('./Database'));
const ProfilePage = lazy(() => import('./ProfilePage'));

// Loading fallback
const PageLoader = () => (
  <div className="loading-container">
    <div className="spinner" />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/database" element={<Database />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/document/:id" element={<DocumentView />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
