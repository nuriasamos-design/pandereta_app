import React, { useState, useMemo, useEffect } from 'react';
import { CANCIONES_V2 as CANCIONES, RITMOS_V2 as RITMOS, HISTORIA, ORGANOLOGIA, TECNICAS } from '../data/panderetaData.js';
import MonolinealScore from './components/MonolinealScore.jsx';
import { isFavoriteSong, toggleFavoriteSong, getFavoriteSongs, savePattern, loadPatterns, deletePattern } from '../skills/storage.js';
import { normalizeStroke, normalizeSequence } from '../skills/notacion-tradicional.js';

// ── Icono inline ─────────────────────────────────────────────────────────────
const ICONS = { drum: '🥁', book: '📖', history: '🕯️', ruler: '📏', search: '🔍' };
const Icon = ({ n }) => <span>{ICONS[n] ?? '•'}</span>;

// ── NAVEGACIÓN (TABS) ─────────────────────────────────────────────────────────
const NAV = [
    { id: 'ritmos', label: 'Biblioteca de Ritmos', icon: 'drum' },
    { id: 'cancionero', label: 'Cancionero', icon: 'book' },
    { id: 'historia', label: 'Historia y Memoria', icon: 'history' },
    { id: 'tecnica', label: 'Especificaciones', icon: 'ruler' },
];

const TabsBar = ({ active, setActive }) => (
    <nav className="flex items-center gap-1 px-8 border-b border-white/10 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-10">
        {NAV.map(item => {
            const isActive = active === item.id;
            return (
                <button
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className={`
                        flex items-center gap-2 px-4 py-4 text-sm font-medium transition-all relative
                        ${isActive ? 'text-neutral-100' : 'text-neutral-500 hover:text-neutral-300'}
                    `}
                >
                    <Icon n={item.icon} />
                    {item.label}
                    {/* Indicador inferior activo (acento dorado) */}
                    {isActive && (
                        <span
                            className="absolute bottom-0 left-0 w-full h-0.5 rounded-t-full"
                            style={{ background: '#b8860b' }}
                        />
                    )}
                </button>
            );
        })}
    </nav>
);

// ── TOPBAR ────────────────────────────────────────────────────────────────────
const TITLES = { ritmos: 'Biblioteca de Ritmos', cancionero: 'Cancionero Tradicional', historia: 'Historia y Memoria', tecnica: 'Especificaciones Técnicas' };

