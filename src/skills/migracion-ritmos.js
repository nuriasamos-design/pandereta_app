// src/skills/migracion-ritmos.js

// Mapeo explícito de ids antiguos -> ids nuevos (base)
const RITMO_ID_MAP = {
    // antiguos del catálogo previo
    'muineira-simple': 'muineira-base',
    'muineira-picada': 'muineira-base',     // si quieres, luego puedes crear variante "picada"
    'jota': 'jota-base',
    'pasodoble': 'pasodoble-base',
    'rumba': 'rumba-base',
    'maneo': 'maneo-base',
    'alala': 'alala-libre',
};

// Heurística por género si falta o viene mal
const DEFAULT_BY_GENERO = {
    'Muiñeira': 'muineira-base',
    'Jota': 'jota-base',
    'Pasodoble': 'pasodoble-base',
    'Rumba': 'rumba-base',
    'Maneo': 'maneo-base',
    'Alalá': 'alala-libre',
};

// Si quieres “muiñeira vella con tumm” como predeterminada:
const DEFAULT_MUINEIRA_PREF = 'muineira-vella-tumm';

export function migrateSongsToRitmosV2(songs, ritmosV2, opts = {}) {
    const existsInV2 = (id) => ritmosV2.some(r => r.id === id);

    const {
        preferMuineiraVellaTumm = true,
        inferVariantsFromNotas = true,
    } = opts;

    return songs.map(song => {
        const s = { ...song };

        // 1) Base id
        let mapped = s.ritmo_id;
        if (!existsInV2(mapped)) {
            mapped = RITMO_ID_MAP[s.ritmo_id] || DEFAULT_BY_GENERO[s.genero] || s.ritmo_id;
        }

        // 2) Si es muiñeira y prefieres vella-tumm
        let baseId = mapped;
        if (preferMuineiraVellaTumm && (s.genero === 'Muiñeira')) {
            baseId = DEFAULT_MUINEIRA_PREF;
        }

        // 3) Variante sugerida por notas (solo si quieres)
        let variantId = null;
        if (inferVariantsFromNotas && typeof s.notas === 'string') {
            const n = s.notas.toLowerCase();

            // riscado
            if (n.includes('risc') || n.includes('ris') || n.includes('trr')) {
                // elige variante por género
                if (s.genero === 'Muiñeira') variantId = 'muineira-con-trr';
                else if (s.genero === 'Jota') variantId = 'jota-con-trr';
                else if (s.genero === 'Pasodoble') variantId = 'pasodoble-con-trr';
                else if (s.genero === 'Rumba') variantId = 'rumba-con-trr';
                else if (s.genero === 'Maneo') variantId = 'maneo-con-trr';
                else if (s.genero === 'Alalá') variantId = 'alala-con-trr';
            }

            // grave / sordo / tumm
            if (n.includes('grave') || n.includes('sordo') || n.includes('tumm') || n.includes('tum')) {
                if (s.genero === 'Muiñeira') variantId = 'muineira-vella-tumm';
                else if (s.genero === 'Jota') variantId = 'jota-con-tumm';
                else if (s.genero === 'Pasodoble') variantId = 'pasodoble-con-tumm';
                else if (s.genero === 'Rumba') variantId = 'rumba-con-tumm';
                else if (s.genero === 'Maneo') variantId = 'maneo-con-tumm';
                else if (s.genero === 'Alalá') variantId = 'alala-con-tumm';
            }

            // mixta si menciona ambas cosas
            const hasRisc = (n.includes('risc') || n.includes('ris') || n.includes('trr'));
            const hasGrave = (n.includes('grave') || n.includes('sordo') || n.includes('tumm') || n.includes('tum'));
            if (hasRisc && hasGrave) {
                if (s.genero === 'Muiñeira') variantId = 'muineira-mixta';
                else if (s.genero === 'Jota') variantId = 'jota-mixta';
                else if (s.genero === 'Pasodoble') variantId = 'pasodoble-mixta';
                else if (s.genero === 'Rumba') variantId = 'rumba-mixta';
                else if (s.genero === 'Maneo') variantId = 'maneo-mixta';
                // Alalá no tiene “mixta” (por diseño), lo dejamos en plantilla puntual
            }
        }

        // 4) Aplicar y validar existencia
        s.ritmo_id = existsInV2(baseId) ? baseId : (existsInV2(DEFAULT_BY_GENERO[s.genero]) ? DEFAULT_BY_GENERO[s.genero] : s.ritmo_id);

        if (variantId && existsInV2(variantId)) {
            s.ritmo_variant_id = variantId;
        }

        return s;
    });
}
