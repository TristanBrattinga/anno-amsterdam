import { api, handleError, parseNumberParam } from '$lib/server'
import type { BuildingSortBy } from '~~/src/lib/types/Form.js'

// On page load
export const load = async ({ url }) => {
	const limit = parseNumberParam(url, 'limit', 10)
	const offset = parseNumberParam(url, 'offset', 0)
	const sortBy = (url.searchParams.get('sort') as BuildingSortBy) || 'default'
	const lat = parseNumberParam(url, 'lat', 0)
	const lng = parseNumberParam(url, 'lng', 0)
	const location = lat && lng ? { lat, lng } : undefined

	// Fetch building list
	try {
		const buildings = await api.getBuildings(limit, offset, sortBy, location)
		return { buildings }
	} catch (e) {
		return handleError(e)
	}
}
