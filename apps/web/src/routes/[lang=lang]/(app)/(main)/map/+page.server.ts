import { api } from '$lib/server'

export const load = async () => {
	const buildings = await api.getBuildings()

	return { buildings }
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		console.log('data', data)
	}
}
