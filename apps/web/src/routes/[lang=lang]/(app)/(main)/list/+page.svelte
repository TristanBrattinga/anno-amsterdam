<script lang="ts">
	// Svelte
	import { onMount } from 'svelte'

	// Components
	import { BuildingList } from '$components'

	// Stores
	import { location } from '$stores'

	// Data
	export let data

	onMount(() => {
		if (data.error) {
			console.error(data.error)
		}
	})
</script>

<section class="container">
	{#if data.error}
		<h1>{data.fetchListError}</h1>
	{:else}
		<BuildingList
			buildingsTitle={data.buildingsTitle}
			noResults={data.noResults}
			distanceTo={data.distanceTo}
			map={data.map}
			buildings={data.buildings}
			moreInfo={data.moreInfo}
			location={$location || null}
		/>
	{/if}
</section>

<style lang="scss">
	.container {
		margin-top: 48px;
	}
</style>
