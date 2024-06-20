import { isHttpError } from '@sveltejs/kit'

/**
 * Handles a thrown error and returns a status code and error message.
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
 * Parses a string parameter from a URL to a number.
 * @param url The URL to parse a parameter from
 * @param param The paramater to parse
 * @param defaultValue The default value if the parameter is not found
 * @returns The parsed number or the default value
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
 * Converts a file to a base64 string.
 * @param file The file to convert
 * @returns THe base64 string
 */
export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = reject
	})
