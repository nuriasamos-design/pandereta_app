import React from 'react';

const IconStrokeTi = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className}>
        {/* Flecha hacia afuera/adelante */}
        <path d="M50 80 V20 M35 35 L50 20 L65 35" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="85" r="5" fill="currentColor" />
    </svg>
);

export default IconStrokeTi;
