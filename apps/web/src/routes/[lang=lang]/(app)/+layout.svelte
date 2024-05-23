<script lang="ts">
	import { setLocale } from '$i18n/i18n-svelte';

	// Components
	import { Header, Footer } from '$components';

	export let data;
	setLocale(data.locale);
</script>

<Header home={data.home} settings={data.settings} />
<main>
	<slot />
</main>
<Footer />

<style>
	main {
		padding: 0.5rem;
	}
</style>
