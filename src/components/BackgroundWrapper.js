import React from 'react';
import '../App.css';

const BackgroundWrapper = ({ children }) => {
    return (
        <div className="portfolio-container">
            {/* 1. The Background Layers (Static) */}
            <div className="bg-image"></div>
            <div className="scanlines"></div>
            <div className="vignette"></div>

            {/* 2. The Dynamic Page Content */}
            <div className="content-wrapper">
                {children}
            </div>
        </div>
    );
};

export default BackgroundWrapper;