// src/stores/languageStore.ts
import { writable } from 'svelte/store';
import type { Locales } from "$i18n/i18n-types";

export const selectedLanguage = writable<Locales>('nl'); // Initial value is 'nl'
