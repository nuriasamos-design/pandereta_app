import React from 'react';

const RhythmButton = ({ type, onClick, active }) => {
    const styles = {
        ti: 'bg-stone-700 border-pandereta-gold/30',
        co: 'bg-stone-800 border-pandereta-gold/20',
        TA: 'bg-organic-leather border-pandereta-gold text-white shadow-[0_0_15px_rgba(139,69,19,0.3)]',
        ris: 'bg-organic-wood border-stone-500 italic',
    };

    const labels = {
        ti: 'ti (adelante)',
        co: 'co (pulgar)',
        TA: 'TA (puño/fuerte)',
        ris: 'ris (riscado)'
    };

    return (
        <button
            onClick={() => onClick(type)}
            className={`btn-touch border-2 flex flex-col items-center justify-center p-4 min-w-[120px] min-h-[120px] text-sm font-bold uppercase tracking-widest ${styles[type]} ${active ? 'scale-95 ring-2 ring-pandereta-gold' : 'hover:border-pandereta-gold'}`}
        >
            <span className="text-2xl mb-2">{type === 'TA' ? '🔨' : type === 'ris' ? '🌀' : '🤚'}</span>
            <span>{labels[type]}</span>
        </button>
    );
};

export default RhythmButton;
