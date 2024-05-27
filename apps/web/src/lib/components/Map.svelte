<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import '../../../node_modules/mapbox-gl/dist/mapbox-gl.css';
	import { onMount, onDestroy } from 'svelte';
	import type { Building } from '$types';

	let map: mapboxgl.Map;
	let mapContainer: HTMLDivElement;
	let lat = 52.3728;
	let lng = 4.8936;
	let zoom = 12;

	export let buildings: Building[];

	function updateData() {
		zoom = map.getZoom();
		lng = map.getCenter().lng;
		lat = map.getCenter().lat;
	}

	onMount(() => {
		const initialState = { lng, lat, zoom };

		map = new mapboxgl.Map({
			container: mapContainer,
			accessToken: 'pk.eyJ1IjoidHJpc3RhbmJyYXR0aW5nYSIsImEiOiJjbHdoajY2dHEwY3h3MmtxbWN4ajYwYjdqIn0.GL3d0YfePpQYZKJYPnNl0g',
			style: 'mapbox://styles/mapbox/outdoors-v11',
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});

		map.on('move', () => {
			updateData();
		});

		console.log(buildings);

		buildings.forEach(building => {
			new mapboxgl.Marker()
				.setLngLat(building.location.coordinates.reverse() as [number, number])
				.addTo(map);
		});

		map.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				// When active the map will receive updates to the device's location as it changes.
				trackUserLocation: true,
				// Draw an arrow next to the location dot to indicate which direction the device is heading.
				showUserHeading: true
			}));
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

<!--<div class="sidebar">-->
<!--	Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)} | Zoom:-->
<!--	{zoom.toFixed(2)}-->
<!--</div>-->

<style>
    .map {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .sidebar {
        background-color: rgb(35 55 75 / 90%);
        color: #fff;
        padding: 6px 12px;
        font-family: monospace;
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        margin: 12px;
        border-radius: 4px;
    }
</style>