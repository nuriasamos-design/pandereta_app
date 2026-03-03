import React from 'react';

const IconStrokeTA = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className}>
        {/* Parche base */}
        <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.1" />
        {/* Onda de impacto */}
        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" className="animate-ping" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="3" />
        {/* Representación de puño central */}
        <path d="M40 45 Q50 35 60 45 L60 60 Q50 70 40 60 Z" fill="currentColor" />
    </svg>
);

export default IconStrokeTA;
