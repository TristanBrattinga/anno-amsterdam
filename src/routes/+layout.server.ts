import type { MetaTagsProps } from 'svelte-meta-tags';
import { APP_DESCRIPTION, APP_NAME } from '$lib';

export const load = ({ url }) => {
	const baseMetaTags = Object.freeze({
		title: APP_NAME,
		titleTemplate: `%s | ${APP_NAME}`,
		description: APP_DESCRIPTION,
		canonical: new URL(url.pathname, url.origin).href,
		openGraph: {
			type: 'website',
			url: new URL(url.pathname, url.origin).href,
			locale: 'nl_NL',
			title: APP_NAME,
			description: APP_DESCRIPTION,
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
	}) satisfies MetaTagsProps;

	return {
		baseMetaTags
	};
};
