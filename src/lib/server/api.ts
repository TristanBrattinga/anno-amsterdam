import { API_BASE_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { normalizeURL } from '$lib';
import type { Building } from '$types';

const url = (path: string) => normalizeURL(API_BASE_URL + path);

export const api = {
	getBuildings: async (): Promise<Building[]> => {
		try {
			const res = await fetch(url('buildings/?format=json'));
			if (res.ok) return await res.json();
			error(res.status, await res.text());
		} catch (e) {
			error(500, e instanceof Error ? e.message : '');
		}
	}
};
