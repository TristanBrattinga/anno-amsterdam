import { writable } from 'svelte/store';

export const location = writable<{ lat: number; lng: number } | null>(null);
export const locWatchId = writable<number | null>(null);
export const locError = writable<GeolocationPositionError | null>(null);
