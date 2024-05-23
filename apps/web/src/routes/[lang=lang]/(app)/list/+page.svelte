<script lang="ts">
	// Components
	import { BuildingList } from '$components';

	// Utils
	import { getLocation } from '$lib';

	// Stores
	import { location } from '$stores';

	export let data;
</script>

<section>
	<h2>Gebouwen</h2>
	<button on:click={getLocation}>Haal locatie op</button>
	<BuildingList buildings={data.buildings} location={$location || null} />
</section>
