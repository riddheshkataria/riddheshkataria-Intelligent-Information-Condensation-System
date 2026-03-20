import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      localStorage.setItem('userToken', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg login-bg-top" />
      <div className="login-bg login-bg-bottom" />

      <header className="login-page-header">
        <Link to="/" className="login-brand">
          <span className="brand-pulse" />
          IICS
        </Link>
        <Link to="/" className="login-home-link">Back to Home</Link>
      </header>

      <main className="login-page-main">
        <section className="login-intro-card">
          <p className="intro-eyebrow">Secure Workspace Access</p>
          <h1>Welcome to your intelligence command center.</h1>
          <p>
            Sign in to manage condensed insights, track document intelligence, and keep every decision linked to
            reliable evidence.
          </p>

          <div className="intro-points">
            <article>
              <h3>Faster context</h3>
              <p>Bring scattered updates into one digestible, searchable view.</p>
            </article>
            <article>
              <h3>Trusted outputs</h3>
              <p>Trace conclusions directly to source material and confidence signals.</p>
            </article>
            <article>
              <h3>Role-aware control</h3>
              <p>Protect sensitive workflows with access boundaries and audit trails.</p>
            </article>
          </div>
        </section>

        <section className="login-form-shell">
          <div className="login-form-card">
            <p className="form-eyebrow">Account Login</p>
            <h2 className="login-title">Welcome back</h2>
            <p className="login-subtitle">Enter your credentials to continue.</p>

            <form className="login-form" onSubmit={handleLogin}>
              <label className="login-field" htmlFor="email">
                Email
                <input
                  type="email"
                  id="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="login-field" htmlFor="password">
                Password
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              {error && <p className="error-message" role="alert">{error}</p>}
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LoginPage;
