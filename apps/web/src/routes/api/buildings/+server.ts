import { json } from '@sveltejs/kit'
import * as database from '$lib/server/database'

import type { BuildingSortBy } from '$types'

// Gets a list of buildings
export function GET({ url }) {
	const limit = parseInt(url.searchParams.get('limit') || '10')
	const offset = parseInt(url.searchParams.get('offset') || '0')
	const sortBy = (url.searchParams.get('sortBy') as BuildingSortBy) || 'default'
	const lat = parseFloat(url.searchParams.get('lat') || '0')
	const lng = parseFloat(url.searchParams.get('lng') || '0')
	const location = lat && lng ? { lat, lng } : undefined

	const buildings = database.getBuildings(limit, offset, sortBy, location)
	return json(buildings, { status: 200 })
}

// Creates a new building
export async function POST({ request }) {
	const body = await request.json()
	const building = database.createBuilding(body)
	return json(building, { status: 201 })
}
