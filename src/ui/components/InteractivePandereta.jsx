import React, { useState } from 'react';

/**
 * @component InteractivePandereta
 * @description Representación visual e interactiva de una pandereta gallega.
 * @param {Function} onStroke - Callback disparado al tocar una zona (ti, co, TA, ris).
 */
const InteractivePandereta = ({ onStroke }) => {
    const [activeZone, setActiveZone] = useState(null);

    const handleTouch = (zone) => {
        setActiveZone(zone);
        onStroke(zone);
        setTimeout(() => setActiveZone(null), 150);
    };

    return (
        <div className="relative w-full max-w-md mx-auto aspect-square select-none">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]">
                {/* Sombra de profundidad */}
                <circle cx="103" cy="103" r="95" className="fill-black opacity-20" />

                {/* Marco de Madera (Castaño/Nogal) */}
                <circle cx="100" cy="100" r="95" className="fill-walnut-wood stroke-brass-metal stroke-[3px]" />

                {/* Parche de Cuero */}
                <circle cx="100" cy="100" r="80"
                    className={`fill-leather-tan transition-all duration-150 ${activeZone === 'TA' ? 'brightness-110 scale-[0.98]' : ''}`}
                    onClick={() => handleTouch('TA')}
                    style={{ cursor: 'pointer' }}
                />

                {/* Ferreñas (Sonajas de Latón) */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                    const x = 100 + 88 * Math.cos((angle * Math.PI) / 180);
                    const y = 100 + 88 * Math.sin((angle * Math.PI) / 180);
                    return (
                        <g key={i} className="cursor-pointer group" onClick={() => handleTouch('ti')}>
                            <circle cx={x} cy={y} r="8" className="fill-brass-metal group-hover:fill-brass-shimmer transition-colors" />
                            <circle cx={x} cy={y} r="3" className="fill-white opacity-20" />
                        </g>
                    );
                })}

                {/* Zona del Pulgar (Superior) */}
                <path
                    d="M60 40 Q100 20 140 40"
                    fill="none"
                    stroke="transparent"
                    strokeWidth="20"
                    className="cursor-pointer"
                    onClick={() => handleTouch('co')}
                />
                <text x="100" y="32" textAnchor="middle" className="fill-walnut-wood opacity-30 text-[6px] font-bold uppercase pointer-events-none font-sans">Zona co (Pulgar)</text>

                {/* Efecto de Impacto Central (TA) */}
                {activeZone === 'TA' && (
                    <g className="pointer-events-none">
                        <circle cx="100" cy="100" r="20" fill="none" stroke="white" strokeWidth="2" className="animate-impact" />
                    </g>
                )}

                {/* Texto decorativo central */}
                <text x="100" y="110" textAnchor="middle" className="fill-walnut-wood opacity-10 text-[6px] font-serif uppercase tracking-widest pointer-events-none select-none">Fase Artesanía Dixital</text>
            </svg>

            {/* Botón de Riscado flotante (Lateral) */}
            <button
                onClick={() => handleTouch('ris')}
                className={`absolute -right-4 bottom-1/4 btn-touch bg-brass-metal text-walnut-wood border-2 border-walnut-wood font-bold italic shadow-lg transition-all ${activeZone === 'ris' ? 'scale-90 rotate-12 bg-white' : 'hover:scale-105 active:scale-95'}`}
            >
                ris
            </button>

            {/* Etiquetas de ayuda visual */}
            <div className="absolute top-0 left-0 text-[10px] text-brass-metal/50 uppercase tracking-tighter">
                Toca el centro para TA • Borde para ti • Arriba para co
            </div>
        </div>
    );
};

export default InteractivePandereta;
