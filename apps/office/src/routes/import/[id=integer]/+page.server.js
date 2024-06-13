import { api, bagApi } from '$lib/server';

export const load = async ({ params }) => {
	console.log(params.id);
	try {
		const building = await api.getBuilding(params.id);
		const buildingBag = await bagApi.getBuildingBag(building.bag_id);
		console.log(building, buildingBag);
		return { building, buildingBag };
	} catch (err) {
		console.error(err);
		throw error(500, 'Failed to load building data');
	}
};
