import type { ParamMatcher } from '@sveltejs/kit'

// Only accept integers as a segment in the URL
export const match: ParamMatcher = (param) => {
	return /^\d+$/.test(param)
}
