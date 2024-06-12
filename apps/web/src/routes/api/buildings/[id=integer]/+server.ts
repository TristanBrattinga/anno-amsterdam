import { json } from '@sveltejs/kit'
import * as database from '$lib/server/database'

/**
 * Gets a building by id
 * @returns
 */
export function GET({ params }) {
	const result = database.getBuilding(+params.id)
	if (!result) return json({ detail: 'Building not found' }, { status: 404 })
	return json(result, { status: 200 })
}

/**
 * Updates a building by id
 * @returns
 */
export async function PUT({ params, request }) {
	const body = await request.json()
	const result = database.updateBuilding(+params.id, body)
	if (!result) return json({ detail: 'Building not found' }, { status: 404 })
	return json(result, { status: 200 })
}

/**
 * Deletes a building by id
 * @returns
 */
export function DELETE({ params }) {
	const result = database.deleteBuilding(+params.id)
	if (result) return json({ detail: 'Building not found' }, { status: 404 })
	return new Response(null, { status: 204 })
}
