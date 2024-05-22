<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { page } from '$app/stores';
	import extend from 'just-extend';
	import { Navigation } from '$components';

	export let data;
	import '../app.css';

	$: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);
</script>

<MetaTags {...metaTags} />
<Navigation title="Main navigation" />
<slot></slot>
