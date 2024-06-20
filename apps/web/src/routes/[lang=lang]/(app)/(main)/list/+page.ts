import { i18nObject } from '$i18n/i18n-util'
import type { MetaTagsProps } from 'svelte-meta-tags'

// On page load
export const load = async ({ parent, data: { buildings, error, status } }) => {
	// Load the locale
	const { locale } = await parent()
	const LL = i18nObject(locale)

	// Meta tags
	const title = LL.list()
	const pageMetaTags = Object.freeze({
		title,
		openGraph: { title }
	}) satisfies MetaTagsProps

	return {
		pageMetaTags,
		moreInfo: LL.moreInfo(),
		sortBy: LL.sort(),
		distanceTo: LL.distanceTo(),
		map: LL.map(),
		noResults: LL.noResults(),
		buildingsTitle: LL.buildings(),
		buildings: buildings || [],
		fetchListError: LL.fetchListError(),
		error,
		status
	}
}
