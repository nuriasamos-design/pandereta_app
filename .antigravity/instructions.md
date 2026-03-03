# Instrucciones de Proyecto: Pandereta App

## Principio de Aislamiento

Este proyecto sigue una arquitectura de aislamiento para proteger el núcleo estable de cambios accidentales.

### Reglas de Acceso (Regla de "Fuegos")

- **/stable/**: Este directorio contiene el código base validado y funcional. Los archivos aquí son de **SOLO LECTURA**. La regla de "Fuegos" establece que la IA no puede modificar nada en `/stable/` una vez verificado, para evitar roturas en el núcleo del sistema.
- **/src/skills/**: Lógica de negocio (notación, rítmica, etc.). Estos archivos pueden ser referenciados pero deben mantenerse puros de lógica de UI.
- **/src/ui/theme/**: Contiene la identidad visual etnográfica (SVG, tokens, estilos). Marcado como **#ESTABLE**. No puede ser alterado tras la fase de diseño profesional para asegurar la coherencia estética.
- **/src/ui/**: Espacio de trabajo activo para la interfaz de usuario.

## Configuración Técnica

- **Framework**: Vite + React
- **PWA**: La aplicación debe ser una PWA funcional para permitir su instalación en dispositivos Android sin necesidad de una tienda de aplicaciones.
- **Design System**: Priorizar el uso de CSS Grid y Flexbox para asegurar que los elementos interactivos tengan un área de impacto mínima de 44x44px (estándar táctil).

## Estrategia de Commits

Se utilizará el estándar **Conventional Commits** para el historial del proyecto. Cada cambio realizado debe seguir este formato:

- `feat:` Nuevas funcionalidades (ej. en `src/ui`).
- `fix:` Corrección de errores.
- `docs:` Cambios en la documentación.
- `chore:` Tareas de mantenimiento (ej. `package.json`, `.github/`).

## Despliegue y CI/CD

El archivo `.github/workflows/deploy.yml` gestiona el despliegue automático a GitHub Pages. Esto proporciona una URL segura (HTTPS) para que el dispositivo Android pueda instalar la PWA correctamente.
