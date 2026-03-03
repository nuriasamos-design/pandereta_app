import React, { useState } from 'react';
import InteractivePandereta from './InteractivePandereta';

const RhythmEditor = () => {
    const [sequence, setSequence] = useState([]);

    const addStroke = (type) => {
        setSequence([...sequence, type]);
    };

    const clear = () => setSequence([]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Visualización Monolineal - Estética Cuero */}
            <div className="space-y-6">
                <div className="texture-leather rounded-3xl p-10 shadow-2xl relative min-h-[400px] flex flex-col">
                    <h2 className="text-3xl font-serif text-walnut-wood mb-4 border-b border-walnut-wood/20 pb-2 uppercase tracking-widest">Notación de Campo</h2>

                    <div className="flex-1 flex flex-col justify-center relative">
                        {/* Guía monolineal elegante */}
                        <div className="absolute w-full h-[1px] bg-walnut-wood/30 top-1/2 -translate-y-1/2" />

                        <div className="flex flex-wrap gap-x-10 gap-y-20 z-10 w-full px-4 py-12 justify-center">
                            {sequence.map((stroke, i) => (
                                <div key={i} className="relative flex flex-col items-center group animate-fadeIn">
                                    {/* Note Head - Technical notation symbols */}
                                    <div className={`
                                        w-10 h-10 flex items-center justify-center font-bold text-2xl
                                        ${stroke === 'TA' ? 'text-walnut-wood' : 'text-walnut-wood/80'}
                                        transition-all duration-300 transform
                                        ${stroke === 'ti' ? '-translate-y-12' : ''}
                                        ${stroke === 'co' ? 'translate-y-12' : ''}
                                    `}>
                                        {stroke === 'TA' ? '✕' : stroke === 'ris' ? '🌀' : '●'}
                                    </div>

                                    <span className="absolute -bottom-8 text-[10px] font-bold uppercase tracking-widest text-walnut-wood/50 font-sans">
                                        {stroke}
                                    </span>

                                    {/* Bar divider for 6/8 */}
                                    {(i + 1) % 3 === 0 && (
                                        <div className="ml-6 h-24 w-[2px] bg-walnut-wood/20 self-center rounded-full" />
                                    )}
                                </div>
                            ))}
                            {sequence.length === 0 && (
                                <div className="text-center space-y-2">
                                    <p className="text-walnut-wood/40 italic font-serif text-xl">Toca la pandereta para registrar un ritmo...</p>
                                    <p className="text-[10px] text-walnut-wood/30 uppercase tracking-[0.3em]">Métrica sugerida: Muiñeira (6/8)</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-end mt-auto pt-6 border-t border-walnut-wood/10">
                        <div className="space-y-1">
                            <div className="flex space-x-2">
                                <span className="text-[10px] font-bold bg-brass-metal text-white px-3 py-1 rounded-sm uppercase tracking-tighter shadow-sm">6/8 Ternaria</span>
                                <span className="text-[10px] font-bold bg-walnut-wood text-white px-3 py-1 rounded-sm uppercase tracking-tighter shadow-sm">Modo: Muiñeira</span>
                            </div>
                        </div>
                        <button onClick={clear} className="text-brass-metal hover:text-walnut-wood text-xs font-bold uppercase tracking-widest transition-colors flex items-center space-x-2 active:scale-95">
                            <span className="text-lg">↺</span> <span>Reiniciar</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Instrumento Interactivo */}
            <div className="space-y-8 flex flex-col items-center">
                <div className="text-center group">
                    <h2 className="text-2xl font-serif text-brass-metal uppercase tracking-[0.2em] mb-1">Artesanía Dixital</h2>
                    <div className="h-0.5 w-16 bg-brass-metal mx-auto transition-all group-hover:w-32" />
                </div>

                <InteractivePandereta onStroke={addStroke} />

                <div className="texture-paper p-6 rounded-lg border border-stone-300 max-w-sm text-stone-700 text-xs leading-relaxed font-serif shadow-md italic">
                    <p><strong>Truco de Luthier:</strong> El ritmo ternario de la muiñeira se construye acentuando el primer tiempo con un golpe de puño (TA) fuerte en el centro, seguido de dos golpes ligeros de dedos (ti) en el borde.</p>
                </div>
            </div>
        </div>
    );
};

export default RhythmEditor;
