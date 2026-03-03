const fs = require('fs');
let content = fs.readFileSync('src/data/panderetaData.js', 'utf8');

const importStatement = `import { migrateSongsToRitmosV2 } from '../skills/migracion-ritmos.js';\n\n`;
const exportStatement = `\n\nexport const CANCIONES_V2 = migrateSongsToRitmosV2(CANCIONES, RITMOS_V2, {\n  preferMuineiraVellaTumm: true,\n  inferVariantsFromNotas: true,\n});\n`;

// Append import at top (after any strict or docblocks, simply at index 0)
content = importStatement + content + exportStatement;

fs.writeFileSync('src/data/panderetaData.js', content, 'utf8');
console.log('Appended CANCIONES_V2');
