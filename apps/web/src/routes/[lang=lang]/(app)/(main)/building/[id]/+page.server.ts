import { api } from '$lib/server'

export const load = async ({ params }) => {
	const building = await api.getBuilding(params.id)

	return { building }
}
