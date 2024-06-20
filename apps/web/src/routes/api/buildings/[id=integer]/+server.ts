import { json } from '@sveltejs/kit'
import * as database from '$lib/server/database'

// Gets a building by id
export async function GET({ params }) {
	const result = await database.getBuilding(+params.id)
	if (!result) return json({ detail: 'Building not found' }, { status: 404 })
	return json(result.toObject(), { status: 200 })
}

// Updates a building by id
export async function PUT({ params, request }) {
	const body = await request.json()
	const result = await database.updateBuilding(+params.id, body)
	if (!result) return json({ detail: 'Building not found' }, { status: 404 })
	return json(result.toObject(), { status: 200 })
}

// Deletes a building by id
export async function DELETE({ params }) {
	const result = await database.deleteBuilding(+params.id)
	if (result) return json({ detail: 'Building not found' }, { status: 404 })
	return new Response(null, { status: 204 })
}
