<script lang="ts">
	import type { Building, Coords } from '$types';

	// Utils
	import { getDistanceFromLatLonInKm } from '$lib';

	// Props
	export let building: Building;
	export let location: Coords | null = null;

	$: km =
		location && building.location.coordinates[0] !== 0
			? getDistanceFromLatLonInKm(
					location.lat,
					location.lng,
					building.location.coordinates[0],
					building.location.coordinates[1]
				)
			: 0;

	$: distance = km > 0 ? Math.round(km < 1 ? km * 1000 : km) + (km < 1 ? ' m' : ' km') : '';
</script>

<article>
	<img src={building.image_urls[0].url} alt={building.name} />
	<div class="content">
		<header>
			<hgroup>
				<h3>{building.address}</h3>
				<p>Anno {building.construction_year}</p>
			</hgroup>
			<div>
				<button>Map</button>
			</div>
		</header>
		<footer>
			<p>{building.type_of_user}</p>
			<p>{distance ? `(${distance})` : ''}</p>
		</footer>
	</div>
</article>

<style lang="scss">
	article {
		display: flex;
		height: 15em;
		background-color: var(--bg-color);
		max-width: 600px;

		img {
			height: 100%;
			max-width: 50%;
			object-fit: cover;
		}

		.content {
			display: flex;
			flex-direction: column;
			flex: 1;
			padding: 0.5em;

			& > * {
				flex: 1;
			}

			header {
				display: flex;

				h3 {
					margin: 0;
				}

				p {
					color: var(--secondary-color);
				}
			}

			footer {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}

	@media screen and (max-width: 400px) {
		article {
			flex-direction: column;

			img {
				max-width: 100%;
			}
		}
	}
</style>
