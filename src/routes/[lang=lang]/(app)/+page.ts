import { i18nObject } from '$i18n/i18n-util';
import { APP_NAME } from '$lib';
import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = async ({ parent, data: { buildings } }) => {
	const { locale } = await parent();
	const LL = i18nObject(locale);

	const title = LL.home();
	const pageMetaTags = Object.freeze({
		title,
		openGraph: { title }
	}) satisfies MetaTagsProps;

	return {
		welcome: LL.welcome({ app: APP_NAME }),
		buildings,
		pageMetaTags
	};
};
