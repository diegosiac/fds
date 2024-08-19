# Utilidades para crear flashcards para Anki

## Requisitos

- Node.js
- Playwright
- OpenAI API Key

## Instalación

```bash
npm install
```

## Ejecución

### Scrap

Si necesitar scrapear nuevas preguntas, puedes ejecutar el siguiente comando:

```bash
npm run scrap
```

### Traducir

Si necesitar traducir las preguntas scrapeadas, puedes ejecutar el siguiente comando:

> [!WARNING]
> Ten en cuenta en los tokens que se utilizan para la traducción. Si la pregunta es muy larga, puede consumir demasiado tiempo y tokens.

El modelo utilizado para la traducción es `gpt-4o` puedes cambiarlo en el archivo `src/translate.ts`.

```bash
npm run traduce
```

### Generar archivo para Anki

Para generar el archivo para importar en Anki, puedes ejecutar el siguiente comando:

```bash
npm run generate
```
