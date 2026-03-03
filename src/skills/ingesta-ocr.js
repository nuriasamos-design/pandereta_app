/**
 * Skill: Ingesta OCR y Análisis de Documentos
 * Función: Procesa fotos, PDFs y Word para extraer letras y ritmos al cancionero.
 *
 * Pipeline:
 *   1. OCR del documento fuente → texto en bruto
 *   2. Identificar bloques de letra (coplas, estribillos)
 *   3. Detectar indicaciones de ritmo o género
 *   4. Clasificar género: Jota, Muiñeira, Maneo de Bergantiños, Foliada, Alborada
 *   5. Estructurar en JSON → /data/processed/cancionero.json
 *
 * Formatos de entrada: jpg, png, pdf, docx
 */

const fs = require('fs');
const path = require('path');

// Palabras clave para detectar el género desde el texto
const INDICADORES_GENERO = {
    'Muiñeira': ['muiñeira', 'muinheira', '6/8', 'ternaria'],
    'Jota': ['jota', 'xota', '3/4'],
    'Foliada': ['foliada', '3/8'],
    'Maneo de Bergantiños': ['maneo', 'bergantiños', 'bergantinos'],
    'Alborada': ['alborada', 'alba'],
    'Pasodoble': ['pasodoble', 'paso doble', '2/4'],
    'Vals': ['vals', 'valse'],
};

/**
 * Detecta el género musical a partir de texto OCR en bruto.
 * @param {string} textoOCR
 * @returns {string} género detectado o 'Descoñecido'
 */
function detectarGenero(textoOCR) {
    const textoNorm = textoOCR.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (const [genero, palabrasClave] of Object.entries(INDICADORES_GENERO)) {
        if (palabrasClave.some(clave => textoNorm.includes(clave.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))) {
            return genero;
        }
    }
    return 'Descoñecido';
}

/**
 * Extrae coplas del texto OCR.
 * Heurística: separa por líneas no vacías y agrupa bloques de 2-4 líneas.
 * @param {string} textoOCR
 * @returns {string[]}
 */
function extraerCoplas(textoOCR) {
    const lineas = textoOCR
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 3); // Descartar líneas casi vacías
    return lineas;
}

/**
 * Construye el objeto JSON de canción a partir de texto OCR y metadatos.
 * @param {object} params
 * @param {string} params.textoOCR     - Texto extraído del documento
 * @param {string} params.titulo       - Título de la canción (puede inferirse del nombre de archivo)
 * @param {string} params.region       - Región geográfica de origen
 * @param {string} params.fuenteArchivo - Ruta al archivo en /data/raw/
 * @returns {object} Objeto JSON de canción
 */
function construirEntradaCancionero({ textoOCR, titulo, region = '', fuenteArchivo = '' }) {
    const coplas = extraerCoplas(textoOCR);
    const ritmo = detectarGenero(textoOCR);

    return {
        titulo: titulo || 'Sin título',
        coplas,
        tempo_aproximado: '',          // A completar manualmente o por deteccion-ritmica
        ritmo,
        patron_notacion: '',          // A completar por notacion-tradicional
        instrumentacion: ['pandeireta'],
        region,
        tags: [ritmo.toLowerCase()],
        notas_etnograficas: '',
        fuente: fuenteArchivo,
    };
}

/**
 * Guarda una entrada nueva en el cancionero JSON.
 * @param {object} entrada - Objeto de canción construido por construirEntradaCancionero
 * @param {string} rutaCancionero - Ruta al archivo /data/processed/cancionero.json
 */
function guardarEnCancionero(entrada, rutaCancionero) {
    let cancionero = [];
    if (fs.existsSync(rutaCancionero)) {
        const contenido = fs.readFileSync(rutaCancionero, 'utf-8');
        cancionero = JSON.parse(contenido);
    }
    cancionero.push(entrada);
    fs.writeFileSync(rutaCancionero, JSON.stringify(cancionero, null, 2), 'utf-8');
    console.log(`✅ Canción "${entrada.titulo}" guardada en ${rutaCancionero}`);
}

module.exports = { detectarGenero, extraerCoplas, construirEntradaCancionero, guardarEnCancionero };
