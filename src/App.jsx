import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Components/Sidebar';

export default function App() {
    return (
        <div className="d-flex">
            {/* Sidebar fixed on the left */}
            <Sidebar />

            {/* Content area adjusts based on sidebar width */}
            <div className="flex-grow-1 ms-0" style={{ marginLeft: '250px' }}>
                <Outlet />
            </div>
        </div>
    );
}
