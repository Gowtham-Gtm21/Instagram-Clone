// src/Components/PostCard.jsx
import React, { useState } from 'react';
import '../Static/PostCard.css';

import heart from '/icons/heart.png';
import love from '/icons/love.png';
import chat from '/icons/comment.png';
import send from '/icons/send.png';
import bookmark from '/icons/bookmark.png';
import bookmarkFilled from '/icons/bookmark-dark.png';

export default function PostCard({ post }) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    const toggleLike = () => setLiked(prev => !prev);
    const toggleSave = () => setSaved(prev => !prev);

    return (
        <div className="postcard">
            {/* Header */}
            <div className="postcard-header">
                <div className="user-info">
                    <img src={post.user.profile_pic} alt={post.user.username} className="user-avatar" />
                    <span className="username">{post.user.username}</span>
                </div>
                <i className="bi bi-three-dots-vertical options-icon"></i>
            </div>

            {/* Main Image */}
            <div className="postcard-image">
                <img src={post.image} alt="Post" />
            </div>

            {/* Action Bar */}
            <div className="postcard-actions">
                <div className="left-actions">
                    <img src={liked ? love : heart} alt="Like" className="icon-btn" onClick={toggleLike} />
                    <img src={chat} alt="Comment" className="icon-btn" />
                    <img src={send} alt="Share" className="icon-btn" />
                </div>
                <img src={saved ? bookmarkFilled : bookmark} alt="Save" className="icon-btn" onClick={toggleSave} />
            </div>

            {/* Like Count */}
            <div className="postcard-likes">
                {liked ? post.likes + 1 : post.likes} likes
            </div>

            {/* Caption */}
            <div className="postcard-caption">
                <span className="username">{post.user.username}</span> {post.caption}
            </div>

            {/* Comments */}
            <div className="postcard-comments">
                {post.comments?.length > 0 && (
                    <div className="view-comments">View all {post.comments.length} comments</div>
                )}
                {post.comments?.slice(0, 2).map((comment, index) => (
                    <div className="comment" key={index}>
                        <span className="username">{comment.user}</span> {comment.comment}
                    </div>
                ))}
            </div>

            {/* Add Comment */}
            <div className="postcard-add-comment">
                <input type="text" placeholder="Add a comment..." />
                <button>Post</button>
            </div>
        </div>
    );
}
