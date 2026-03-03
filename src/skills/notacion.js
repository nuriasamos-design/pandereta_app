/**
 * @file notacion.js
 * @description Lógica para validar y procesar ritmos de pandereta galega.
 * Estándar: ti (adelante), co (pulgar), TA (golpe fuerte/puño), ris (riscado).
 */

const GOLPES_VALIDOS = ['ti', 'co', 'TA', 'ris'];

/**
 * Valida si una secuencia de golpes es correcta según el estándar.
 * @param {string[]} secuencia - Array de strings con los golpes.
 * @returns {boolean}
 */
export const validarSecuencia = (secuencia) => {
    return secuencia.every(golpe => GOLPES_VALIDOS.includes(golpe));
};

/**
 * Identifica si una secuencia corresponde a una Muiñeira.
 * Definición: 6/8 ternario, primer golpe acentuado (TA).
 * @param {string[]} secuencia - Secuencia de golpes.
 * @returns {Object} Resultado de la identificación.
 */
export const identificarMuineira = (secuencia) => {
    const esMuineiraBase =
        secuencia.length >= 3 &&
        secuencia[0] === 'TA' &&
        validarSecuencia(secuencia);

    return {
        ritmo: esMuineiraBase ? 'Muiñeira' : 'Desconocido',
        compas: '6/8',
        acentuacion: secuencia[0] === 'TA' ? 'Correcta' : 'Incorrecta',
        detalles: esMuineiraBase
            ? 'Patrón ternario identificado con acento inicial.'
            : 'No coincide con el patrón base de Muiñeira.'
    };
};
