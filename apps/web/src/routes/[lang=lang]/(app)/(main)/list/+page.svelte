<script lang="ts">
	// Components
	import { BuildingList } from '$components';

	// Stores
	import { location } from '$stores';
	import ImageSlider from '$components/ImageSlider.svelte';

	export let data;
</script>

<section class="container">
	<!--	<h2>{data.buildingsTitle}</h2>-->
	<BuildingList
		buildingsTitle={data.buildingsTitle}
		buildings={data.buildings}
		location={$location || null}
	/>
</section>
