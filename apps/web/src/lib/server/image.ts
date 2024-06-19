import { IMG_API_BASE_URL } from '$env/static/private'
import { IMG_API_KEY } from '$env/static/private'
import { error } from '@sveltejs/kit'
import { normalizeURL } from '$lib'

/**
 * Gets the full URL for an API path
 * @param path The relative path
 * @returns The full URL
 */
const url = (path: string) => normalizeURL(IMG_API_BASE_URL) + path

export const imageApi = {
	/**
	 * Uploads an image to the image API
	 * @param image The image to upload
	 * @returns The URL of the uploaded image
	 */
	uploadImage: async (file: File): Promise<{ url: string }> => {
		try {
			const image = Buffer.from(await file.arrayBuffer()).toString('base64')
			if (!image) error(500, 'Failed to convert image to base64')

			const headers = new Headers()
			headers.set('Content-Type', 'application/x-www-form-urlencoded')

			const body = new URLSearchParams()
			body.append('image', image)

			const res = await fetch(
				url(`upload?key=${IMG_API_KEY}&name=${encodeURIComponent(file.name)}`),
				{ method: 'POST', headers, body, redirect: 'follow' }
			)
			if (!res.ok) error(res.status, await res.text())
			const result = await res.json()
			return { url: result.data.url }
		} catch (e) {
			error(500, e instanceof Error ? e.message : JSON.stringify(e))
		}
	}
}
