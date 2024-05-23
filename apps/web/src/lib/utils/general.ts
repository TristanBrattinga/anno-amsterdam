/**
 * Normalizes a URL by ensuring it ends with a trailing slash.
 * @param url The URL to normalize.
 * @returns The normalized URL.
 */
export const normalizeURL = (url: string) => {
	if (url.endsWith('/')) return url;
	return url + '/';
};
