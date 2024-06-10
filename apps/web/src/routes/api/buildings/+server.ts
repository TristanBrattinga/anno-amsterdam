import { json } from '@sveltejs/kit'
import * as database from '$lib/server/database'

/**
 * Gets a list of buildings
 * @returns
 */
export function GET() {
	const buildings = database.getBuildings()
	return json(buildings, { status: 200 })
}

/**
 * Creates a new building
 * @returns
 */
export async function POST({ request }) {
	const body = await request.json()
	const building = database.createBuilding(body)
	return json(building, { status: 201 })
}
