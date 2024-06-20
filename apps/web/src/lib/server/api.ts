import { API_BASE_URL } from '$env/static/private'
import { error } from '@sveltejs/kit'
import { normalizeURL } from '$lib'
import type { Building, BuildingSortBy, Coords } from '$types'

/**
 * Gets the full URL for an API path
 * @param path The relative path
 * @returns The full URL
 */
const url = (path: string) => normalizeURL(API_BASE_URL) + path

export const api = {
	/**
	 * Fetches a list of buildings
	 * @param limit The number of buildings to fetch
	 * @param offset The offset to start from
	 * @returns A list of buildings
	 */
	getBuildings: async (
		limit = 10,
		offset = 0,
		sortBy: BuildingSortBy = 'default',
		location?: Coords,
		search?: string
	): Promise<Building[]> => {
		try {
			const params = new URLSearchParams()
			params.set('limit', limit.toString())
			params.set('offset', offset.toString())
			params.set('sortBy', sortBy)
			if (search) params.set('q', search)
			if (location) {
				params.set('lat', location.lat.toString())
				params.set('lng', location.lng.toString())
			}
			const res = await fetch(url(`buildings/?${params.toString()}`))
			if (res.ok) return await res.json()
			error(res.status, await res.text())
		} catch (e) {
			error(500, e instanceof Error ? e.message : JSON.stringify(e))
		}
	},

	/**
	 * Creates a new building
	 * @param building The building data
	 * @returns The created building
	 */
	createBuilding: async (building: Exclude<Building, 'id'>): Promise<Building> => {
		try {
			const res = await fetch(url('buildings/'), {
				method: 'POST',
				headers: {
					origin: 'http://localhost:5174'
				},
				body: JSON.stringify(building)
			})
			if (res.ok) return await res.json()
			error(res.status, await res.text())
		} catch (e) {
			error(500, e instanceof Error ? e.message : JSON.stringify(e))
		}
	},

	/**
	 * Fetches a single building
	 * @param id The id of the building to fetch
	 * @returns The fetched building
	 */
	getBuilding: async (id: number): Promise<Building> => {
		try {
			const res = await fetch(url(`buildings/${id}`))
			if (res.ok) return await res.json()
			error(res.status, await res.text())
		} catch (e) {
			error(500, e instanceof Error ? e.message : JSON.stringify(e))
		}
	},

	/**
	 * Updates a building
	 * @param id The id of the building to update
	 * @param building The new building data
	 * @returns The updated building
	 */
	updateBuilding: async (id: number, building: Partial<Building>): Promise<Building> => {
		try {
			const res = await fetch(url(`buildings/${id}`), {
				method: 'PUT',
				body: JSON.stringify(building)
			})
			if (res.ok) return await res.json()
			error(res.status, await res.text())
		} catch (e) {
			error(500, e instanceof Error ? e.message : JSON.stringify(e))
		}
	},

	/**
	 * Deletes a building
	 * @param id The id of the building to delete
	 */
	deleteBuilding: async (id: number): Promise<void> => {
		try {
			const res = await fetch(url(`buildings/${id}`), { method: 'DELETE' })
			if (res.ok) return
			error(res.status, await res.text())
		} catch (e) {
			error(500, e instanceof Error ? e.message : JSON.stringify(e))
		}
	}
}
