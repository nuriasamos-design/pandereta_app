import React from 'react';

const IconStrokeCo = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className}>
        {/* Representación de pulgar */}
        <path d="M30 70 Q30 30 50 30 Q70 30 70 70" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <path d="M45 30 L55 30" fill="none" stroke="currentColor" strokeWidth="4" />
        <circle cx="50" cy="55" r="8" fill="currentColor" opacity="0.3" />
    </svg>
);

export default IconStrokeCo;
