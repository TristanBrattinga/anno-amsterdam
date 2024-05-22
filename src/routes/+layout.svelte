<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags'
	import { page } from '$app/stores'
	import extend from 'just-extend'
	import { Header, BottomNavigation } from '$components'

	import '../app.css'

	export let data

	$: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags)
</script>

<MetaTags {...metaTags} />
<Header />
<slot></slot>
<BottomNavigation />
