# Instrucciones del Proyecto

## Reglas generales
- Trabajar solo dentro de la carpeta del proyecto actual, no explorar otras partes del PC.
- Stack principal: **TypeScript, Node.js, Express, React, TailwindCSS, Electron**.
- Indentación de **4 espacios**.
- Antes de realizar algo, presentar un plan al usuario y esperar su confirmación
- Usar arrow functions: `const fn = () => {}` en lugar de `function fn() {}`
- No escribir comentarios
- Añadir un comentario arriba "No verificado por humano", y cada vez que se realice un cambio en un archivo si no existe este comentario lo creas (Si no esta significa que fue verificado por un humano)

## Estructura de archivos
- Separar archivos por **features** (no por tipo de archivo global).
- Mantener archivos pequeños: si algo puede separarse en otro archivo, hacerlo.
- No mezclar HTML/CSS con lógica: separar con **custom hooks**.