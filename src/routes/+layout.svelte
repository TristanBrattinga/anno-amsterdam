<script lang="ts">
	import { pwaInfo } from 'virtual:pwa-info';
	import { MetaTags } from 'svelte-meta-tags';
	import { page } from '$app/stores';
	import extend from 'just-extend';
	import { browser } from '$app/environment';
	import { darkMode } from '$stores';

	export let data;

	$: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);
	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	if (browser) {
		darkMode.set(document.documentElement.classList.contains('dark'));
	}
</script>

<MetaTags {...metaTags} />
<svelte:head>
	{@html webManifestLink}
</svelte:head>

<slot />

<style></style>
