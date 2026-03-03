import React from 'react';

const SongCard = ({ title, genre, region, lyrics }) => {
    const getGenreIcon = (g) => {
        if (g.includes('Muiñeira')) return '🌀';
        if (g.includes('Jota')) return '💃';
        if (g.includes('Maneo')) return '🤚';
        return '🎵';
    };

    const getRegionIcon = (r) => {
        if (r.includes('Bergantiños')) return '🏔️';
        if (r.includes('Costa')) return '🌊';
        return '📍';
    };

    return (
        <div className="texture-paper rounded-lg p-6 shadow-lg border-l-8 border-walnut-wood hover:translate-y-[-4px] transition-transform">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-xl font-serif text-walnut-wood font-bold">{title}</h4>
                    <div className="flex space-x-2 mt-1">
                        <span className="text-[10px] font-bold text-brass-metal uppercase tracking-tighter flex items-center">
                            {getGenreIcon(genre)} {genre}
                        </span>
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-tighter flex items-center">
                            {getRegionIcon(region)} {region}
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-stone-100/50 p-4 rounded border border-stone-200 italic text-stone-700 text-sm leading-relaxed font-serif">
                {lyrics.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
        </div>
    );
};

export default SongCard;
