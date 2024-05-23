<script lang="ts">
	import { setLocale } from '$i18n/i18n-svelte';

	// Components
	import { Header, Footer } from '$components';

	export let data;
	setLocale(data.locale);
</script>

<Header settings={data.settings} />
<main>
	<slot />
</main>
<Footer />
