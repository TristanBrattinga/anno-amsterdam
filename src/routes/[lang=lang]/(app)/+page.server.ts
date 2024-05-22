import type { Building } from '$types';
//import { api } from '$lib/server';

export const load = async () => {
	//const buildings = await api.getBuildings();

	const buildings: Building[] = [];

	return { buildings };
};
