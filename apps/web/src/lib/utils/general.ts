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
