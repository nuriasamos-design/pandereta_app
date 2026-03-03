/**
 * @file notacion-tradicional.js
 * @description Skill: Notación Tradicional Galega.
 * Traduce y valida patrones rítmicos usando el estándar etnográfico.
 */

export const SIMBOLOS_VALIDOS = ['ti', 'co', 'tumm', 'trr'];

export const ALIASES = {
    TA: 'tumm',
    ta: 'tumm',
    ris: 'trr',
    RIS: 'trr',
    tum: 'tumm',
    TUM: 'tumm',
};

export function normalizeStroke(input) {
    if (input == null) return null;
    const raw = String(input).trim();
    if (!raw) return null;
    const low = raw.toLowerCase();
    const canonical = ALIASES[raw] || ALIASES[low] || low;
    return SIMBOLOS_VALIDOS.includes(canonical) ? canonical : null;
}

/**
 * Normaliza un array de golpes musicales eliminando los nulos.
 * @param {Array} sequenceArray 
 * @returns {Array}
 */
export function normalizeSequence(sequenceArray) {
    if (!Array.isArray(sequenceArray)) return [];
    return sequenceArray.map(normalizeStroke).filter(Boolean);
}

/**
 * Configuración de Renderizado (Fuente de verdad para la UI)
 * Según Estándar Normalizado: Sistema de una sola línea.
 */
export const CONFIGURACION_RENDER = {
    tipo: 'monolineal',
    lineas: 1,
    posiciones: {
        ti: 'encima',
        co: 'debajo',
        tumm: 'encima',
        trr: 'encima'
    },
    estilo: 'tradicional-galego'
};

export const PATRONES_BASE = {
    muineira: {
        nombre: 'Muiñeira',
        metrica: '6/8',
        tipo: 'ternaria',
        patron: 'tumm-ti-co | tumm-ti-co',
        regla_especifica: 'El primer golpe del compás SIEMPRE es tumm (grave/sordo).'
    }
};

/**
 * Valida que un patrón de notación siga las reglas.
 * @param {string} patron - Ej: "tumm-ti-co | tumm-ti-co" o "TA-ti-co | ris-co-ti"
 * @returns {{ valido: boolean, errores: string[], normalizado: string }}
 */
export function validarPatron(patron) {
    const errores = [];
    const compasesRaw = patron.split('|').map(c => c.trim());
    const compasesNormalizados = [];

    compasesRaw.forEach((compas, idxCompas) => {
        const golpesRaw = compas.split('-').map(g => g.trim());
        const golpesNormalizados = [];

        golpesRaw.forEach((gRaw, idxGolpe) => {
            const gNorm = normalizeStroke(gRaw);
            if (!gNorm) {
                errores.push(`Compás ${idxCompas + 1}, golpe ${idxGolpe + 1}: símbolo desconocido "${gRaw}"`);
                golpesNormalizados.push(gRaw); // Mantenemos el original para el reporte de error
            } else {
                golpesNormalizados.push(gNorm);
            }
        });

        compasesNormalizados.push(golpesNormalizados.join('-'));

        // Reglas sobre el compás ya normalizado
        const compasNorm = golpesNormalizados;

        // 1. Regla de acentuación Muiñeira (Primer golpe tumm)
        if (compasNorm[0] !== 'tumm') {
            errores.push(`Compás ${idxCompas + 1}: En Muiñeira, el primer golpe debe ser tumm (acentuado).`);
        }

        // 2. Regla técnica: trr debe ir seguido de co (pulgar) para cerrar el movimiento
        compasNorm.forEach((golpe, idx) => {
            if (golpe === 'trr') {
                const siguiente = compasNorm[idx + 1];
                if (siguiente !== 'co') {
                    errores.push(`Compás ${idxCompas + 1}: El riscado (trr) requiere un golpe de pulgar (co) de cierre.`);
                }
            }
        });
    });

    return {
        valido: errores.length === 0,
        errores,
        normalizado: compasesNormalizados.join(' | ')
    };
}

/**
 * Identifica si una secuencia es una Muiñeira válida.
 */
export function esMuineira(secuencia) {
    const { valido, normalizado } = validarPatron(secuencia);
    return valido && normalizado.includes('tumm-ti-co');
}