const Topbar = ({ active, search, setSearch }) => (
    <header className="flex items-center justify-between px-8 py-4 shrink-0 bg-neutral-950 border-b border-white/10">
        <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold leading-tight text-white mb-0.5" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                Pandereta<span style={{ color: '#b8860b' }}>App</span>
            </h1>
            <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block"></div>
            <h2 className="text-neutral-300 text-lg hidden sm:block" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                {TITLES[active]}
            </h2>
        </div>

        <div className="flex items-center gap-4">
            {/* Buscador: Más ancho, placeholder más discreto */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar canción, ritmo..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="rounded-full py-1.5 pl-8 pr-4 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-white/20 w-52 md:w-72 bg-white/5 border border-white/10 transition-all"
                />
                <span className="absolute left-3 top-2 text-neutral-500 text-xs">🔍</span>
            </div>
            {/* Badge NotebookLM: Más discreto text-[11px] */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] rounded-full px-3 py-1 bg-white/5 border border-white/10 text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#34d399', boxShadow: '0 0 6px rgba(52,211,153,0.5)' }} />
                NotebookLM · {CANCIONES.length} fuentes
            </div>
        </div>
    </header>
);

// ── MÓDULO 1: RITMOS ─────────────────────────────────────────────────────────
const GOLPES_DEF = {
    ti: { symbol: '●', label: 'ti', desc: 'Yemas adelante', style: { background: '#1c1917' } },
    co: { symbol: '●', label: 'co', desc: 'Pulgar', style: { background: '#1c1917' } },
    tumm: { symbol: '●', label: 'tumm', desc: 'Golpe grave', style: { background: '#1e40af' } },
    trr: { symbol: '≈', label: 'trr', desc: 'Riscado', style: { background: '#1e40af' } },
};

const RitmosModule = ({ search }) => {
    const [seq, setSeq] = useState([]);
    const [activeRitmo, setActiveRitmo] = useState(RITMOS[0]);
    const [lastGolpe, setLastGolpe] = useState(null);
    const [savedPatterns, setSavedPatterns] = useState([]);

    useEffect(() => {
        setSavedPatterns(loadPatterns());
    }, []);

    const baseRitmos = useMemo(() =>
        RITMOS.filter(r => !r.variant_of && (!search || r.nombre.toLowerCase().includes(search.toLowerCase()) || r.genero.toLowerCase().includes(search.toLowerCase()))),
        [search]);

    const groupedRitmos = useMemo(() => {
        const groups = {};
        baseRitmos.forEach(r => {
            if (!groups[r.genero]) groups[r.genero] = [];
            groups[r.genero].push(r);
        });
        return groups;
    }, [baseRitmos]);

    const addGolpe = (g) => {
        setSeq(s => [...s, g]);
        setLastGolpe(g);
        setTimeout(() => setLastGolpe(null), 200);
    };

    const handleSave = () => {
        if (seq.length === 0) return;
        const id = Date.now().toString();
        const meta = {
            nombre: `Variación de ${activeRitmo.nombre}`,
            compas: activeRitmo.compas,
            genero: activeRitmo.genero,
            ritmo_id: activeRitmo.id
        };
        const updated = savePattern(id, seq, meta);
        setSavedPatterns(updated);
    };

    const loadSaved = (p) => {
        setSeq(p.sequence);
        const ref = RITMOS.find(r => r.id === p.meta.ritmo_id);
        if (ref) setActiveRitmo(ref);
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
            {/* Lista de ritmos */}
            <div className="space-y-4 overflow-y-auto pr-2">
                <p className="text-[11px] font-bold uppercase tracking-widest mb-1 text-neutral-500">
                    <span style={{ color: '#b8860b' }}>{baseRitmos.length}</span> ritmos base
                </p>
                {Object.entries(groupedRitmos).map(([genero, ritmos]) => (
                    <div key={genero} className="space-y-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#b8860b] px-2 mt-4 mb-2 border-l-2 border-[#b8860b]">{genero}</h4>
                        {ritmos.map(r => {
                            const isActiveGroup = activeRitmo.id === r.id || activeRitmo.variant_of === r.id;
                            return (
                                <button key={r.id} onClick={() => { setActiveRitmo(r); setSeq(normalizeSequence(r.patron_array || [])); }}
                                    className={`w-full text-left p-4 rounded-xl transition-all border
                                        ${isActiveGroup ? 'bg-white/10 border-white/20' : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'}
                                    `}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-neutral-100 text-sm font-bold">{r.nombre}</span>
                                        <span className={`text-[9px] font-bold uppercase rounded px-1.5 py-0.5 ${isActiveGroup ? 'bg-neutral-800' : 'bg-black/30'}`} style={{ color: '#b8860b' }}>
                                            {r.compas}
                                        </span>
                                    </div>
                                    <div className="text-[10px] font-mono text-neutral-400">{r.patron}</div>
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Panel central: editor + info */}
            <div className="xl:col-span-2 space-y-6">
                {/* Descripción del ritmo activo */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-neutral-100 font-bold text-xl" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{activeRitmo.nombre}</h3>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-black/40" style={{ color: '#b8860b' }}>{activeRitmo.compas}</span>
                    </div>
                    <div className="font-mono text-sm mb-4 p-3 rounded-lg bg-black/50 text-neutral-300 border border-white/5">
                        {activeRitmo.patron}
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-400">{activeRitmo.descripcion}</p>

                    {/* SELECTOR DE VARIANTES */}
                    {(() => {
                        const baseId = activeRitmo.variant_of || activeRitmo.id;
                        const variants = RITMOS.filter(r => r.variant_of === baseId || r.id === baseId);
                        if (variants.length > 1) {
                            return (
                                <div className="mt-6 pt-5 border-t border-white/10">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#b8860b] mb-3">Variantes Disponibles</p>
                                    <div className="flex flex-wrap gap-2">
                                        {variants.map(v => (
                                            <button
                                                key={v.id}
                                                onClick={() => { setActiveRitmo(v); setSeq(normalizeSequence(v.patron_array || [])); }}
                                                className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all border uppercase tracking-widest
                                                    ${activeRitmo.id === v.id
                                                        ? 'bg-[#b8860b]/20 text-[#b8860b] border-[#b8860b]/50'
                                                        : 'bg-transparent text-neutral-400 border-white/10 hover:bg-white/5'
                                                    }`}
                                            >
                                                {v.tags.filter(t => t !== 'base').join(' + ').replace(/-/g, ' ') || 'Base'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })()}
                </div>

                {/* Notación monolineal SVG */}
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">Notación · {activeRitmo.compas}</p>
                        <div className="flex items-center gap-3">
                            {seq.length > 0 && (
                                <>
                                    <button onClick={handleSave} className="text-[11px] font-bold uppercase px-3 py-1 rounded-sm transition-all" style={{ background: 'rgba(184,134,11,0.2)', color: '#b8860b' }}>
                                        Guardar Patrón
                                    </button>
                                    <button onClick={() => setSeq([])} className="text-[11px] font-bold uppercase text-neutral-500 hover:text-red-400 transition-colors">Borrar ×</button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        {seq.length === 0
                            ? <p className="text-sm italic text-center py-8 text-neutral-600">Toca los botones para registrar secuencias…</p>
                            : <MonolinealScore sequence={seq} />
                        }
                    </div>

                    {/* Botones de golpe */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {Object.entries(GOLPES_DEF).map(([key, g]) => (
                            <button key={key} onClick={() => addGolpe(key)}
                                className="rounded-xl p-4 flex flex-col items-center gap-2 transition-all active:scale-95 border"
                                style={{
                                    ...g.style, minHeight: 90,
                                    borderColor: lastGolpe === key ? '#b8860b' : 'rgba(255,255,255,0.05)',
                                    transform: lastGolpe === key ? 'scale(0.95)' : undefined,
                                }}>
                                <span className="text-2xl font-bold text-white">{g.symbol}</span>
                                <div className="text-center">
                                    <p className="text-white font-bold text-[11px] uppercase tracking-widest">{g.label}</p>
                                    <p className="text-[9px] mt-1 text-neutral-400">{g.desc}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Mis Patrones guardados */}
                    {savedPatterns.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-4">Mis patrones guardados</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {savedPatterns.map(p => (
                                    <button key={p.id} onClick={() => loadSaved(p)}
                                        className="p-3 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 transition-colors">
                                        <p className="text-[11px] font-bold text-neutral-200 uppercase truncate" style={{ color: '#b8860b' }}>{p.meta.nombre}</p>
                                        <p className="text-[10px] uppercase text-neutral-500 mb-2 truncate">{p.meta.genero} · {p.meta.compas}</p>
                                        <p className="text-[10px] font-mono text-neutral-400 truncate break-all">{p.sequence.length > 8 ? p.sequence.slice(0, 8).join(' ') + ' ...' : p.sequence.join(' ')}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ── MÓDULO 2: CANCIONERO ──────────────────────────────────────────────────────
const GENERO_ICON = { Muiñeira: '🌀', Jota: '💃', Pasodoble: '🥁', Maneo: '🤚', Rumba: '🎶', Ribeirana: '🌊', Panxoliña: '⭐' };
const GENERO_COLOR = { Muiñeira: '#b8860b', Jota: '#9333ea', Pasodoble: '#0284c7', Maneo: '#059669', Rumba: '#dc2626', Ribeirana: '#0ea5e9', Panxoliña: '#ca8a04' };

const CancioneroModule = ({ search }) => {
    const [selected, setSelected] = useState(null);
    const genres = [...new Set(CANCIONES.map(c => c.genero))];
    const [filterGenre, setFilterGenre] = useState('');
    const [favsVersion, setFavsVersion] = useState(0);

    const filtered = useMemo(() =>
        CANCIONES.filter(c => {
            const q = search.toLowerCase();
            const matchSearch = !q || c.titulo.toLowerCase().includes(q) || c.region.toLowerCase().includes(q) || c.letra.toLowerCase().includes(q);
            const matchGenre = !filterGenre || c.genero === filterGenre;
            return matchSearch && matchGenre;
        }), [search, filterGenre, favsVersion]); // dependen de favs para redibujar si el filtro fuera "solo favs" en el futuro

    const song = selected ?? filtered[0];
    const ritmo = song ? (RITMOS.find(r => r.id === song.ritmo_variant_id) || RITMOS.find(r => r.id === song.ritmo_id)) : null;

    const suggestedArrayRaw =
        song?.patron_array?.length ? song.patron_array :
            ritmo?.patron_array?.length ? ritmo.patron_array :
                [];

    const suggestedArray = normalizeSequence(suggestedArrayRaw);

    const suggestedCompas = song?.compas || ritmo?.compas || '';

    const isFav = song ? isFavoriteSong(song.id) : false;

    const doToggleFav = (id, e) => {
        if (e) e.stopPropagation();
        toggleFavoriteSong(id);
        setFavsVersion(v => v + 1);
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
            {/* Lista */}
            <div className="space-y-3 overflow-y-auto pr-2">
                <div className="flex flex-wrap gap-2 mb-4">
                    <button onClick={() => setFilterGenre('')}
                        className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-full transition-all border
                            ${!filterGenre ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-white/10 text-neutral-500 hover:bg-white/5'}
                        `}>
                        Todos
                    </button>
                    {genres.map(g => (
                        <button key={g} onClick={() => setFilterGenre(filterGenre === g ? '' : g)}
                            className="text-[10px] font-bold uppercase px-3 py-1.5 rounded-full transition-all border"
                            style={{
                                background: filterGenre === g ? `${GENERO_COLOR[g]}20` : 'transparent',
                                borderColor: filterGenre === g ? GENERO_COLOR[g] : 'rgba(255,255,255,0.1)',
                                color: filterGenre === g ? GENERO_COLOR[g] : '#737373'
                            }}>
                            {g}
                        </button>
                    ))}
                </div>
                <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-2">{filtered.length} piezas recuperadas</p>
                {filtered.map(c => {
                    const isActive = song?.id === c.id;
                    const cFav = isFavoriteSong(c.id);
                    return (
                        <button key={c.id} onClick={() => setSelected(c)}
                            className={`w-full text-left p-4 rounded-xl transition-all border relative
                                ${isActive ? 'bg-white/10 border-white/20' : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'}
                            `}>
                            {cFav && <span className="absolute top-4 right-4 text-[10px]" style={{ color: '#b8860b' }}>⭐</span>}
                            <div className="flex items-center gap-3 mb-2 pr-6">
                                <span className="text-xl opacity-90">{GENERO_ICON[c.genero] ?? '🎵'}</span>
                                <span className="text-neutral-100 text-sm font-medium leading-tight">{c.titulo}</span>
                            </div>
                            <div className="flex gap-2 items-center flex-wrap mt-2 pl-8">
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase"
                                    style={{ background: `${GENERO_COLOR[c.genero]}15`, color: GENERO_COLOR[c.genero] ?? '#b8860b' }}>
                                    {c.genero}
                                </span>
                                <span className="text-[10px] text-neutral-500">📍 {c.region.split('/')[0].trim()}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Detalle */}
            {song && (
                <div className="xl:col-span-2 overflow-y-auto pr-2 space-y-6">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
                        {/* Botón Favorito flotante grande */}
                        <button
                            onClick={(e) => doToggleFav(song.id, e)}
                            className="absolute top-6 right-6 p-3 rounded-full bg-black/40 border border-white/10 hover:bg-white/10 transition-colors z-20 text-xl"
                            style={{ color: isFav ? '#b8860b' : '#525252' }}
                            title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                        >
                            {isFav ? '⭐' : '☆'}
                        </button>

                        {/* Elemento decorativo sutil */}
                        <div className="absolute -right-10 -top-10 text-9xl opacity-5 pointer-events-none select-none">
                            {GENERO_ICON[song.genero] ?? '🎵'}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-8 relative z-10 pr-16">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0" style={{ background: `${GENERO_COLOR[song.genero] ?? '#b8860b'}15` }}>
                                {GENERO_ICON[song.genero] ?? '🎵'}
                            </div>
                            <div>
                                <h3 className="text-neutral-50 text-3xl font-bold leading-tight mb-3 tracking-wide" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{song.titulo}</h3>
                                <div className="flex flex-wrap gap-3 items-center">
                                    <span className="text-[11px] font-bold px-2 py-1 rounded uppercase tracking-wider"
                                        style={{ background: `${GENERO_COLOR[song.genero] ?? '#b8860b'}20`, color: GENERO_COLOR[song.genero] ?? '#b8860b' }}>
                                        {song.genero}
                                    </span>
                                    <span className="text-sm text-neutral-400">📍 {song.region}</span>
                                </div>
                            </div>
                        </div>

                        {song.letra ? (
                            <div className="rounded-xl p-8 bg-black/40 border border-white/5">
                                <div className="flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-4 mb-6">
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">Letra Tradicional Transcrita</p>

                                    {song.pdf && (
                                        <a
                                            href={`/${song.pdf}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-[#b8860b]/20 hover:bg-[#b8860b]/40 text-[#b8860b] hover:text-white text-[10px] font-bold tracking-widest rounded-lg transition-all flex items-center gap-2 border border-[#b8860b]/50"
                                        >
                                            <span className="text-sm">📄</span> ABRIR PDF ORIGINAL
                                        </a>
                                    )}
                                </div>

                                {song.letra !== '[Abre el PDF adjunto para ver la letra de esta canción]' && (
                                    <div className="text-lg leading-9 text-neutral-300" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                                        {song.letra.split('\n').map((line, i) =>
                                            line === ''
                                                ? <div key={i} className="h-6" />
                                                : <p key={i}>{line}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="rounded-xl p-8 text-center bg-black/20 border border-dashed border-white/10">
                                <span className="text-2xl mb-2 block opacity-50">🔇</span>
                                <p className="text-sm text-neutral-400">Pieza instrumental o sin registro oral transcrito.</p>
                                <p className="text-[11px] mt-2 text-neutral-600 uppercase tracking-widest">Fuente documental: Gran Cancionero</p>
                                {song.pdf && (
                                    <a
                                        href={`/${song.pdf}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 inline-flex px-4 py-2 bg-[#b8860b]/20 hover:bg-[#b8860b]/40 text-[#b8860b] hover:text-white text-[10px] font-bold tracking-widest rounded-lg transition-all items-center gap-2 border border-[#b8860b]/50"
                                    >
                                        <span className="text-sm">📄</span> ABRIR PDF ORIGINAL
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    {(ritmo || suggestedArray.length > 0) && (
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-3">Patrón Rítmico Sugerido</p>

                            {ritmo && (
                                <div className="font-mono text-sm mb-3 px-4 py-3 rounded-lg bg-black/50 text-neutral-300 border border-white/5 inline-flex items-center gap-3">
                                    <span>{ritmo.patron}</span>
                                    <span className="text-neutral-600">|</span>
                                    <span className="text-neutral-400 font-sans text-xs">{suggestedCompas}</span>
                                </div>
                            )}

                            {suggestedArray.length > 0 ? (
                                <div className="mt-4 mb-2 bg-neutral-900 border border-white/5 rounded-xl overflow-hidden">
                                    <MonolinealScore sequence={suggestedArray} />
                                </div>
                            ) : (
                                <p className="text-xs text-neutral-500 italic mt-2 mb-2">Sin patrón definido para esta pieza todavía</p>
                            )}

                            {song.notas && (
                                <p className="text-sm text-neutral-400 mt-2 leading-relaxed">{song.notas}</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


// ── MÓDULO 3: HISTORIA ────────────────────────────────────────────────────────
const HistoriaModule = () => (
    <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-neutral-100" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>Memoria Colectiva</h2>
            <div className="w-16 h-0.5 mx-auto mb-4" style={{ background: '#b8860b' }}></div>
            <p className="text-lg text-neutral-400 italic" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>La pandeireta como archivo vivo de resistencia e identidad gallega.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HISTORIA.map(h => (
                <div key={h.id} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-start gap-5 mb-5">
                        <span className="text-4xl opacity-90">{h.icono}</span>
                        <div>
                            <h3 className="text-neutral-100 font-bold text-xl mb-2" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{h.titulo}</h3>
                            <div className="flex gap-2 flex-wrap">
                                {h.tags.map(t => (
                                    <span key={t} className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm bg-black/40 text-neutral-400">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="text-base leading-relaxed text-neutral-300" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{h.texto}</p>
                </div>
            ))}
        </div>
    </div>
);

// ── MÓDULO 4: TÉCNICA ─────────────────────────────────────────────────────────
const TecnicaModule = () => {
    const specs = [ORGANOLOGIA.profesional, ORGANOLOGIA.iniciacion];
    return (
        <div className="space-y-12 max-w-5xl mx-auto">
            {/* Especificaciones de instrumentos */}
            <section>
                <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-100">Criterios de Construcción</h3>
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {specs.map((s, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="text-neutral-300 font-medium uppercase tracking-widest text-sm">Gama {s.tipo}</h4>
                                <span className="text-2xl">🔨</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {[['Diámetro Ø', s.diametro + ' mm'], ['Perfil Libre', s.altura + ' mm']].map(([k, v]) => (
                                    <div key={k} className="p-5 rounded-xl text-center bg-black/40 border border-white/5">
                                        <p className="text-[10px] uppercase tracking-widest mb-2 text-neutral-500">{k}</p>
                                        <p className="text-3xl font-light text-neutral-100 tracking-tight">{v}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                {[['Piel Tensa', s.parche], ['Estructura', s.marco], ['Sonajas', s.ferrenas]].map(([k, v]) => (
                                    <div key={k} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                        <span className="text-[10px] uppercase tracking-widest sm:w-28 shrink-0 text-neutral-500">{k}</span>
                                        <span className="text-sm text-neutral-200">{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Técnicas especiales */}
            <section>
                <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-100">Dinámica y Articulación</h3>
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TECNICAS.map((t, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-neutral-100 font-medium">{t.nombre}</h4>
                                <span className="text-[9px] uppercase tracking-wider rounded px-2 py-1" style={{
                                    background: t.nivel === 'Avanzada' ? 'rgba(248,113,113,0.1)' : 'rgba(250,204,21,0.1)',
                                    color: t.nivel === 'Avanzada' ? '#fca5a5' : '#fde047',
                                }}>{t.nivel}</span>
                            </div>
                            <p className="text-sm leading-relaxed text-neutral-400">{t.descripcion}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

// ── APP RAIZ ──────────────────────────────────────────────────────────────────
export default function App() {
    const [active, setActive] = useState('cancionero'); // Empezar en cancionero por defecto ayuda a ver el impacto
    const [search, setSearch] = useState('');

    const renderModule = () => {
        if (active === 'ritmos') return <RitmosModule search={search} />;
        if (active === 'cancionero') return <CancioneroModule search={search} />;
        if (active === 'historia') return <HistoriaModule />;
        if (active === 'tecnica') return <TecnicaModule />;
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-neutral-950 text-neutral-100 selection:bg-neutral-800" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {/* Cabecera y Navegación apiladas arriba */}
            <Topbar active={active} search={search} setSearch={setSearch} />
            <TabsBar active={active} setActive={setActive} />

            {/* Área de contenido principal */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto h-full space-y-6">
                    {renderModule()}
                </div>
            </main>
        </div>
    );
}
