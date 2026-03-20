import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg>;
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.617l-5.21-6.817-6.042 6.817h-3.308l7.746-8.85-8.502-10.64h6.617l4.686 6.102 5.574-6.102zm-1.164 17.52h1.839l-11.417-15.34h-1.839l11.417 15.34z" /></svg>;
const LinkedInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>;
const YouTubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>;

const metrics = [
  { value: '2M+', label: 'Documents condensed every month' },
  { value: '91%', label: 'Faster insight delivery across teams' },
  { value: '24/7', label: 'Monitoring for mission-critical pipelines' },
];

const capabilities = [
  {
    title: 'Semantic Condensation',
    description: 'Compress lengthy files into high-signal summaries while preserving intent, entities, and decisions.',
  },
  {
    title: 'Cross-Source Fusion',
    description: 'Unify unstructured notes, reports, and data feeds into one consistent intelligence layer.',
  },
  {
    title: 'Decision Timelines',
    description: 'Generate action-ready timelines that reveal what changed, why it matters, and what happens next.',
  },
  {
    title: 'Confidence Scoring',
    description: 'Trace every insight back to source evidence with transparent confidence scoring and drift alerts.',
  },
  {
    title: 'Secure Workspaces',
    description: 'Run enterprise workflows with role-aware controls, audit trails, and privacy-first architecture.',
  },
  {
    title: 'Plug-and-Play APIs',
    description: 'Integrate IICS into your stack using clean APIs for ingestion, analysis, and reporting automation.',
  },
];

const socialLinks = [
  { label: 'Facebook', href: '#', icon: <FacebookIcon /> },
  { label: 'Instagram', href: '#', icon: <InstagramIcon /> },
  { label: 'X', href: '#', icon: <TwitterIcon /> },
  { label: 'LinkedIn', href: '#', icon: <LinkedInIcon /> },
  { label: 'YouTube', href: '#', icon: <YouTubeIcon /> },
];

function Landing() {
  return (
    <div className="landing-page">
      <div className="landing-bg landing-bg-one" />
      <div className="landing-bg landing-bg-two" />

      <header className="landing-header">
        <Link to="/" className="brand-mark">
          <span className="brand-dot" />
          IICS
        </Link>

        <nav className="landing-nav">
          <a href="#platform">Platform</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#contact">Contact</a>
        </nav>

        <Link to="/login" className="btn btn-solid">
          Login
        </Link>
      </header>

      <main>
        <section className="hero" style={{ backgroundImage: 'url(/hero_new.png)' }}>
          <div className="hero-scrim" />

          <div className="hero-layout">
            <div className="hero-copy">
              <p className="hero-kicker">Intelligent Information Condensation System</p>
              <h1>From information overload to operational clarity.</h1>
              <p>
                IICS transforms scattered documents, logs, and updates into clear decision intelligence, so teams
                move faster with fewer blind spots.
              </p>

              <div className="hero-actions">
                <Link to="/login" className="btn btn-solid btn-large">
                  Launch Workspace
                </Link>
                <a href="#platform" className="btn btn-ghost btn-large">
                  Explore Platform
                </a>
              </div>

              <div className="hero-metrics">
                {metrics.map((metric) => (
                  <article className="metric-card" key={metric.label}>
                    <h3>{metric.value}</h3>
                    <p>{metric.label}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="hero-panel">
              <p className="panel-eyebrow">Live Signal Flow</p>
              <h2>One feed. Fewer gaps.</h2>
              <ul>
                <li>Ingest reports, PDFs, transcripts, and operational logs</li>
                <li>Extract topics, anomalies, and decision-level summaries</li>
                <li>Route insight to dashboards and stakeholder updates</li>
              </ul>
              <div className="panel-chip-row">
                <span>Evidence-linked</span>
                <span>Role-aware</span>
                <span>Audit-ready</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="story-section" id="platform">
          <article className="story-card">
            <div className="story-copy">
              <p className="story-label">Our Vision</p>
              <h2>Clarity should scale with complexity.</h2>
              <p>
                We are building an intelligence layer where teams can condense massive information streams into
                concise, trusted context for planning and execution.
              </p>
            </div>
            <figure className="story-media">
              <img src="/vision_ai.png" alt="AI visualization representing connected data intelligence" />
            </figure>
          </article>

          <article className="story-card story-card-reverse">
            <figure className="story-media">
              <img src="/mission_dashboard.png" alt="Dashboard interface showing condensed insights" />
            </figure>
            <div className="story-copy">
              <p className="story-label">Our Mission</p>
              <h2>Turn raw data into decisive action.</h2>
              <p>
                IICS helps operations, leadership, and analytics teams align around one source of truth, with
                summaries that remain faithful, searchable, and immediately useful.
              </p>
            </div>
          </article>
        </section>

        <section className="capabilities-section" id="capabilities">
          <div className="section-head">
            <p className="story-label">Core Capabilities</p>
            <h2>Built for high-velocity, high-stakes workflows.</h2>
          </div>

          <div className="capabilities-grid">
            {capabilities.map((capability) => (
              <article className="capability-card" key={capability.title}>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta-content">
            <h2>Make every document, update, and signal instantly actionable.</h2>
            <p>Move from fragmented reporting to confident, real-time decisions with IICS.</p>
          </div>
          <Link to="/login" className="btn btn-solid btn-large">
            Get Started
          </Link>
        </section>
      </main>

      <footer className="landing-footer" id="contact">
        <div className="footer-grid">
          <div>
            <p className="footer-brand">IICS</p>
            <p className="footer-copy">
              Intelligent Information Condensation System for teams that need speed, transparency, and precision.
            </p>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>+91 0000000000 / +91 0000000000</p>
            <p>hello@iics-global.tech</p>
            <p>IICS Global Headquarters, Tech Park</p>
          </div>

          <div className="footer-social">
            <h4>Follow</h4>
            <div className="social-icons">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="footer-note">IICS © {new Date().getFullYear()} . All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
