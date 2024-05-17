import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { locales, baseLocale } from '$i18n/i18n-util';
import { i18nObject } from '$i18n/i18n-util';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { APP_NAME, replaceLocaleInUrl } from '$lib';

export const load = async ({ url, data: { locale } }) => {
	// load dictionary into memory
	await loadLocaleAsync(locale);
	// if you need to output a localized string in a `load` function,
	// you always need to create a new `i18nObject` instance in each `load` function
	// to not run into shared server state issues
	const LL = i18nObject(locale);

	console.info(LL.log({ fileName: '+layout.ts' }));

	const baseMetaTags = Object.freeze({
		title: APP_NAME,
		titleTemplate: `%s | ${APP_NAME}`,
		description: LL.description(),
		canonical: new URL(url.pathname, url.origin).href,
		languageAlternates: [
			...locales.map((l) => ({
				hrefLang: l,
				href: replaceLocaleInUrl(url, l, true)
			})),
			{
				hrefLang: 'x-default',
				href: replaceLocaleInUrl(url, baseLocale, true)
			}
		],
		openGraph: {
			type: 'website',
			url: new URL(url.pathname, url.origin).href,
			locale: 'nl_NL',
			title: APP_NAME,
			description: LL.description(),
			siteName: 'SiteName',
			images: [
				{
					url: 'https://www.example.ie/og-image.jpg',
					alt: 'Og Image Alt',
					width: 800,
					height: 600,
					secureUrl: 'https://www.example.ie/og-image.jpg',
					type: 'image/jpeg'
				}
			]
		}
	} satisfies MetaTagsProps);

	// pass locale to the "rendering context"
	return { locale, baseMetaTags };
};
