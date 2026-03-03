const fs = require('fs');
let content = fs.readFileSync('src/data/panderetaData.js', 'utf8');

const newRitmosV2 = `export const RITMOS_V2 = [
  {
    id: 'muineira-base',
    nombre: 'Muiñeira (Base)',
    genero: 'Muiñeira',
    compas: '6/8',
    patron: 'ti - ti - co | ti - ti - co',
    patron_array: ['ti', 'ti', 'co', 'ti', 'ti', 'co'],
    descripcion: 'Patrón base de muiñeira: dos golpes de yemas (ti) y cierre con pulgar (co), repetido en 6/8.',
    dificultad: 'Básica',
    region: 'Galicia',
    variant_of: null,
    tags: ['base']
  },
  {
    id: 'muineira-vella-tumm',
    nombre: 'Muiñeira (Con grave / tumm)',
    genero: 'Muiñeira',
    compas: '6/8',
    patron: 'tumm - ti - co | tumm - ti - co',
    patron_array: ['tumm', 'ti', 'co', 'tumm', 'ti', 'co'],
    descripcion: 'Variante donde el primer golpe se marca como grave/sordo (tumm) para destacar el pulso fuerte.',
    dificultad: 'Intermedia',
    region: 'Galicia',
    variant_of: 'muineira-base',
    tags: ['vella', 'tumm']
  },
  {
    id: 'muineira-con-trr',
    nombre: 'Muiñeira (Con riscado / trr)',
    genero: 'Muiñeira',
    compas: '6/8',
    patron: 'ti - trr - co | ti - trr - co',
    patron_array: ['ti', 'trr', 'co', 'ti', 'trr', 'co'],
    descripcion: 'Variante con riscado (trr) como ornamentación. Mantén la regla: trr suele cerrar con co.',
    dificultad: 'Intermedia',
    region: 'Galicia',
    variant_of: 'muineira-base',
    tags: ['con-trr']
  },
  {
    id: 'jota-base',
    nombre: 'Jota (Base)',
    genero: 'Jota',
    compas: '3/4 (o 6/8 según escuela)',
    patron: 'ti - co - ti - co - ti - co - ti',
    patron_array: ['ti', 'co', 'ti', 'co', 'ti', 'co', 'ti'],
    descripcion: 'Patrón base de jota como alternancia continua ti/co. Útil como plantilla inicial para variantes.',
    dificultad: 'Básica',
    region: 'Galicia',
    variant_of: null,
    tags: ['base']
  },
  {
    id: 'jota-con-tumm',
    nombre: 'Jota (Con grave)',
    genero: 'Jota',
    compas: '3/4',
    patron: 'tumm - co - ti - co - ti - co - ti',
    patron_array: ['tumm', 'co', 'ti', 'co', 'ti', 'co', 'ti'],
    descripcion: 'Variante de jota acentuando el principio con grave.',
    dificultad: 'Intermedia',
    region: 'Galicia',
    variant_of: 'jota-base',
    tags: ['con-tumm']
  },
  {
    id: 'jota-con-trr',
    nombre: 'Jota (Con riscado)',
    genero: 'Jota',
    compas: '3/4',
    patron: 'ti - co - trr - co - ti - co - ti',
    patron_array: ['ti', 'co', 'trr', 'co', 'ti', 'co', 'ti'],
    descripcion: 'Variante de jota adornada con riscado intermedio.',
    dificultad: 'Avanzada',
    region: 'Galicia',
    variant_of: 'jota-base',
    tags: ['con-trr']
  },
  {
    id: 'jota-mixta',
    nombre: 'Jota (Mixta)',
    genero: 'Jota',
    compas: '3/4',
    patron: 'tumm - co - trr - co - ti - co - ti',
    patron_array: ['tumm', 'co', 'trr', 'co', 'ti', 'co', 'ti'],
    descripcion: 'Jota con acento grave y riscado.',
    dificultad: 'Avanzada',
    region: 'Galicia',
    variant_of: 'jota-base',
    tags: ['con-tumm', 'con-trr']
  },
  {
    id: 'pasodoble-base',
    nombre: 'Pasodoble (Base)',
    genero: 'Pasodoble',
    compas: '2/4',
    patron: 'ti - co | ti - co',
    patron_array: ['ti', 'co', 'ti', 'co'],
    descripcion: 'Patrón binario simple. Muy estable para acompañamiento y aprendizaje.',
    dificultad: 'Básica',
    region: 'Galicia',
    variant_of: null,
    tags: ['base']
  },
  {
    id: 'pasodoble-con-tumm',
    nombre: 'Pasodoble (Con grave)',
    genero: 'Pasodoble',
    compas: '2/4',
    patron: 'tumm - co | ti - co',
    patron_array: ['tumm', 'co', 'ti', 'co'],
    descripcion: 'Pasodoble acentuando fuerte el primer tiempo.',
    dificultad: 'Intermedia',
    region: 'Galicia',
    variant_of: 'pasodoble-base',
    tags: ['con-tumm']
  },
  {
    id: 'pasodoble-con-trr',
    nombre: 'Pasodoble (Con riscado)',
    genero: 'Pasodoble',
    compas: '2/4',
    patron: 'ti - co | trr - co',
    patron_array: ['ti', 'co', 'trr', 'co'],
    descripcion: 'Pasodoble adornado con riscado al final.',
    dificultad: 'Avanzada',
    region: 'Galicia',
    variant_of: 'pasodoble-base',
    tags: ['con-trr']
  },
  {
    id: 'pasodoble-mixta',
    nombre: 'Pasodoble (Mixto)',
    genero: 'Pasodoble',
    compas: '2/4',
    patron: 'tumm - co | trr - co',
    patron_array: ['tumm', 'co', 'trr', 'co'],
    descripcion: 'Variación compleja de pasodoble.',
    dificultad: 'Avanzada',
    region: 'Galicia',
    variant_of: 'pasodoble-base',
    tags: ['con-tumm', 'con-trr']
  },
  {
    id: 'rumba-base',
    nombre: 'Rumba (Base)',
    genero: 'Rumba',
    compas: '4/4',
    patron: 'ti - co - ti - co',
    patron_array: ['ti', 'co', 'ti', 'co'],
    descripcion: 'Base simétrica en 4/4. A partir de aquí se añaden desplazamientos y trr como recurso.',
    dificultad: 'Básica',
    region: 'Galicia',
    variant_of: null,
    tags: ['base']
  },
  {
    id: 'rumba-con-tumm',
    nombre: 'Rumba (Con grave)',
    genero: 'Rumba',
    compas: '4/4',
    patron: 'tumm - co - ti - co',
    patron_array: ['tumm', 'co', 'ti', 'co'],
    descripcion: 'Base de rumba marcando el inicio.',
    dificultad: 'Intermedia',
    region: 'Galicia',
    variant_of: 'rumba-base',
    tags: ['con-tumm']
  },
  {
    id: 'rumba-con-trr',
    nombre: 'Rumba (Con riscado)',
    genero: 'Rumba',
    compas: '4/4',
    patron: 'ti - co - trr - co',
    patron_array: ['ti', 'co', 'trr', 'co'],
    descripcion: 'Adorno común de rumba.',
    dificultad: 'Avanzada',
    region: 'Galicia',
    variant_of: 'rumba-base',
    tags: ['con-trr']
  },
  {
    id: 'rumba-mixta',
    nombre: 'Rumba (Mixta)',
    genero: 'Rumba',
    compas: '4/4',
    patron: 'tumm - co - trr - co',
    patron_array: ['tumm', 'co', 'trr', 'co'],
    descripcion: 'Rumba con todos los adornos tradicionales.',
    dificultad: 'Avanzada',
    region: 'Galicia',
    variant_of: 'rumba-base',
    tags: ['con-tumm', 'con-trr']
  },
  {
    id: 'maneo-base',
    nombre: 'Maneo (Base)',
    genero: 'Maneo',
    compas: '6/8 (frecuente)',
    patron: 'ti - co - ti - co',
    patron_array: ['ti', 'co', 'ti', 'co'],
    descripcion: 'Plantilla base para maneo. En muchas escuelas se trabaja como alternancia rápida con rotación continua.',
    dificultad: 'Intermedia',
    region: 'Galicia',
    variant_of: null,
    tags: ['base']
  },
  {
    id: 'maneo-con-tumm',
    nombre: 'Maneo (Con grave)',
    genero: 'Maneo',
    compas: '6/8',
    patron: 'tumm - co - ti - co',
    patron_array: ['tumm', 'co', 'ti', 'co'],
    descripcion: 'Maneo acentuado.',
    dificultad: 'Avanzada',
    region: 'Galicia',
    variant_of: 'maneo-base',
    tags: ['con-tumm']
  },
  {
    id: 'maneo-con-trr',
    nombre: 'Maneo (Con riscado)',
    genero: 'Maneo',
    compas: '6/8',
    patron: 'ti - co - trr - co',
    patron_array: ['ti', 'co', 'trr', 'co'],
    descripcion: 'Maneo de exhibición.',
    dificultad: 'Avanzada',
    region: 'Galicia',
    variant_of: 'maneo-base',
    tags: ['con-trr']
  },
  {
    id: 'maneo-mixta',
    nombre: 'Maneo (Mixto)',
    genero: 'Maneo',
    compas: '6/8',
    patron: 'tumm - co - trr - co',
    patron_array: ['tumm', 'co', 'trr', 'co'],
    descripcion: 'Máxima complejidad de maneo ibérico.',
    dificultad: 'Avanzada',
    region: 'Galicia',
    variant_of: 'maneo-base',
    tags: ['con-tumm', 'con-trr']
  },
  {
    id: 'alala-libre',
    nombre: 'Alalá (Libre)',
    genero: 'Alalá',
    compas: 'Libre',
    patron: '(libre)',
    patron_array: [],
    descripcion: 'Alalá: canto de ritmo libre. En la app debe permitir anotación sin patrón fijo (eventos sueltos).',
    dificultad: 'Avanzada',
    region: 'Galicia',
    variant_of: null,
    tags: ['base']
  }
];`;

content = content.replace(/export const RITMOS_V2 = \[[\s\S]*?\];/m, newRitmosV2);

content = content.replace(/ritmo_id: '(.*?)'/g, (match, p1) => {
    switch (p1) {
        case 'muineira-simple': return "ritmo_id: 'muineira-base',\n        ritmo_variant_id: 'muineira-base'";
        case 'muineira-picada': return "ritmo_id: 'muineira-base',\n        ritmo_variant_id: 'muineira-con-trr'";
        case 'jota': return "ritmo_id: 'jota-base'";
        case 'pasodoble': return "ritmo_id: 'pasodoble-base'";
        case 'rumba': return "ritmo_id: 'rumba-base'";
        case 'maneo': return "ritmo_id: 'maneo-base'";
        case 'ribeirana': return "ritmo_id: 'muineira-base',\n        ritmo_variant_id: 'muineira-vella-tumm'";
        case 'alala': return "ritmo_id: 'alala-libre'";
        default: return match;
    }
});
fs.writeFileSync('src/data/panderetaData.js', content, 'utf8');
console.log('Done');
