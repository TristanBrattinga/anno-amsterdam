<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { page } from '$app/stores';
	import extend from 'just-extend';
	import { Navigation, LocaleHead } from '$components';

	export let data;

	$: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);
</script>

<LocaleHead />
<MetaTags {...metaTags} />
<Navigation title="Main navigation" />
<slot></slot>

