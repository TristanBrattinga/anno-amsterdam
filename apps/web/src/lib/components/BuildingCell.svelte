<script lang="ts">
	import type { Building, Coords } from '$types';

	// Utils
	import { getDistanceFromLatLonInKm } from '$lib';

	// Props
	export let building: Building;
	export let location: Coords | null = null;

	$: distance =
		location && building.location.coordinates[0] !== 0
			? getDistanceFromLatLonInKm(
					location.lat,
					location.lng,
					building.location.coordinates[0],
					building.location.coordinates[1]
				)
			: 0;
</script>

<article>
	<img src={building.image_urls[0].url} alt={building.name} />
	<div class="content">
		<header>
			<hgroup>
				<h3>{building.address}</h3>
				<p>Anno {building.construction_year}</p>
			</hgroup>
			<button>Map</button>
		</header>
		<footer>
			<p>{distance > 0 ? `(${distance} km away)` : ''}</p>
			<p>{building.type_of_user}</p>
		</footer>
	</div>
</article>

<style>
	article {
		display: flex;
	}

	header {
		display: flex;
	}

	img {
		max-width: 50%;
	}
</style>
