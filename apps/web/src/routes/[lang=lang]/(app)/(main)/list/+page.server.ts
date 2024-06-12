import { api, handleError } from '$lib/server'

// On page load
export const load = async () => {
	// Fetch building list
	try {
		const buildings = await api.getBuildings()
		return { buildings }
	} catch (e) {
		return handleError(e)
	}
}
