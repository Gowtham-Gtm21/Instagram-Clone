import React, { useEffect, useState } from 'react';
import Stories from './Stories';
import PostCard from './PostCard';
import Suggestions from './Suggestion';
import '../Static/Home.css';

export default function Home() {
    const [stories, setStories] = useState([]);
    const [postcards, setPostcards] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/story')
            .then(res => res.json())
            .then(data => setStories(data))
            .catch(err => console.error("Error fetching stories:", err));

        fetch('http://localhost:3000/postcards')
            .then(res => res.json())
            .then(data => setPostcards(data))
            .catch(err => console.error("Error fetching postcards:", err));
    }, []);

    return (
        <div className="home-container">
            {/* Feed Section */}
            <div className="feed-section">
                <Stories stories={stories} />

                {postcards.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {/* Suggestions Sidebar */}
            <div className="suggestions-section">
                <Suggestions />
            </div>
        </div>
    );
}

