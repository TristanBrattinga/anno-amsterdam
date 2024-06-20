import { api } from '$lib/server'

// On page load
export const load = async ({ params }) => {
	// Fetch building by id
	const building = await api.getBuilding(+params.id)

	return { building }
}
