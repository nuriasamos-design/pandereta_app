import { CANCIONES_V2 } from './src/data/panderetaData.js';

const resRisc = CANCIONES_V2.find(c => c.notas && c.notas.toLowerCase().includes('risc') && c.genero === 'Muiñeira');
const resVella = CANCIONES_V2.find(c => c.genero === 'Muiñeira' && c.id === 13);
const resPaso = CANCIONES_V2.find(c => c.genero === 'Pasodoble');

console.log('1) Muiñeira con riscado:', resRisc ? resRisc.ritmo_variant_id : 'NO ENCONTRADA');
console.log('2) Muiñeira cualquiera:', resVella ? resVella.ritmo_id : 'NO ENCONTRADA');
console.log('3) Pasodoble:', resPaso ? resPaso.ritmo_id : 'NO ENCONTRADO');
