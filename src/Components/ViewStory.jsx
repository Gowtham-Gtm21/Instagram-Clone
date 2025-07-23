import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../Static/ViewStory.css';
import instaLogo from '/icons/insta-text-white.png';

export default function ViewStory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [stories, setStories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);

    const isHighlight = location.pathname.includes('/highlight');
    const backPath = location.state?.from || (isHighlight ? '/profile' : '/');

    const handleClose = () => navigate(backPath);

    useEffect(() => {
        const endpoint = isHighlight ? 'highlight' : 'story';
        fetch(`https://json-server-okp7.onrender.com/${endpoint}`)
            .then(res => res.json())
            .then(data => {
                setStories(data);
                const idx = data.findIndex(story => String(story.id) === id);
                setCurrentIndex(idx !== -1 ? idx : 0);
            });
    }, [id, isHighlight]);

    const handleNext = () => {
        if (currentIndex < stories.length - 1) {
            const next = stories[currentIndex + 1];
            navigate(`/${isHighlight ? 'highlight' : 'story'}/${next.user.id}/${next.id}`, {
                state: { from: backPath }
            });
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            const prev = stories[currentIndex - 1];
            navigate(`/${isHighlight ? 'highlight' : 'story'}/${prev.user.id}/${prev.id}`, {
                state: { from: backPath }
            });
        }
    };

    if (currentIndex === null || !stories[currentIndex]) return null;

    const current = stories[currentIndex];

    return (
        <div className="story-viewer">
            <img src={instaLogo} alt="Instagram" className="story-logo" />
            <button className="close-btn" onClick={handleClose}>×</button>

            {currentIndex > 0 && (
                <div className="arrow left" onClick={handlePrev}>&#8249;</div>
            )}

            <div className="story-content">
                <div className="story-header">
                    <div className="user-info text-light">
                        <img src={current.user.profile_pic} alt="user" />
                        <span>{current.user.username}</span>
                        <span className="story-time">2h</span>
                    </div>
                    <i className="bi bi-three-dots-vertical menu-icon"></i>
                </div>

                <div className="story-image-wrapper">
                    <img src={current.image} alt="story" className="story-view-img" />
                    <div className="image-dark-overlay"></div>
                </div>

                <div className="story-reply">
                    <input
                        type="text"
                        placeholder={`Reply to ${current.user.username}...`}
                    />
                    <i className="bi bi-heart"></i>
                    <i className="bi bi-send"></i>
                </div>
            </div>

            {currentIndex < stories.length - 1 && (
                <div className="arrow right" onClick={handleNext}>&#8250;</div>
            )}
        </div>
    );
}

