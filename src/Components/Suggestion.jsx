import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Static/Suggestion.css';

function Suggestion() {
    const [profile, setProfile] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [followingIds, setFollowingIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://json-server-okp7.onrender.com/profile')
            .then(res => res.json())
            .then(setProfile);

        fetch('https://json-server-okp7.onrender.com/suggestions')
            .then(res => res.json())
            .then(data => setSuggestions(data.slice(0, 7)));
    }, []);

    const toggleFollow = (user) => {
        const isFollowing = followingIds.includes(user.id);
        if (!isFollowing) {
            axios.post('https://json-server-okp7.onrender.com/followers', {
                id: user.id,
                username: user.username,
                profile_pic: user.profile_pic
            }).then(() => setFollowingIds([...followingIds, user.id]));
        } else {
            setFollowingIds(followingIds.filter(id => id !== user.id));
        }
    };

    const handleProfileClick = (userId) => {
        navigate(`/profile/${userId}`);
    };

    return (
        <div className="suggestion-box">
            {/* Current User */}
            {profile && (
                <div className="suggestion-profile">
                    <div className="profile-info" onClick={() => handleProfileClick(profile.id)}>
                        <img className="avatar" src={profile.profile_pic} alt="dp" />
                        <div className="user-block">
                            <div className="username">{profile.username}</div>
                            <div className="nickname">{profile.nickname || 'Your Account'}</div>
                        </div>
                    </div>
                    <span className="switch-link">Switch</span>
                </div>
            )}

            {/* Header */}
            <div className="suggestion-header">
                <span className="muted-text">Suggested for you</span>
                <span className="see-all">See All</span>
            </div>

            {/* Suggested Users */}
            <div className="suggestion-list">
                {suggestions.map(user => (
                    <div className="suggestion-item" key={user.id}>
                        <div className="profile-info">
                            <img className="avatar" src={user.profile_pic} alt="dp" />
                            <div className="user-block">
                                <div className="username">{user.username}</div>
                                <div className="extra-small">Followed by heisenberg + 3 more</div>
                            </div>
                        </div>
                        <span
                            className={`follow-text ${followingIds.includes(user.id) ? 'following' : ''}`}
                            onClick={() => toggleFollow(user)}
                        >
                            {followingIds.includes(user.id) ? 'Following' : 'Follow'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Suggestion;
