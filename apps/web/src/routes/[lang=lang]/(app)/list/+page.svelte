<script lang="ts">
	// Components
	import { BuildingList } from '$components'

	// Stores
	import { location } from '$stores'
	import { onMount } from 'svelte'
	import { watchLocation } from '$lib'

	export let data

	onMount(() => {
		if (!$location) {
			watchLocation()
		}
	})
</script>

<section>
	<h2>{data.buildingsTitle}</h2>
	<BuildingList
		buildingsTitle={data.buildingsTitle}
		buildings={data.buildings}
		location={$location || null}
	/>
</section>
