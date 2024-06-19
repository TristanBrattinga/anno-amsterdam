import { imageApi } from '$lib/server'

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const file = data.get('image') as File
		console.log('file', file)
		const result = await imageApi.uploadImage(file)
		return { url: result.url }
	}
}
