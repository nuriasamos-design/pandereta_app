import React, { useState, useMemo } from 'react';

const MonolinealScore = ({ sequence }) => {
    if (!sequence || sequence.length === 0) return null;

    const H = 100;           // altura total del SVG aumentada
    const LINE_Y = 40;      // y de la línea staff
    const BEAM_Y = 85;      // y de los corchetes (abajo)
    const X0 = 60;          // inicio de las notas
    const STEP = 36;        // separación entre notas
    const NOTE_R = 6;       // radio cabeza de nota
    const W = X0 + sequence.length * STEP + 40;

    // Colores según estándar (Blanco roto para Ti-Co, Azul para Tumm-Trr)
    const getColor = (g) => (g === 'tumm' || g === 'trr') ? '#2563eb' : '#f9fafb';

    // Posición vertical de las etiquetas de texto (arriba o abajo)
    const getLabelY = (g) => (g === 'co') ? LINE_Y + 32 : LINE_Y - 28;

    // Posición vertical de la cabeza según el golpe
    const noteY = (g) => {
        if (g === 'co') return LINE_Y + 12; // debajo
        return LINE_Y - 12;                 // ti, tumm y trr arriba
    };

    // Agrupa en racimos para dibujar el corchete de grupo de 4
    const groups = [];
    for (let i = 0; i < sequence.length; i += 4) {
        groups.push(sequence.slice(i, i + 4));
    }

    return (
        <svg
            width={Math.max(W, 280)}
            height={H}
            viewBox={`0 0 ${Math.max(W, 280)} ${H}`}
            className="w-full overflow-x-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
            {/* Clave de percusión: doble barra vertical */}
            <line x1={18} y1={LINE_Y - 15} x2={18} y2={LINE_Y + 15} stroke="#b8860b" strokeWidth={2} />
            <line x1={23} y1={LINE_Y - 15} x2={23} y2={LINE_Y + 15} stroke="#b8860b" strokeWidth={2} />

            {/* Compás indicador */}
            <text x={30} y={LINE_Y - 2} fill="#b8860b" fontSize={14} fontWeight="bold">2</text>
            <text x={30} y={LINE_Y + 14} fill="#b8860b" fontSize={14} fontWeight="bold">4</text>

            {/* Línea Staff única */}
            <line
                x1={48} y1={LINE_Y}
                x2={W - 10} y2={LINE_Y}
                stroke="rgba(184,134,11,0.4)" strokeWidth={1.5}
            />

            {/* Corchetes de grupos de 4 notas (ABAJO, en claro) */}
            {groups.map((grp, gi) => {
                const startX = X0 + gi * 4 * STEP;
                const endX = startX + (grp.length - 1) * STEP;
                return (
                    <line
                        key={`beam-${gi}`}
                        x1={startX + NOTE_R - 1} y1={BEAM_Y}
                        x2={endX + NOTE_R - 1} y2={BEAM_Y}
                        stroke="#f9fafb" strokeWidth={3}
                    />
                );
            })}

            {/* Notas individuales */}
            {sequence.map((g, i) => {
                const x = X0 + i * STEP;
                const y = noteY(g);
                const color = getColor(g);
                const isTrr = g === 'trr';

                return (
                    <g key={i}>
                        {/* Etiqueta (arriba o abajo según el golpe) */}
                        <text
                            x={x} y={getLabelY(g)}
                            textAnchor="middle"
                            fontSize={10}
                            fontWeight="bold"
                            fill={color}
                        >
                            {g}
                        </text>

                        {/* Cabeza de nota */}
                        <ellipse
                            cx={x} cy={y}
                            rx={NOTE_R + 1} ry={NOTE_R - 1}
                            fill={color}
                            transform={`rotate(-15, ${x}, ${y})`}
                            stroke={g === 'ti' || g === 'co' ? 'rgba(0,0,0,0.35)' : 'transparent'}
                            strokeWidth={g === 'ti' || g === 'co' ? 1 : 0}
                        />

                        {/* Plica (stem) - BAJA hasta el corchete usando color de nota */}
                        <line
                            x1={x + (NOTE_R - 1)} y1={y}
                            x2={x + (NOTE_R - 1)} y2={BEAM_Y}
                            stroke={color} strokeWidth={1.2}
                        />

                        {/* Marcas de Riscado (doble barra azul en la plica) */}
                        {isTrr && (
                            <g transform={`translate(${x + NOTE_R - 1}, ${(y + BEAM_Y) / 2})`}>
                                <line x1={-5} y1={-2} x2={5} y2={2} stroke={color} strokeWidth={2} />
                                <line x1={-5} y1={2} x2={5} y2={6} stroke={color} strokeWidth={2} />
                            </g>
                        )}
                    </g>
                );
            })}

            {/* Barras de compás (divisorias) */}
            {sequence.map((_, i) => i > 0 && i % 4 === 0 && (
                <line
                    key={`bar-${i}`}
                    x1={X0 + i * STEP - STEP / 2}
                    y1={LINE_Y - 20}
                    x2={X0 + i * STEP - STEP / 2}
                    y2={BEAM_Y + 5}
                    stroke="rgba(184,134,11,0.25)" strokeWidth={1}
                />
            ))}
        </svg>
    );
};

export default MonolinealScore;
