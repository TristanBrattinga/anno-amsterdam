import { i18nObject } from '$i18n/i18n-util.js';
import { APP_NAME } from '$lib';
import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = async ({ parent, data: { buildings } }) => {
	// wait for `+layout.ts` to load dictionary and pass locale information
	const { locale } = await parent();
	// if you need to output a localized string in a `load` function,
	// you always need to create a new `i18nObject` instance in each `load` function
	// to not run into shared server state issues
	const LL = i18nObject(locale);

	console.info(LL.log({ fileName: '+page.ts' }));

	const title = 'Home';
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
