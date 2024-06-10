import { API_BASE_URL } from '$env/static/private'
import { error } from '@sveltejs/kit'
import { normalizeURL } from '$lib'
import type { Building } from '$types'

const url = (path: string) => normalizeURL(API_BASE_URL) + path

export const api = {
	getBuildings: async (): Promise<Building[]> => {
		try {
			const res = await fetch(url('buildings/'))
			if (res.ok) return await res.json()
			error(res.status, await res.text())
		} catch (e) {
			error(500, e instanceof Error ? e.message : JSON.stringify(e))
		}
	},
	createBuilding: async (building: Exclude<Building, 'id'>): Promise<Building> => {
		try {
			const res = await fetch(url('buildings/'), { method: 'POST', body: JSON.stringify(building) })
			if (res.ok) return await res.json()
			error(res.status, await res.text())
		} catch (e) {
			error(500, e instanceof Error ? e.message : JSON.stringify(e))
		}
	},
	getBuilding: async (id: number): Promise<Building> => {
		try {
			const res = await fetch(url(`buildings/${id}`))
			if (res.ok) return await res.json()
			error(res.status, await res.text())
		} catch (e) {
			error(500, e instanceof Error ? e.message : JSON.stringify(e))
		}
	},
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
