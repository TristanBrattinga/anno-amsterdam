import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initialView = browser && localStorage.getItem('view');
export const viewMode = writable(initialView);

if (browser) {
    viewMode.subscribe(value => {
        localStorage.setItem("view", value === 'list' ? 'list' : 'grid');
    });
}
