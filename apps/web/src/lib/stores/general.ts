import { writable } from 'svelte/store';

export const darkMode = writable(false);
export const location = writable<{ lat: number; lng: number } | null | false>(null);
