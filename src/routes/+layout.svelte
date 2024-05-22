<script lang="ts">
	import { pwaInfo } from 'virtual:pwa-info';
	import { MetaTags } from 'svelte-meta-tags';
	import { page } from '$app/stores';
	import extend from 'just-extend';

	export let data;

	$: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);
	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<MetaTags {...metaTags} />
<svelte:head>
	{@html webManifestLink}
</svelte:head>

<slot />

<style></style>
