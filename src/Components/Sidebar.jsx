// src/Components/Sidebar.jsx
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import instaLogo from '/icons/insta-text.png';
import instaLogo2 from '/icons/insta.png';
import homeIcon from '/icons/home.png';
import searchIcon from '/icons/search.png';
import exploreIcon from '/icons/social.png';
import reelsIcon from '/icons/video.png';
import messageIcon from '/icons/messenger.png';
import notificationIcon from '/icons/heart.png';
import createIcon from '/icons/more.png';
import profileIcon from '/icons/user.png';
import threadIcon from '/icons/threads.png';
import moreIcon from '/icons/hamburger.png';

import '../Static/Sidebar.css';

export default function Sidebar() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetch('https://json-server-okp7.onrender.com/profile')
            .then((res) => res.json())
            .then((data) => setProfile(data));
    }, []);

    const topMenu = [
        { to: '/', icon: homeIcon, label: 'Home' },
        { to: '/search', icon: searchIcon, label: 'Search' },
        { to: '/explore', icon: exploreIcon, label: 'Explore' },
        { to: '/reels', icon: reelsIcon, label: 'Reels' },
        { to: '/direct', icon: messageIcon, label: 'Messages' },
        { to: '/activity', icon: notificationIcon, label: 'Notifications' },
        { to: '/create', icon: createIcon, label: 'Create' },
        { to: '/profile', icon: profile?.profile_pic || profileIcon, label: 'Profile' },
    ];

    const bottomMenu = [
        { to: '/threads', icon: threadIcon, label: 'Threads' },
        { to: '/more', icon: moreIcon, label: 'More' },
    ];

    return (
        <aside className="ig-sidebar d-flex flex-column justify-content-between p-2">
            <div>
                <div className="logo my-4">
                    <img src={instaLogo} alt="Instagram" className="img-fluid ig-logo-full" />
                    <img src={instaLogo2} alt="Instagram" className="img-fluid ig-logo-small" />
                </div>

                <ul className="nav flex-column">
                    {topMenu.map(({ to, icon, label }) => (
                        <li className="nav-item mb-2" key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `ig-nav-item d-flex align-items-center rounded ${isActive ? 'active' : ''
                                    }`
                                }
                            >
                                <img
                                    src={label === 'Profile' && profile?.profile_pic ? profile.profile_pic : icon}
                                    alt={label}
                                    className={`sidebar-icon ${label === 'Profile' ? 'profile-circle' : ''}`}
                                />
                                <span className="ms-3">{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <ul className="nav flex-column">
                    {bottomMenu.map(({ to, icon, label }) => (
                        <li className="nav-item mb-2" key={to}>
                            <NavLink
                                to={to}
                                className="ig-nav-item d-flex align-items-center rounded"
                            >
                                <img src={icon} alt={label} className="sidebar-icon" />
                                <span className="ms-3">{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

