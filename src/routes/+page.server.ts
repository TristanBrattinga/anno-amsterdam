import type { MetaTagsProps } from 'svelte-meta-tags';
import { api } from '$lib/server';

export const load = async () => {
	const title = 'Home';
	const pageMetaTags = Object.freeze({
		title,
		openGraph: { title }
	}) satisfies MetaTagsProps;

	const buildings = await api.getBuildings();

	return {
		pageMetaTags,
		buildings
	};
};
