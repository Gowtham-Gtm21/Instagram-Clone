import React from 'react';
import { useNavigate } from 'react-router-dom';
import errorIcon from '/icons/error.png';
import '../Static/PageNotFound.css';

export default function PageNotFound() {
    const navigate = useNavigate();

    return (
        <div className="not-found-container d-flex flex-column align-items-center justify-content-center">

            <div className='d-flex gap-4'>
                <img src={errorIcon} alt="Page not found" className="not-found-img mb-4" />
                <h2 className="display-1 fw-bold text-secondary">404</h2>
            </div>

            <h4 className="fw-semibold text-center">Sorry, this page isn't available.</h4>

            <p className="text-secondary text-center fw-semibold mt-2">
                I plan to update this component.
            </p>

            <p className="text-secondary text-center fw-semibold">
                Currently, I've built only the <span className='text-dark fw-bold'>Home</span> and <span className='text-dark fw-bold'>Profile</span> components.
            </p>

            <button className="btn btn-primary mt-2" onClick={() => navigate('/')}>
                Go back to Home
            </button>
        </div>
    );
}
