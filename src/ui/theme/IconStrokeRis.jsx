import React from 'react';

const IconStrokeRis = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className}>
        {/* Estelas de movimiento */}
        <path d="M20 50 Q50 20 80 50" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5,5" opacity="0.6">
            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
        </path>
        <path d="M20 60 Q50 30 80 60" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4">
            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="0.8s" repeatCount="indefinite" />
        </path>
        {/* Representación de vibración */}
        <circle cx="50" cy="40" r="10" fill="currentColor" />
    </svg>
);

export default IconStrokeRis;
