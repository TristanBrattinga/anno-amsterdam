<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { page } from '$app/stores';
	import extend from 'just-extend';
	import { Navigation } from '$components';
	import { locales, baseLocale } from '$i18n/i18n-util'
	import { replaceLocaleInUrl } from '../utils'

	export let data;

	$: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);
</script>

<svelte:head>
	{#each locales as l}
	<link rel="alternate" hreflang={l} href={replaceLocaleInUrl($page.url, l, true)} />
{/each}
<link rel="alternate" hreflang="x-default" href={replaceLocaleInUrl($page.url, baseLocale, true)} />
</svelte:head>
<MetaTags {...metaTags} />

<Navigation title="Main navigation" />
<slot></slot>

