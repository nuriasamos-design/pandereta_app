import React from 'react';

const InstrumentCard = ({ type, diameter, height, material, color }) => {
    return (
        <div className="bg-stone-800 border-t-4 border-pandereta-gold rounded-xl p-6 shadow-md">
            <h4 className="text-pandereta-gold font-bold uppercase tracking-widest text-xs mb-2">Modelo {type}</h4>
            <div className="grid grid-cols-2 gap-4 text-stone-300">
                <div>
                    <span className="block text-[10px] text-stone-500 uppercase">Diámetro</span>
                    <span className="text-lg font-serif">{diameter}mm</span>
                </div>
                <div>
                    <span className="block text-[10px] text-stone-500 uppercase">Altura</span>
                    <span className="text-lg font-serif">{height}mm</span>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-700">
                <span className="block text-[10px] text-stone-500 uppercase mb-2">Construcción</span>
                <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${color}`} />
                    <span className="text-sm">{material}</span>
                </div>
            </div>
        </div>
    );
};

export default InstrumentCard;
