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

		map.on('load', () => {
			map.addSource('buildings', {
				type: 'geojson',
				data: 'https://raw.githubusercontent.com/TristanBrattinga/anno-amsterdam/develop-tristan/apps/web/src/lib/constants/export.geojson'
			});

			map.addLayer({
				'id': 'buildings-layer',
				'type': 'fill',
				'source': 'buildings',
				'paint': {
					'fill-color': [
						'interpolate',
						['linear'],
						['to-number', ['get', 'start_date']],
						1000, '#f28cb1', // Buildings from 1000 to 1200
						1200, '#3bb2d0', // Buildings from 1200 to 1400
						1400, '#f1f075', // Buildings from 1400 to 1600
						1600, '#223b53', // Buildings from 1600 to 1800
						1800, '#e55e5e', // Buildings from 1800 to 2000
						2000, '#3bb2d0'  // Buildings from 2000 onwards
					],
					'fill-opacity': 1
				}
			});
		});


	});

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

<style lang="scss">
  :global(.mapboxgl-popup-content) {
    display: block;
  }

  .map {
    position: absolute;
    width: 100%;
    height: 100%;


  }

  .locationButton {
    position: absolute;
    border: 1px solid #C5D9E0;
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
