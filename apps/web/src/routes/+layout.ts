import { loadLocaleAsync } from '$i18n/i18n-util.async'
import { locales, baseLocale } from '$i18n/i18n-util'
import { i18nObject } from '$i18n/i18n-util'
import type { MetaTagsProps } from 'svelte-meta-tags'
import { APP_NAME, getAssetUrl, getPathnameWithoutBase, replaceLocaleInUrl } from '$lib'
import type { Locales } from '$i18n/i18n-types'

const mapLocale = (l: Locales) => {
	return l === 'en' ? 'en_GB' : 'nl_NL'
}

export const load = async ({ url, data: { locale } }) => {
	// load dictionary into memory
	await loadLocaleAsync(locale)
	const LL = i18nObject(locale)

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
			locale: mapLocale(locale),
			title: APP_NAME,
			description: LL.description(),
			siteName: 'Anno Amsterdam',
			images: [
				{
					url: getAssetUrl(url, '/manifest-icon-512.maskable.png'),
					alt: 'Anno Logo',
					width: 512,
					height: 512,
					type: 'image/png'
				}
			]
		}
	} satisfies MetaTagsProps)

	return { locale, baseMetaTags, goHome: LL.goHome(), unexpectedError: LL.unexpectedError() }
}
