import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../Static/Profile.css';
import Sidebar from './Sidebar';
import Followers from './Followers';

function Profile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [post, setPost] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [highlights, setHighlights] = useState([]);
    const [activeTab, setActiveTab] = useState('post');
    const [showFollowers, setShowFollowers] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://json-server-okp7.onrender.com/profile')
            .then(res => res.json())
            .then(setProfile);

        fetch('https://json-server-okp7.onrender.com/post')
            .then(res => res.json())
            .then(data => setPost(data.filter(p => p.user.id === 101)));

        fetch('https://json-server-okp7.onrender.com/followers')
            .then(res => res.json())
            .then(setFollowers);

        fetch('https://json-server-okp7.onrender.com/highlight')
            .then(res => res.json())
            .then(data => setHighlights(data.slice(0, 3)));
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="profile-page">
            <Sidebar />

            {/* Profile top section */}
            <div className="profile-top-section d-flex justify-content-center">
                <div className="profile-image">
                    <img src={profile.profile_pic} alt="profile" />
                </div>
                <div className="profile-main-info">
                    <div className="d-flex align-items-center gap-3">
                        <h4>{profile.username}</h4>
                        <button className="btn btn-light btn-sm">Edit profile</button>
                        <button className="btn btn-light btn-sm">View archive</button>
                        <i className="bi bi-gear fs-5" />
                    </div>
                    <div className="d-flex follow-data gap-4 mt-2">
                        <span><b>{post.length}</b> post</span>
                        <span className="followers-link" onClick={() => setShowFollowers(true)}>
                            <b>{followers.length}</b> followers
                        </span>
                        <span><b>164</b> following</span>
                    </div>
                    <div className="mt-2">
                        <strong className="text-dark">{profile.nickname}</strong>
                        <div className="bio">I'm Kung Fu Panda 🐼✨</div>
                        <div className="bio">Fullstack Developer 🧠👨‍💻</div>
                        <div className="bio">React Developer 🚀</div>
                    </div>
                </div>
            </div>

            {/* Highlights */}
            <div className="highlights-container my-4 d-flex gap-5 justify-content-center">
                {highlights.map((h, i) => (
                    <div
                        key={i}
                        className="highlight text-center cursor-pointer"
                        onClick={() => navigate(`/highlight/${h.user.id}/${h.id}`, { state: { from: '/profile' } })}
                    >
                        <div className="highlight-ring">
                            <img src={h.user.profile_pic} alt="highlight" />
                        </div>
                        <div className="highlight-name">{h.user.username}</div>
                    </div>
                ))}
                <div className="highlight new text-center">
                    <div className="highlight-ring circle d-flex align-items-center justify-content-center">+</div>
                    <div className="highlight-name">New</div>
                </div>
            </div>

            <hr className="mx-auto" style={{ width: '50%' }} />

            {/* Tabs */}
            <div className="profile-tabs mt-2 d-flex justify-content-center gap-3 pt-3">
                {['post', 'saved', 'tagged'].map(tab => (
                    <div
                        key={tab}
                        className={`tab d-flex gap-1 align-items-center ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'post' && <i className="bi bi-grid-3x3-gap-fill" />}
                        {tab === 'saved' && <i className="bi bi-bookmark" />}
                        {tab === 'tagged' && <i className="bi bi-person-square" />}
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </div>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'post' && (
                post.length > 0 ? (
                    <div className="profile-posts-grid">
                        {post.map(p => (
                            <img key={p.id} src={p.image} alt={p.caption} className="profile-post-img" />
                        ))}
                    </div>
                ) : (
                    <div className="empty-post-placeholder text-center mt-5">
                        <i className="bi bi-camera" />
                        <h4 className="mt-4 fw-bold">Share Photos</h4>
                        <p className="text-muted">When you share photos, they will appear on your profile.</p>
                        <a href="#" className="text-primary fw-medium text-decoration-none">Share your first photo</a>
                    </div>
                )
            )}

            {activeTab !== 'post' && (
                <div className="empty-tab-placeholder text-center mt-5">
                    <i className="bi bi-image" />
                    <h5 className="mt-4 fw-bold">No {activeTab} yet</h5>
                </div>
            )}

            {/* Followers modal */}
            {showFollowers && (
                <Followers followers={followers} onClose={() => setShowFollowers(false)} />
            )}
        </div>
    );
}

export default Profile;
