import { MAPBOX_API_TOKEN } from '$env/static/private';

export async function load() {
	return {
		props: {
			mapboxApiToken: MAPBOX_API_TOKEN
		}
	};
}
