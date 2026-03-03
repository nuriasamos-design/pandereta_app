/**
 * Skill: Detección Rítmica — "Shazam Rítmico"
 * Función: Analiza audio para identificar la "tierra" (primer pulso fuerte),
 *          si el ritmo es binario o ternario, BPM y género probable.
 *
 * NOTA: Esta skill requiere la Web Audio API (navegador) o una librería de análisis
 *       de audio como 'essentia.js' o 'meyda' para entornos Node.js.
 *       La implementación de análisis real deberá conectarse en /src/ui/.
 *
 * Map de géneros por métrica y rango BPM:
 *   Muiñeira     → 6/8, ternario, 90–120 BPM
 *   Jota         → 3/4, ternario, 110–140 BPM
 *   Foliada      → 3/8, ternario, 130–160 BPM
 *   Maneo Bergan → 6/8, ternario, 80–100 BPM
 *   Pasodoble    → 2/4, binario,  110–130 BPM
 *   Vals         → 3/4, ternario,  60–90 BPM
 */

/** Rangos BPM y métricas por género */
export const MAPA_GENEROS = [
    { genero: 'Muiñeira', metrica: '6/8', tipo: 'ternario', bpmMin: 90, bpmMax: 120, patron: 'tumm-ti-co | tumm-ti-co' },
    { genero: 'Jota', metrica: '3/4', tipo: 'ternario', bpmMin: 110, bpmMax: 140, patron: 'tumm-co-ti | tumm-co-ti' },
    { genero: 'Foliada', metrica: '3/8', tipo: 'ternario', bpmMin: 130, bpmMax: 160, patron: 'tumm-trr-co | tumm-trr-co' },
    { genero: 'Maneado Bergantiños', metrica: '6/8', tipo: 'ternario', bpmMin: 80, bpmMax: 100, patron: 'tumm-ti-trr-co | tumm-ti-trr-co' },
    { genero: 'Pasodoble', metrica: '2/4', tipo: 'binario', bpmMin: 110, bpmMax: 130, patron: 'tumm-co | tumm-co' },
    { genero: 'Vals', metrica: '3/4', tipo: 'ternario', bpmMin: 60, bpmMax: 90, patron: 'tumm-co-ti | tumm-co-ti' },
];

/**
 * Determina si un BPM corresponde a un ritmo binario o ternario.
 * Devuelve 'ternario' por defecto para la tradición gallega.
 * @param {number} bpm
 * @param {number} golpesPorCompas - Número de subdiviciones detectadas
 * @returns {'binario'|'ternario'}
 */
export function clasificarTipo(bpm, golpesPorCompas) {
    if (golpesPorCompas % 2 === 0 && golpesPorCompas % 3 !== 0) return 'binario';
    return 'ternario';
}

/**
 * Mapea BPM y tipo rítmico al género probable del repertorio gallego.
 * @param {number} bpm
 * @param {'binario'|'ternario'} tipo
 * @returns {object|null} Entrada del MAPA_GENEROS más cercana
 */
export function inferirGenero(bpm, tipo) {
    const candidatos = MAPA_GENEROS.filter(g => g.tipo === tipo && bpm >= g.bpmMin && bpm <= g.bpmMax);
    if (candidatos.length === 0) {
        // Si no hay coincidencia exacta, buscar el más cercano por BPM medio
        const conDistancia = MAPA_GENEROS
            .filter(g => g.tipo === tipo)
            .map(g => ({ ...g, distancia: Math.abs(bpm - (g.bpmMin + g.bpmMax) / 2) }))
            .sort((a, b) => a.distancia - b.distancia);
        return conDistancia[0] ?? null;
    }
    return candidatos[0];
}

/**
 * Punto de entrada principal: construye el resultado completo de análisis rítmico.
 * @param {number} bpm               - Tempo detectado en pulsaciones por minuto
 * @param {number} golpesPorCompas   - Subdivisiones detectadas por compás
 * @returns {object}
 */
export function analizarRitmo(bpm, golpesPorCompas) {
    const tipo = clasificarTipo(bpm, golpesPorCompas);
    const genero = inferirGenero(bpm, tipo);

    return {
        tierra: `Pulso 1 de ${genero ? genero.metrica : '?'}`,
        tipo,
        bpm,
        genero_probable: genero ? genero.genero : 'Descoñecido',
        metrica: genero ? genero.metrica : '?',
        patron_notacion: genero ? genero.patron : '',
    };
}

