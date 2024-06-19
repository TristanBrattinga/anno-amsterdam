import type { Building } from '$types'

/**
 * Normalizes a URL by ensuring it ends with a trailing slash.
 * @param url The URL to normalize.
 * @returns The normalized URL.
 */
export const normalizeURL = (url: string) => {
	if (url.endsWith('/')) return url
	return url + '/'
}

export const parseNumberParam = (url: URL, param: string, defaultValue: number): number => {
	try {
		const parsed = parseFloat(url.searchParams.get(param) || defaultValue.toString())
		return isNaN(parsed) ? defaultValue : parsed
	} catch (e) {
		return defaultValue
	}
}

export const searchInBuilding = (building: Building, query: string): boolean => {
	if (!query) return false
	const q = query.toLowerCase()
	return (
		building.name.toLowerCase().includes(q) ||
		building.address.toLowerCase().includes(q) ||
		building.description?.toLowerCase().includes(q) ||
		building.construction_year.toString().includes(q) ||
		Object.values(building.tags).some((tags) => tags.some((tag) => tag.toLowerCase().includes(q)))
	)
}
