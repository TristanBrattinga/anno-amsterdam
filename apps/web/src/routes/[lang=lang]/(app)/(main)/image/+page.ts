import { i18nObject } from '$i18n/i18n-util'
import type { MetaTagsProps } from 'svelte-meta-tags'

// On page load
export const load = async ({ parent }) => {
	// Load the locale
	const { locale } = await parent()
	const LL = i18nObject(locale)

	// Meta tags
	const title = 'Image upload'
	const pageMetaTags = Object.freeze({
		title,
		openGraph: { title }
	}) satisfies MetaTagsProps

	return {
		pageMetaTags,
		list: LL.list()
	}
}