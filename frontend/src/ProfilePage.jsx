import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    BriefcaseBusiness,
    CalendarDays,
    IdCard,
    Mail,
    ShieldCheck,
    Sparkles,
    UserRound,
} from 'lucide-react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { getCurrentUser } from './services/api';
import profilePageStyles from './ProfilePage.css?raw';

const roleAccessMap = {
    Admin: ['Platform Control', 'Access Management', 'Security Oversight', 'Owner'],
    Manager: ['Operations Review', 'Task Routing', 'Document Governance'],
    Engineer: ['Contributor Workspace', 'Document Access', 'Execution Tracking'],
};

const formatDate = (dateValue) => {
    if (!dateValue) {
        return 'Not available';
    }

    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime())) {
        return 'Not available';
    }

    return parsedDate.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        const fetchProfile = async () => {
            try {
                const user = await getCurrentUser();
                if (isMounted) {
                    setProfile(user);
                }
            } catch (fetchError) {
                if (isMounted) {
                    setError(fetchError.message || 'Unable to load profile.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProfile();

        return () => {
            isMounted = false;
        };
    }, []);

    const accessRoles = useMemo(() => {
        if (!profile?.role) {
            return ['Workspace Member'];
        }

        return roleAccessMap[profile.role] || ['Workspace Member'];
    }, [profile]);

    const renderStateCard = (title, subtitle) => (
        <div className="profile-page">
            <style>{profilePageStyles}</style>
            <Header />
            <main className="profile-main-content">
                <div className="profile-feedback-card">
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                    <Link to="/dashboard" className="profile-outline-btn">
                        <ArrowLeft size={16} />
                        <span>Back to Dashboard</span>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );

    if (loading) {
        return renderStateCard('Loading profile...', 'Fetching your account details.');
    }

    if (error || !profile) {
        return renderStateCard('Profile unavailable', error || 'Unable to load account details.');
    }

    return (
        <div className="profile-page">
            <style>{profilePageStyles}</style>
            <Header />

            <main className="profile-main-content">
                <section className="profile-overview-panel">
                    <div className="profile-overview-copy">
                        <p className="profile-kicker">Operations Intelligence Hub</p>
                        <h1>{profile.name}</h1>
                        <p>
                            Manage your account identity, role privileges, and profile metadata synced from your
                            authenticated workspace.
                        </p>
                    </div>

                    <div className="profile-overview-actions">
                        <Link to="/dashboard" className="profile-outline-btn">
                            <ArrowLeft size={16} />
                            <span>Back</span>
                        </Link>
                    </div>
                </section>

                <section className="profile-content-grid">
                    <article className="profile-details-card">
                        <div className="profile-card-header">
                            <h2>Personal Info</h2>
                            <p>Live account information from your user profile.</p>
                        </div>

                        <div className="profile-info-grid">
                            <div className="profile-info-item">
                                <span className="profile-info-label">
                                    <UserRound size={16} /> Name
                                </span>
                                <span className="profile-info-value">{profile.name || 'Not available'}</span>
                            </div>

                            <div className="profile-info-item">
                                <span className="profile-info-label">
                                    <Mail size={16} /> Email
                                </span>
                                <span className="profile-info-value">{profile.email || 'Not available'}</span>
                            </div>

                            <div className="profile-info-item">
                                <span className="profile-info-label">
                                    <BriefcaseBusiness size={16} /> Role
                                </span>
                                <span className="profile-info-value">{profile.role || 'Not available'}</span>
                            </div>

                            <div className="profile-info-item">
                                <span className="profile-info-label">
                                    <IdCard size={16} /> Account ID
                                </span>
                                <span className="profile-info-value">{profile._id || 'Not available'}</span>
                            </div>

                            <div className="profile-info-item">
                                <span className="profile-info-label">
                                    <CalendarDays size={16} /> Joined
                                </span>
                                <span className="profile-info-value">{formatDate(profile.createdAt)}</span>
                            </div>

                            <div className="profile-info-item">
                                <span className="profile-info-label">
                                    <CalendarDays size={16} /> Last Updated
                                </span>
                                <span className="profile-info-value">{formatDate(profile.updatedAt)}</span>
                            </div>
                        </div>
                    </article>

                    <aside className="profile-access-card">
                        <div className="profile-card-header">
                            <h2>Access Scope</h2>
                            <p>Role-driven capabilities currently granted to your account.</p>
                        </div>

                        <div className="profile-access-tags">
                            {accessRoles.map((role) => (
                                <span key={role} className={`profile-access-tag ${role === 'Owner' ? 'owner' : ''}`}>
                                    {role === 'Owner' ? <ShieldCheck size={14} /> : <Sparkles size={14} />}
                                    <span>{role}</span>
                                </span>
                            ))}
                        </div>
                    </aside>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ProfilePage;
