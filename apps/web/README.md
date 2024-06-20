# ANNO-AMSTERDAM - Web App

This is the web app for the ANNO AMSTERDAM project. Please refer to the [main README.md](../../README.md) for more information about the project as a whole.

## Developing

For internationalization, we use [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n). Uou can find the translations in [src/i18n](./src/i18n/). To modify the translations, use the following script:

```bash
yarn typesafe-i18n
```

This will listen for changes in the `src/i18n/` directory and update the generated files accordingly.

## Project Structure

This project follows the [SvelteKit](https://kit.svelte.dev/docs/project-structure) project structure. You can find the main files in the `src/` directory.
