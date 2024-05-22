import { i18nObject } from '$i18n/i18n-util';
import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = async ({ parent }) => {
	const { locale } = await parent();
	const LL = i18nObject(locale);

	const title = 'Settings';
	const pageMetaTags = Object.freeze({
		title,
		openGraph: { title }
	}) satisfies MetaTagsProps;

	return {
		light: LL.light(),
		dark: LL.dark(),
		system: LL.system(),
		theme: LL.theme(),
		lang: LL.lang(),
		pageMetaTags
	};
};
