<script lang="ts">
    import mapboxgl from 'mapbox-gl';
    import '~~/node_modules/mapbox-gl/dist/mapbox-gl.css';
    import { onMount, onDestroy } from 'svelte';
    import type { Building, Coords } from '$types';
    import { PUBLIC_MAPBOX_API_TOKEN } from '$env/static/public';

    import { renderComponentToElement } from '$utils/renderComponent';
    import { InfoIcon, LocationIcon } from '$icons';
    import { CardPopup } from '$components/index';
    import { menuStore } from '$stores/menu';

    let map: mapboxgl.Map;
    let mapContainer: HTMLDivElement;
    let lat = 52.3728;
    let lng = 4.8936;
    let zoom = 12;
    let geolocateControl: mapboxgl.GeolocateControl;

    export let buildings: Building[];
    export let legendMenuId: string;
    export let location: Coords | null = null;

    const updateData = () => {
        zoom = map.getZoom();
        lng = map.getCenter().lng;
        lat = map.getCenter().lat;
    };

    const layers = ['transit-label', 'poi-label', 'road-number-shield', 'road-exit-shield'];
    const bounds = [[4.75946151935893, 52.325787962134136], [5.018715898938553, 52.43047428931698]] as mapboxgl.LngLatBoundsLike;

    onMount(() => {
        const initialState = { lng, lat, zoom };

        map = new mapboxgl.Map({
            container: mapContainer,
            accessToken: PUBLIC_MAPBOX_API_TOKEN,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom,
            attributionControl: false,
            minZoom: 12,
            maxZoom: 18,
            maxBounds: bounds
        });


        map.on('move', () => {
            updateData();
        });

        buildings.forEach((building) => {
            new mapboxgl.Marker()
                .setLngLat(building.location.coordinates.reverse() as [number, number])
                .setPopup(
                    new mapboxgl.Popup({ offset: 1 }).setDOMContent(
                        renderComponentToElement(CardPopup, { building, location })
                    )
                )
                .addTo(map);
        });

        geolocateControl = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        });

        map.addControl(geolocateControl);

        const geolocateButton = map
            .getContainer()
            .querySelector('.mapboxgl-ctrl-top-right') as HTMLElement;
        if (geolocateButton) {
            geolocateButton.style.display = 'none';
        }


        map.on('load', () => {
            layers.forEach(layer => {
                if (map.getLayer(layer)) {
                    map.removeLayer(layer);
                }
            });

            map.addSource('my-tileset', {
                type: 'vector',
                url: 'mapbox://tristanbrattinga.89nhwzw4'
            });

            map.addLayer({
                'id': 'my-tileset-layer',
                'type': 'fill',
                'source': 'my-tileset',
                'source-layer': 'export',
                'paint': {
                    'fill-color': [
                        'interpolate',
                        ['linear'],
                        ['to-number', ['get', 'start_date']],
                        -1, '#c5c5c5', // Buildings from 1000 to 1100
                        1000, '#001f3f', // Buildings from 1000 to 1100
                        1100, '#0074D9', // Buildings from 1100 to 1200
                        1200, '#7FDBFF', // Buildings from 1200 to 1300
                        1300, '#39CCCC', // Buildings from 1300 to 1400
                        1400, '#3D9970', // Buildings from 1400 to 1500
                        1500, '#2ECC40', // Buildings from 1500 to 1600
                        1600, '#01FF70', // Buildings from 1600 to 1700
                        1700, '#FFDC00', // Buildings from 1700 to 1800
                        1800, '#FF851B', // Buildings from 1800 to 1900
                        1900, '#FF4136', // Buildings from 1900 to 2000
                        2000, '#85144b'  // Buildings from 2000 onwards
                    ],
                    'fill-opacity': 1
                }
            }, 'road-label');

            geolocateControl.trigger();

            geolocateControl.on('geolocate', (e) => {
                map.flyTo({
                    center: [e.coords.longitude, e.coords.latitude],
                    zoom: 15, // Set the zoom level to your preference
                    speed: 1.5, // Make the flyTo transition smoother
                    curve: 1.5, // Make the flyTo transition smoother
                    easing: (t) => t // Linear easing
                });
            });
            // Add line layer for outline
            // map.addLayer({
            // 	'id': 'my-tileset-outline',
            // 	'type': 'line',
            // 	'source': 'my-tileset',
            // 	'source-layer': 'export',
            // 	'paint': {
            // 		'line-color': '#000000',
            // 		'line-width': .5
            // 	}
            // });
        });

    });

    const triggerGeolocate = () => {
        if (geolocateControl) {
            geolocateControl.trigger();
        }
    };

    onDestroy(() => {
        if (map) {
            map.remove();
        }
    });

    const toggleLegend = () => {
        menuStore.toggleMenu(legendMenuId);
    };

</script>

<div class="map-wrap">
  <div class="map" bind:this={mapContainer} />

  <button class="locationButton" on:click={triggerGeolocate}>
    <LocationIcon />
  </button>

  <button class="infoButton" on:click={toggleLegend}>
    <InfoIcon />
  </button>

</div>

<style lang="scss">
  :global(.mapboxgl-popup-content) {
    display: block;
  }

  :global(.mapboxgl-ctrl-bottom-left) {
    display: none;
  }

  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .locationButton {
    position: absolute;
    border: 1px solid var(--accent-color-light);
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

  .filter-controls {
    position: absolute;
    top: 10px;
    left: 10px;
    background: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .infoButton {
    position: absolute;
    border: 1px solid var(--accent-color-light);
    background-color: #ffffff;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 999px;
    bottom: 10px;
    left: 10px;
    cursor: pointer;
  }


</style>
