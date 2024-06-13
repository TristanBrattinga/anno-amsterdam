import { i18nObject } from '$i18n/i18n-util'
import type { MetaTagsProps } from 'svelte-meta-tags'

// On page load
export const load = async ({ parent, data: { building } }) => {
	// Load the locale
	const { locale } = await parent()
	const LL = i18nObject(locale)

	// Meta tags
	const title = building.name
	const pageMetaTags = Object.freeze({
		title,
		openGraph: { title }
	}) satisfies MetaTagsProps

	return {
		pageMetaTags,
		back: LL.back(),
		residential: LL.residential(),
		commercial: LL.commercial(),
		industrial: LL.industrial(),
		arrowAlt: LL.arrowAlt(),
		recreational: LL.recreational(),
		educational: LL.educational(),
		building
	}
}
