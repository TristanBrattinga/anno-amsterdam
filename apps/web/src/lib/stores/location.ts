// src/lib/stores/location.ts
import { writable } from 'svelte/store';
import { browser } from "$app/environment";

const storedLocation = browser && localStorage.getItem('location');
export const location = writable<{ lat: number; lng: number } | null>(
    storedLocation ? JSON.parse(storedLocation) : null
);
export const locWatchId = writable<number | null>(null);
export const locError = writable<GeolocationPositionError | null>(null);

if (browser) {
    location.subscribe((value) => {
        if (value) {
            localStorage.setItem('location', JSON.stringify(value));
        } else {
            localStorage.removeItem('location');
        }
    })
}
