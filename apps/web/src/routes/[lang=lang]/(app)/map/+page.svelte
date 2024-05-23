<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import '../../../../../node_modules/mapbox-gl/dist/mapbox-gl.css';
	import { onMount, onDestroy } from 'svelte';

	export let mapboxApiToken: string;

	let map: mapboxgl.Map;
	let mapContainer: HTMLDivElement;
	let lng = 52.378702958351155;
	let lat = 4.874425639858555;
	let zoom = 15;

	onMount(() => {
		const initialState = { lng, lat, zoom };

		map = new mapboxgl.Map({
			container: mapContainer,
			accessToken: mapboxApiToken,
			style: 'mapbox://styles/mapbox/outdoors-v11',
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

<div class="map-wrap">
	<div class="map" bind:this="{mapContainer}" />
</div>

<style>
    .map {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>
