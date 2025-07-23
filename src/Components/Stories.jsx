// src/Components/Stories.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Static/Stories.css';

export default function Stories({ stories }) {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/story/${stories.length}/${id}`);
    };

    return (
        <div className="story-bar d-flex overflow-auto mb-4">
            {stories.map((story) => (
                <div
                    className="story-item text-center me-3"
                    key={story.id}
                    onClick={() => handleClick(story.id)}
                >
                    <div className="story-ring-wrapper">
                        <img
                            src={story.user.profile_pic}
                            alt={story.user.username}
                            className="story-img"
                        />
                    </div>
                    <small className="story-username d-block text-truncate">
                        {story.user.username}
                    </small>
                </div>
            ))}
        </div>
    );
}

