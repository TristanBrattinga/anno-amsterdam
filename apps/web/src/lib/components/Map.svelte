<script lang="ts">
	import mapboxgl from 'mapbox-gl'
	import '../../../node_modules/mapbox-gl/dist/mapbox-gl.css'
	import { onMount, onDestroy } from 'svelte'
	import type { Building, Coords } from '$types'
	import { PUBLIC_MAPBOX_API_TOKEN } from '$env/static/public'

	import { renderComponentToElement } from '$utils/renderComponent'
	import { LocationIcon } from '$icons'
	import { CardPopup } from '$components/index'

	let map: mapboxgl.Map
	let mapContainer: HTMLDivElement
	let lat = 52.3728
	let lng = 4.8936
	let zoom = 12
	let geolocateControl: mapboxgl.GeolocateControl

	export let buildings: Building[]
	export let location: Coords | null = null

	const updateData = () => {
		zoom = map.getZoom()
		lng = map.getCenter().lng
		lat = map.getCenter().lat
	}

	onMount(() => {
		const initialState = { lng, lat, zoom }

		map = new mapboxgl.Map({
			container: mapContainer,
			accessToken: PUBLIC_MAPBOX_API_TOKEN,
			style: 'mapbox://styles/mapbox/outdoors-v11',
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom,
			attributionControl: false
		})

		map.on('move', () => {
			updateData()
		})

		buildings.forEach((building) => {
			new mapboxgl.Marker()
				.setLngLat(building.location.coordinates.reverse() as [number, number])
				.setPopup(
					new mapboxgl.Popup({ offset: 1 }).setDOMContent(
						renderComponentToElement(CardPopup, { building, location })
					)
				)
				.addTo(map)
		})

		geolocateControl = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			trackUserLocation: true,
			showUserHeading: true
		})

		map.addControl(geolocateControl)

		const geolocateButton = map
			.getContainer()
			.querySelector('.mapboxgl-ctrl-top-right') as HTMLElement
		if (geolocateButton) {
			geolocateButton.style.display = 'none'
		}
	})

	const triggerGeolocate = () => {
		if (geolocateControl) {
			geolocateControl.trigger()
		}
	}

	onDestroy(() => {
		if (map) {
			map.remove()
		}
	})
</script>

<div class="map-wrap">
	<div class="map" bind:this={mapContainer} />

	<button class="locationButton" on:click={triggerGeolocate}>
		<LocationIcon />
	</button>
</div>

<style>
	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.locationButton {
		position: absolute;
		border: 1px solid #c5d9e0;
		background-color: #ffffff;
		width: 32px;
		height: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 999px;
		bottom: 10px;
		right: 10px;
		cursor: pointer;
	}
</style>
