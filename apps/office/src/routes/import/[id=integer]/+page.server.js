import { api, bagApi} from '$lib/server';
import {error} from "@sveltejs/kit";

export const load = async ({ params }) => {
	try {
		const building = await api.getBuilding(params.id);
		const buildingBag = await bagApi.getBuildingBag(building.bag_id);
		return { building, buildingBag };
	} catch (err) {
		console.error(err);
		throw error(500, 'Failed to load building data');
	}
};

