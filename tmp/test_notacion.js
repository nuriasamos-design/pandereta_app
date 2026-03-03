import { validarPatron } from '../src/skills/notacion-tradicional.js';

const testPatron = "TA-ti-co | ris-co-ti";
const result = validarPatron(testPatron);

console.log("--- TEST DE NOTACIÓN ---");
console.log("Entrada:", testPatron);
console.log("Válido:", result.valido);
console.log("Normalizado:", result.normalizado);
if (result.errores.length > 0) {
    console.log("Errores:", result.errores);
}
console.log("------------------------");
