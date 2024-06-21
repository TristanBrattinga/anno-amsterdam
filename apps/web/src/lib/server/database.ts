import { BUILDINGS_MOCK } from '$constants'
import { getDistance, searchInBuilding } from '$utils'
import type { Building, BuildingSortBy, Coords, NewBuilding } from '$types'

const database: Map<number, Building> = new Map()

// Populate the database with mock data
BUILDINGS_MOCK.forEach((building) => {
	database.set(building.id, building)
})

/**
 * Gets a list of buildings
 * @param limit The number of buildings to return
 * @param offset The offset to start from
 * @param sortBy The field to sort by
 * @param location The user location for distance calculation
 * @param search The search query
 * @returns A list of buildings
 */
export const getBuildings = (
	limit = 10,
	offset = 0,
	sortBy: BuildingSortBy = 'default',
	location?: Coords,
	search?: string
): Building[] => {
	return Array.from(database.values())
		.slice(offset, offset + limit)
		.filter((building) => !search || searchInBuilding(building, search))
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
export const createBuilding = (building: NewBuilding): Building => {
	const id = Math.random() * 1000
	const newBuilding: Building = {
		...building,
		id,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString()
	}
	database.set(id, newBuilding)
	return newBuilding
}

/**
 * Updates a building
 * @param id The id of the building to update
 * @param updated The updated building data
 * @returns The updated building or null if not found
 */
export const updateBuilding = (id: number, updated: Partial<NewBuilding>): Building | null => {
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
