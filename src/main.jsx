import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Profile from './Components/Profile';
import ViewStory from './Components/ViewStory';
import PageNotFound from './Components/PageNotFound';
import Home from './Components/Home';

import './index.css';

// Define routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/profile', element: <Profile /> },
            { path: '/story/:userId/:id', element: <ViewStory source="story" /> },
            { path: '/highlight/:userId/:id', element: <ViewStory source="highlight" /> },
            { path: '/profile/:id', element: <Profile /> }
        ]
    },
    {
        path: '*',
        element: <PageNotFound />
    }
]);


// Mount the app
createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
