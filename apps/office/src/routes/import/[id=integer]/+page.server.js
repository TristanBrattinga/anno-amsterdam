import { api, bagApi } from '$lib/server';
import { error, redirect } from '@sveltejs/kit';
import { createTimeline, parseAndTransformData } from '$utils';

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

export const actions = {
	default: async (event) => {
		console.log('test update');
		let form_input = await event.request.formData();
		const jsonData = Object.fromEntries(form_input.entries());
		const transformedData = parseAndTransformData(jsonData);
		const file = form_input.get('image');
		if (file) {
			const handleImageUrl = await handleUploadImage(file);
			transformedData.image_urls = [
				{
					url: handleImageUrl,
					source: form_input.get('imgSource') || '',
					description: form_input.get('imgDescription') || '',
					alt: form_input.get('imgAlt') || '',
					year: form_input.get('imgYear') || '',
					is_main: form_input.get('isMain') === 'on' || false
				}
			];
		}

		transformedData.timeline = createTimeline(jsonData);

		let newBuilding = null;
		let id = event.params.id;
		console.log('id', id);
		try {
			newBuilding = await api.updateBuilding(id, transformedData);
		} catch (e) {
			console.error(e);
		}
		if (newBuilding) {
			throw redirect(303, `/import/${newBuilding.id}`);
		}
	}
};
