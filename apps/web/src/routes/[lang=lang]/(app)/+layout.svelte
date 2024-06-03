<script lang="ts">
	import { setLocale } from '$i18n/i18n-svelte';

	// Components
	import { Header, Footer, LocationPopup } from '$components';

	export let data;
	setLocale(data.locale);
</script>

<Header home={data.home} settings={data.settings} />
<main>
	<LocationPopup />
	<slot />
</main>
<Footer home={data.home} list={data.list} map={data.map} />

<style>
    main {
        position: absolute;
        top: 64px;
        width: 100%;
        overflow: auto;
        height: calc(100dvh - 64px - 80px);
    }
</style>
