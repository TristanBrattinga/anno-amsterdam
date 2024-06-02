/*import { API_BASE_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { normalizeURL } from '$lib';*/
import type { Building } from '$types'

import { BUILDINGS_MOCK } from '$lib'
import { error } from '@sveltejs/kit'

//const url = (path: string) => normalizeURL(API_BASE_URL) + path;

export const api = {
	getBuildings: async (): Promise<Building[]> => {
		return BUILDINGS_MOCK
		/*try {
			const res = await fetch(url('buildings/?format=json/'));
			if (res.ok) return await res.json();
			error(res.status, await res.text());
		} catch (e) {
			error(500, e instanceof Error ? e.message : '');
		}*/
	},
	getBuilding: async (id: string): Promise<Building> => {
		const match = BUILDINGS_MOCK.find((building) => building._id === id)
		if (match) return match
		throw error(404, `Building with id ${id} not found`)
	}
}
