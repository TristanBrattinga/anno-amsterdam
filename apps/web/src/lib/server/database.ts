import { BUILDINGS_MOCK } from '$constants'

import type { Building } from '$types'

const database: Map<number, Building> = new Map()

BUILDINGS_MOCK.forEach((building) => {
	database.set(building.id, building)
})

export const getBuildings = (): Building[] => {
	return Array.from(database.values())
}

export const getBuilding = (id: number): Building | null => {
	const match = database.get(id)
	return match || null
}

export const createBuilding = (building: Exclude<Building, 'id'>): Building => {
	const id = Math.random()
	const newBuilding = { ...building, id }
	database.set(id, newBuilding)
	return newBuilding
}

export const updateBuilding = (id: number, updated: Partial<Building>): Building | null => {
	const building = getBuilding(id)
	if (!building) return null
	const updatedBuilding = { ...building, ...updated }
	database.set(id, updatedBuilding)
	return updatedBuilding
}

export const deleteBuilding = (id: number): boolean => {
	return database.delete(id)
}
