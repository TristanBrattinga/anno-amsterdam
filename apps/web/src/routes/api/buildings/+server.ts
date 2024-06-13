import { json } from '@sveltejs/kit'
import * as database from '$lib/server/database'

// Gets a list of buildings
export function GET({ url }) {
	const limit = parseInt(url.searchParams.get('limit') || '10')
	const offset = parseInt(url.searchParams.get('offset') || '0')

	const buildings = database.getBuildings(limit, offset)
	return json(buildings, { status: 200 })
}

// Creates a new building
export async function POST({ request }) {
	const body = await request.json()
	const building = database.createBuilding(body)
	return json(building, { status: 201 })
}
