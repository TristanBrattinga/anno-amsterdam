<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import { onMount, onDestroy } from 'svelte';
	import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
	import { MAPBOX_API_TOKEN } from '$env/static/private';

	let map: mapboxgl.Map;
	let mapContainer: HTMLDivElement;
	let lng: number, lat: number, zoom: number;

	lng = -71.224518;
	lat = 42.213995;
	zoom = 9;

	onMount(() => {
		const initialState = { lng: lng, lat: lat, zoom: zoom };

		map = new Map({
			container: mapContainer,
			accessToken: MAPBOX_API_TOKEN,
			style: `mapbox://styles/mapbox/outdoors-v11`,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});
	});

	onDestroy(() => {
		map.remove();
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
