import { i18nObject } from '$i18n/i18n-util'
import type { MetaTagsProps } from 'svelte-meta-tags'

export const load = async ({ parent, data: { building } }) => {
	const { locale } = await parent()
	const LL = i18nObject(locale)

	const title = building.name
	const pageMetaTags = Object.freeze({
		title,
		openGraph: { title }
	}) satisfies MetaTagsProps

	return {
		pageMetaTags,
		back: LL.back(),
		building
	}
}