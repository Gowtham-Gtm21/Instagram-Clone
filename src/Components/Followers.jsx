import React from 'react';
import '../Static/Followers.css';

export default function Followers({ followers, onClose }) {
    const handleRemove = async (id, username) => {
        const confirmDelete = window.confirm(`Are you sure you want to remove ${username}?`);
        if (!confirmDelete) return;

        try {
            await fetch(`https://json-server-okp7.onrender.com/followers/${id}`, {
                method: 'DELETE',
            });
            alert(`${username} removed successfully.`);
            window.location.reload(); // Reload to reflect changes
        } catch (err) {
            console.error("Error removing follower:", err);
            alert("Failed to remove follower.");
        }
    };

    return (
        <div className="followers-modal-overlay">
            <div className="followers-modal">
                {/* Header */}
                <div className="followers-header d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                    <h5 className="fw-semibold m-0">Followers</h5>
                    <i className="bi bi-x-lg" onClick={onClose} style={{ cursor: 'pointer' }} />
                </div>

                {/* Search input (optional, non-functional) */}
                <div className="followers-search px-3 py-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                    />
                </div>

                {/* Followers list */}
                <div className="followers-list px-3">
                    {followers.map(follower => (
                        <div
                            key={follower.id}
                            className="follower-item d-flex justify-content-between align-items-center py-2"
                        >
                            <div className="d-flex align-items-center gap-2">
                                <img
                                    src={follower.profile_pic}
                                    alt="profile"
                                    className="follower-img"
                                />
                                <div>
                                    <div className="fw-bold">{follower.username}</div>
                                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>{follower.name}</div>
                                </div>
                            </div>
                            <button
                                className="btn btn-outline-dark btn-sm"
                                onClick={() => handleRemove(follower.id, follower.username)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
