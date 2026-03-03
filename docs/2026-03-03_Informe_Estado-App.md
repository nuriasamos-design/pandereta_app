# INFORME TÉCNICO: Pandereta App (Artesanía Dixital)

## 1) Identificación del Repositorio

* **Nombre del Proyecto**: `pandereta-app`
* **Rama actual**: `main`
* **Último commit**:
  * **Mensaje**: `feat: MonolinealScore SVG + 27 songs total + Xabier Diaz course integration`
  * **Fecha**: 2026-03-03
* **Stack Tecnológico**:
  * **Lenguaje**: JavaScript (ES6+) / React 18
  * **Build Tool**: Vite 4.4
  * **UI Framework**: Tailwind CSS
  * **Arquitectura**: SPA (Single Page Application) basada en Módulos Funcionales (App.jsx centraliza la lógica).
  * **Entorno**: Web / PWA (listo para instalación en Tablets Android via Chrome).

## 2) Árbol de Carpetas (Estructura Principal)

```text
d:\pandereta_app\
├── data/
│   ├── raw/                # Documentos originales (PDF, JPG)
│   └── processed/          # Salidas de procesamiento (JSON)
├── docs/                   # Documentación etnográfica y técnica
│   ├── antropologia/
│   └── organologia.md
├── pandereta/              # Material local recopilado (Cancioneiros PDF)
├── src/
│   ├── context/            # Estado global (PanderetaContext.jsx)
│   ├── data/               # Fuente de verdad: panderetaData.js
│   ├── skills/             # Lógica "inteligente" (OCR, Notación, Audio)
│   │   ├── detections-ritmica.js
│   │   ├── ingesta-ocr.js
│   │   └── notacion-tradicional.js
│   └── ui/                 # Componentes Visuales
│       ├── App.jsx         # Dashboard Principal
│       ├── components/     # Componentes atómicos (MonolinealScore, etc.)
│       └── theme/          # Iconografía y diseño
```

## 3) Build & Run

* **Comandos**:
  * `npm install` — Instalar dependencias.
  * `npm run dev` — Iniciar servidor de desarrollo (Vite).
  * `npm run build` — Generar el bundle de producción en `/dist`.
* **Estado actual**: ✅ **Compila y ejecuta correctamente**.

## 4) Dependencias Relevantes

* **Core**: `react` (^18.2), `react-dom`.
* **Icons**: `lucide-react` (usado en `App.jsx`).
* **Styling**: `tailwindcss` (base, components, utilities).
* **PWA**: `vite-plugin-pwa` (habilitado para instalación en Android Tablet).
* **Nota**: No se han implementado aún librerías de Audio (ExoPlayer/AudioRecord) ya que es un entorno Web; se recomienda usar **Web Audio API** o **Meyda.js**.

## 5) Navegación y Pantallas

* **Método**: Estado Condicional (`useState('seccion')`) en `App.jsx`. No requiere router externo para PWA ligera.
* **Pantallas Implementadas**:
    1. **Dashboard/Revisión**: Estado del proyecto y auditoría etnográfica.
    2. **Biblioteca de Ritmos**: Listado de 8 patrones Ti-Co y Editor Interactivo.
    3. **Cancionero**: Base de datos de 27 canciones con letra y notas (Source: NotebookLM/Cancioneiro).
    4. **Historia y Memoria**: Fichas de resistencia cultural y antropología.
    5. **Especificaciones**: Ficha técnica de organología (profesional vs iniciación).

## 6) Modelo de Datos "Canción"

* **Ruta**: `d:\pandereta_app\src\data\panderetaData.js`
* **Estructura**:

```json
{
  "id": 24,
  "titulo": "Pasodoble de A Illa",
  "genero": "Pasodoble",
  "region": "A Illa (A Coruña)",
  "ritmo_id": "pasodoble",
  "letra": "Asubía polo can...",
  "notas": "Canción de práctica del Curso Xabier Díaz."
}
```

## 7) Biblioteca

* **Estado**: ✅ Búsqueda funcional (título/región/letra), ✅ Filtros por género funcional, ❌ Favoritos (pendiente), ❌ Edición (pendiente).

## 8) Importación (Skills/Ingesta)

* **OCR (JPG/PDF/DOCX)**:
  * **Ruta**: `src/skills/ingesta-ocr.js`
  * **Estado**: Lógica de detección de género y extracción de coplas definida. Falta integración con API de OCR externa (Tesseract.js o Google Vision).
* **NotebookLM**: Datos extraídos manualmente e integrados en `panderetaData.js`.

## 9) Compositor de Notación (1 Línea)

* **Componente**: `src/ui/components/MonolinealScore.jsx`
* **Estado**: ✅ **Implementado**. Renderiza una línea staff única sobre Canvas/SVG.
* **Lógica**: Soporta secuencia dinámica de golpes.
* **Reglas de Renderizado**:
  * **ti**: Nota arriba de la línea (pronación).
  * **co**: Nota abajo de la línea (supinación).
  * **TA**: Nota con cruz `✕` en la línea (puño).
  * **ris**: Nota en rombo (técnica de riscado).

## 10) Audio (Shazam Rítmico)

* **Ruta**: `src/skills/deteccion-ritmica.js`
* **Estado**: ❌ Solo Lógica Teórica.
* **Pendiente**: Implementar escucha via Micrófono (Wave Audio API) y análisis de transitorios para detectar BPM y acentos.

## 11) Lista de TODOs Críticos

1. **Audio**: Conectar `MediaDevices.getUserMedia()` para entrada de audio real.
2. **Análisis**: Integrar `meyda` para extracción de espectro y detección de golpes `ti/co`.
3. **Favoritos**: Implementar `localStorage` para guardar canciones preferidas.
4. **Exportación**: Generar PDF de la partitura monolineal compuesta en el editor.
5. **Offline**: Configurar Service Worker completa para uso en foliadas sin cobertura.

---
> [!IMPORTANT]
> **Nota sobre Notación**:
> ti: arriba (negra) | co: abajo (negra) | tumm: azul (grave) | trr: azul + slashes (riscado)
