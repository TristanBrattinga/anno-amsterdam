import mongoose from 'mongoose'
import { getDistance } from '$utils'
import type { Building, BuildingSortBy, Coords } from '$types'
import { MONGODB_URI } from '$env/static/private'

const clientOptions: mongoose.ConnectOptions = {
	serverApi: { version: '1', strict: true, deprecationErrors: true }
}

const connectDB = async () => {
	try {
		if (!mongoose.connection.readyState || mongoose.connection.readyState === 99) {
			await mongoose.connect(MONGODB_URI, clientOptions)
		}
	} catch (e) {
		console.error('Error while connecting to database', e)
	}
}

const BuildingSchema = mongoose.model(
	'Building',
	new mongoose.Schema({
		id: { type: Number, required: true },
		location: {
			type: { type: String, enum: ['Point'], required: true },
			coordinates: { type: [Number], required: true }
		},
		name: { type: String, required: true },
		address: { type: String, required: true },
		construction_year: { type: Number, required: true },
		type_of_user: {
			type: String,
			enum: ['residential', 'industrial', 'commercial', 'educational', 'recreational']
		},
		tags: { type: Map, of: [String], required: true },
		description: { type: String },
		image_urls: {
			type: [
				{
					url: { type: String, required: true },
					source: { type: String, required: true },
					year: { type: Number, required: true },
					is_main: { type: Boolean, required: true }
				}
			],
			required: true
		},
		timeline: { type: [String] }
	})
)

/**
 * Gets a list of buildings
 * @param limit The number of buildings to return
 * @param offset The offset to start from
 * @returns A list of buildings
 */
export const getBuildings = (
	limit = 10,
	offset = 0,
	sortBy: BuildingSortBy = 'default',
	location?: Coords
): Building[] => {
	return Array.from(database.values())
		.slice(offset, offset + limit)
		.map((building) => {
			let distance = building.distance
			if (location && !distance) {
				const coords = building.location.coordinates
				distance = getDistance({ lat: coords[0], lng: coords[1] }, location)
			}
			return { ...building, distance }
		})
		.sort((a, b) => {
			if (sortBy === 'name') return a.name.localeCompare(b.name)
			else if (sortBy === 'distance') return (a.distance || 0) - (b.distance || 0)
			else if (sortBy === 'year') return a.construction_year - b.construction_year
			return 0
		})
}

/**
 * Gets a single building
 * @param id The id of the building to get
 * @returns The building or null if not found
 */
export const getBuilding = (id: number): Building | null => {
	const match = database.get(id)
	return match || null
}

/**
 * Creates a new building
 * @param building The building data
 * @returns The building that was created
 */
export const createBuilding = (building: Exclude<Building, 'id'>): Building => {
	const id = Math.random() * 1000
	const newBuilding = { ...building, id }
	database.set(id, newBuilding)
	return newBuilding
}

/**
 * Updates a building
 * @param id The id of the building to update
 * @param updated The updated building data
 * @returns The updated building or null if not found
 */
export const updateBuilding = (id: number, updated: Partial<Building>): Building | null => {
	const building = getBuilding(id)
	if (!building) return null
	const updatedBuilding = { ...building, ...updated }
	database.set(id, updatedBuilding)
	return updatedBuilding
}

/**
 * Deletes a building
 * @param id The id of the building to delete
 * @returns Wether the building was deleted
 */
export const deleteBuilding = (id: number): boolean => {
	return database.delete(id)
}
