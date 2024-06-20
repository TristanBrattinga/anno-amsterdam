import { json } from '@sveltejs/kit'
import * as database from '$lib/server/database'

import type { Building, BuildingSortBy } from '$types'
import { getDistance } from '$lib'

// Gets a list of buildings
export async function GET({ url }) {
	const limit = parseInt(url.searchParams.get('limit') || '10')
	const offset = parseInt(url.searchParams.get('offset') || '0')
	const sortBy = (url.searchParams.get('sortBy') as BuildingSortBy) || 'default'
	const search = url.searchParams.get('q') || undefined
	const lat = parseFloat(url.searchParams.get('lat') || '0')
	const lng = parseFloat(url.searchParams.get('lng') || '0')
	const location = lat && lng ? { lat, lng } : undefined

	const result = await database.getBuildings(limit, offset, sortBy, search)

	const buildings: Building[] = result.map((doc) => {
		const building: Building = doc.toObject()
		if (location) {
			const distance = getDistance(location, {
				lat: building.location.coordinates[0],
				lng: building.location.coordinates[1]
			})
			building.distance = distance
		}
		return building
	})

	if (sortBy === 'distance' && location) {
		return json(
			buildings.sort((a, b) => (a.distance || 0) - (b.distance || 0)),
			{ status: 200 }
		)
	}
	return json(buildings, { status: 200 })
}

// Creates a new building
export async function POST({ request }) {
	const body = await request.json()
	const building = await database.createBuilding(body)
	return json(building.toObject(), { status: 201 })
}
