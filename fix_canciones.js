const fs = require('fs');
let content = fs.readFileSync('src/data/panderetaData.js', 'utf8');

content = content.replace(/ritmo_id:\s*'muineira-simple'/g, "ritmo_id: 'muineira-vella-tumm'");
content = content.replace(/ritmo_id:\s*'muineira-picada'/g, "ritmo_id: 'muineira-vella-tumm',\n        ritmo_variant_id: 'muineira-con-trr'");
content = content.replace(/ritmo_id:\s*'jota'/g, "ritmo_id: 'jota-base'");
content = content.replace(/ritmo_id:\s*'pasodoble'/g, "ritmo_id: 'pasodoble-base'");
content = content.replace(/ritmo_id:\s*'rumba'/g, "ritmo_id: 'rumba-base'");
content = content.replace(/ritmo_id:\s*'maneo'/g, "ritmo_id: 'maneo-base'");
content = content.replace(/ritmo_id:\s*'ribeirana'/g, "ritmo_id: 'muineira-vella-tumm'");
content = content.replace(/ritmo_id:\s*'alala'/g, "ritmo_id: 'alala-libre'");

fs.writeFileSync('src/data/panderetaData.js', content, 'utf8');
console.log('Done migrating CANCIONES');
