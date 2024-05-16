import { API_BASE_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { Building } from 'types';

export const api = {
	getBuildings: async (): Promise<Building[]> => {
		try {
			const res = await fetch(`${API_BASE_URL}buildings/?format=json`);
			return await res.json();
		} catch (e) {
			error(500, e instanceof Error ? e.message : '');
		}
	}
};
