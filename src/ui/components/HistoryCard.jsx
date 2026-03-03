import React from 'react';

const HistoryCard = ({ title, content, artist, tags }) => {
    return (
        <div className="texture-paper rounded-sm p-8 shadow-xl border-stone-300 relative overflow-hidden group">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-stone-200/50 rotate-45 translate-x-6 -translate-y-6 border-b border-stone-300" />

            <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-serif text-walnut-wood leading-tight border-b-2 border-walnut-wood/20 pb-2">{title}</h3>
                {tags && (
                    <div className="flex space-x-1">
                        {tags.map(tag => (
                            <span key={tag} className="text-[8px] bg-walnut-wood/10 text-walnut-wood px-2 py-0.5 rounded-sm uppercase font-bold">{tag}</span>
                        ))}
                    </div>
                )}
            </div>

            <p className="text-stone-800 text-base leading-relaxed mb-8 font-serif italic first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                {content}
            </p>

            {artist && (
                <div className="flex items-center space-x-4 pt-6 border-t border-stone-300/50 italic">
                    <div className="w-12 h-12 texture-wood rounded-full flex items-center justify-center text-brass-metal border-2 border-brass-metal/50 shadow-md">
                        <span className="text-xl font-bold">{artist[0]}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] text-stone-500 uppercase tracking-widest font-sans not-italic font-bold">Crónica Actual</span>
                        <span className="text-sm font-bold text-walnut-wood font-serif">{artist}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryCard;
