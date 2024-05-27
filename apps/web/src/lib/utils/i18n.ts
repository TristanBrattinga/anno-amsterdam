import { base } from '$app/paths'

/**
 * Replaces the locale slug in a URL.
 *
 * If the `full` argument is set to `true`, the full URL is returned as a string.
 * e.g. https://mywebsite.com/en/blog/article-1 => https://mywebsite.com/de/blog/article-1
 *
 * Otherwise (default) the URL relative to the base is returned.
 * e.g. https://mywebsite.com/en/blog/article-1 => /de/blog/article-1
 * @param url The URL to replace the locale in
 * @param locale The locale to set
 * @param full Wether to return the full URL or just the path
 * @returns The URL with the new locale
 */
export const replaceLocaleInUrl = (url: URL, locale: string, full = false): string => {
	const [, , ...rest] = getPathnameWithoutBase(url).split('/')
	const new_pathname = `/${[locale, ...rest].join('/')}`.replace(/\/{2,}/g, '/')
	if (!full) {
		return `${new_pathname}${url.search}`
	}
	const newUrl = new URL(url.toString())
	newUrl.pathname = base + new_pathname
	return newUrl.toString()
}

const REGEX_START_WITH_BASE = new RegExp(`^${base}`)
export const getPathnameWithoutBase = (url: URL) => url.pathname.replace(REGEX_START_WITH_BASE, '')
