import { connectDB, BuildingSchema } from '$lib/server/mongodb'
import type { BuildingSortBy, NewBuilding } from '$types'

/**
 * Gets a list of buildings
 * @param limit The number of buildings to return
 * @param offset The offset to start from
 * @param sortBy The field to sort by
 * @returns A list of buildings
 */
export const getBuildings = async (limit = 10, offset = 0, sortBy: BuildingSortBy = 'default') => {
	try {
		await connectDB()
		let query = BuildingSchema.find().skip(offset).limit(limit)
		if (sortBy === 'name') query = query.sort({ name: 1 })
		else if (sortBy === 'year') query = query.sort({ construction_year: 1 })

		const result = await query.exec()
		return result
	} catch (e) {
		throw new Error('Database Error', { cause: e })
	}
}

/**
 * Gets a single building
 * @param id The id of the building to get
 * @returns The building or null if not found
 */
export const getBuilding = async (id: number) => {
	await connectDB()
	const match = await BuildingSchema.findOne({ id }).exec()
	return match || null
}

/**
 * Creates a new building
 * @param building The building data
 * @returns The building that was created
 */
export const createBuilding = async (building: NewBuilding) => {
	const id = (Math.random() * 1000).toFixed(0)
	const newBuilding = { ...building, id }
	await connectDB()
	const result = await BuildingSchema.create(newBuilding)
	return result
}

/**
 * Updates a building
 * @param id The id of the building to update
 * @param updated The updated building data
 * @returns The updated building or null if not found
 */
export const updateBuilding = async (id: number, updated: Partial<NewBuilding>) => {
	const building = getBuilding(id)
	if (!building) return null
	const updatedBuilding = { ...building, ...updated }
	await connectDB()
	const result = await BuildingSchema.updateOne({ id }, updatedBuilding).exec()
	if (result.acknowledged && result.modifiedCount) return updatedBuilding
	return null
}

/**
 * Deletes a building
 * @param id The id of the building to delete
 * @returns Wether the building was deleted
 */
export const deleteBuilding = async (id: number): Promise<boolean> => {
	await connectDB()
	const result = await BuildingSchema.deleteOne({ id }).exec()
	return result.acknowledged && result.deletedCount === 1
}
