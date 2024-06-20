import { isHttpError } from '@sveltejs/kit'

/**
 * Handles errors and returns a status code and error message
 * @param e The error to handle
 * @returns The status code and error message
 */
export const handleError = (e: unknown) => {
	if (isHttpError(e)) {
		return { status: e.status, error: e.body.message }
	} else {
		return {
			status: 500,
			error: e instanceof Error ? e.message : JSON.stringify(e)
		}
	}
}

/**
 * Parses a string parameter from a URL
 * @param url The URL to parse a parameter from
 * @param param The param to parse
 * @param defaultValue The default value if the param is not found
 * @returns The parsed string or the default value
 */
export const parseNumberParam = (url: URL, param: string, defaultValue: number): number => {
	try {
		const parsed = parseFloat(url.searchParams.get(param) || defaultValue.toString())
		return isNaN(parsed) ? defaultValue : parsed
	} catch (e) {
		return defaultValue
	}
}

/**
 * Converts a file to a base64 string
 * @param file The file to convert
 * @returns The base64 string
 */
export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = reject
	})
