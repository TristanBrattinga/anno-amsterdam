import { api } from '$lib/server'

// On page load
export const load = async () => {
	// Fetch building list
	const buildings = await api.getBuildings()

	return { buildings }
}
