/**
 * Skill: Memoria Histórica y Antropología
 * Función: Provee contexto cultural sobre la resistencia de las bertorelleiras
 *          y la evolución de la tradición pandeireteira en Galicia.
 *
 * Uso en la app:
 *   Enriquece el campo `notas_etnograficas` de la ficha de canción.
 */

/** Base de conocimiento de contexto cultural */
const CONTEXTO_HISTORICO = {
    resistencia_clandestina: {
        titulo: 'Resistencia bajo la dictadura',
        texto: `
      Durante el franquismo, la música tradicional gallega fue reprimida como expresión identitaria.
      Las mulleres pandeireteiras (bertorelleiras) mantuvieron el repertorio transmitido oralmente
      en espacios privados: las "cociñas". Estas reuniones nocturnas, aparentemente domésticas,
      fueron el principal vehículo de resistencia cultural clandestina en el rural gallego.
    `.trim(),
        periodo: '1939–1975',
    },
    recollidas: {
        titulo: 'As Recollidas',
        texto: `
      Las "recollidas" eran las recopilaciones informales de canciones que las mujeres realizaban
      de memoria, pasando piezas de generación en generación sin soporte escrito.
      Este método de transmisión oral es la razón por la que existen múltiples variantes
      de la misma canción según la parroquia o comarca de origen.
    `.trim(),
        periodo: 'ss. XIX–XX',
    },
    modernizacion: {
        titulo: 'Modernización y referentes actuales',
        texto: `
      La escena actual ha revitalizado la pandeireta como instrumento de vanguardia:
      - Tanxugueiras: fusión con electrónica y escenas internacionales (Eurovision 2022)
      - Xavier Díaz e as Afoutesas: investigación etnomusicológica y rescate de repertorios
      - Mercedes Peón: experimentación sonora y spoken word con pandeireta
    `.trim(),
        periodo: '1990–presente',
    },
};

/** Mapa de géneros musicales a su contexto cultural */
const CONTEXTO_POR_GENERO = {
    'Muiñeira': `
    La Muiñeira (del muíño, molino) nació en las orillas de los ríos donde las mujeres
    esperaban la molienda del grano. Su compás ternario (6/8) imita el ritmo de la rueda
    del molino girando. Es el género más reconocible de la tradición pandeireteira gallega.
  `.trim(),
    'Jota': `
    La Xota gallega comparte raíces con la jota aragonesa pero adquirió identidad propia.
    Se baila en pares y su compás binario (3/4) la hace ideal para las fiestas de verano.
  `.trim(),
    'Foliada': `
    La Foliada es una danza festiva, rápida y de carácter alegre. Se asocia a las romerías
    y celebraciones de las parroquias del interior de Galicia.
  `.trim(),
    'Maneo de Bergantiños': `
    El Maneo de Bergantiños es propio de la comarca homónima (A Coruña). Su patrón rítmico
    incluye el riscado como elemento característico, dando un carácter más percusivo y denso.
  `.trim(),
};

/**
 * Obtiene el contexto histórico completo para enriquecer una ficha de canción.
 * @param {string} genero - Género musical de la canción
 * @returns {string} Texto de notas etnográficas
 */
function obtenerNotasEtnograficas(genero) {
    const contextoGenero = CONTEXTO_POR_GENERO[genero] ?? '';
    const contextoCultura = CONTEXTO_HISTORICO.resistencia_clandestina.texto;
    return [contextoGenero, contextoCultura].filter(Boolean).join('\n\n---\n\n');
}

/**
 * Obtiene un bloque de contexto histórico por clave temática.
 * @param {'resistencia_clandestina'|'recollidas'|'modernizacion'} clave
 * @returns {object|null}
 */
function obtenerContexto(clave) {
    return CONTEXTO_HISTORICO[clave] ?? null;
}

/**
 * Lista todos los referentes modernos disponibles.
 * @returns {string[]}
 */
function listarReferentes() {
    return [
        'Tanxugueiras',
        'Xavier Díaz e as Afoutesas',
        'Mercedes Peón',
    ];
}

module.exports = { obtenerNotasEtnograficas, obtenerContexto, listarReferentes, CONTEXTO_HISTORICO };
