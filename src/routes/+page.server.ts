import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = () => {
	const title = 'Home';
	const pageMetaTags = Object.freeze({
		title,
		openGraph: { title }
	}) satisfies MetaTagsProps;

	return {
		pageMetaTags
	};
};
