import { isHttpError } from '@sveltejs/kit'

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

export const parseNumberParam = (url: URL, param: string, defaultValue: number): number => {
	try {
		const parsed = parseInt(url.searchParams.get(param) || defaultValue.toString())
		return isNaN(parsed) ? defaultValue : parsed
	} catch (e) {
		return defaultValue
	}
}
