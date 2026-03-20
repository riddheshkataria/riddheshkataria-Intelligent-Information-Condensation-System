import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // This function now handles the API call and redirects on success
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      // Send the login request to your backend API
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Check if the login was successful
      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // Handle a successful login
      console.log('Login successful:', data);
      localStorage.setItem('userToken', data.token); // Store the token
      
      // Redirect to the dashboard
      navigate('/dashboard'); 

    } catch (err) {
      // Handle failed login attempts
      console.error('Login error:', err.message);
      setError(err.message); // Display the error message to the user
    } finally {
      setLoading(false); // Stop the loading indicator
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        {/* <div className="logo-section">
          <img src="/logo.png" alt="IICS Logo" className="header-logo" />
          <span className="header-text"><h1>IICS</h1></span>
        </div> */}
        <Link to="/" className="login-button">Home</Link>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Background Elements */}
        <div className="background-elements">
          <div className="geometric-shape circle-1"></div>
          <div className="geometric-shape circle-2"></div>
          <div className="geometric-shape triangle-1"></div>
          <div className="mountains"></div>
          <div className="bridge"></div>
          {/* <div className="metro-train">
            <div className="train-body"></div>
            <div className="train-front"></div>
            <div className="train-windows"></div>
          </div> */}
          <div className="buildings">
            <div className="building building-1"></div>
            <div className="building building-2"></div>
            <div className="building building-3"></div>
          </div>
        </div>

        {/* Login Form */}
        <div className="login-container">
          <div className="login-form">

            <h2 className="login-title">Login</h2>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required  
                />
              </div>

              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
