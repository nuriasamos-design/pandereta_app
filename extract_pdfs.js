const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const dir = 'd:/pandereta_app';
const files = fs.readdirSync(dir).filter(f => f.startsWith('EPISODIO') && f.endsWith('.pdf'));

async function processPdfs() {
    let results = [];
    for (let file of files) {
        console.log(`Leyendo ${file}...`);
        const dataBuffer = fs.readFileSync(path.join(dir, file));
        try {
            const data = await pdf(dataBuffer);
            results.push({
                file: file,
                text: data.text
            });
        } catch (e) {
            console.error(`Error procesando ${file}:`, e.message);
        }
    }
    fs.writeFileSync(path.join(dir, 'extracted_lyrics.json'), JSON.stringify(results, null, 2));
    console.log(`Completado. Extraídos ${results.length} archivos.`);
}

processPdfs();
