// src/stores/buildings.ts
import { writable } from 'svelte/store';
import type { Building } from '$types';

export const buildings = writable<Building[]>([]);

export const fetchBuildings = async (params: URLSearchParams) => {
    const response = await fetch(`/api/buildings?${ params.toString() }`);
    const data = await response.json();
    buildings.set(data);
};
