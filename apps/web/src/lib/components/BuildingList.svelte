<script lang="ts">
	import '$styles/grid.scss'

	// Components
	import { BuildingCell } from '$components'

	// Utils
	import type { Building, Coords } from '$types'

	// Props
	export let buildingsTitle: string
	export let buildings: Building[]
	export let location: Coords | null = null
</script>

<section class="auto-grid" style="--auto-grid-min-size: 400px">
	<h2 class="sr-only">{buildingsTitle}</h2>
	{#each buildings as building}
		<BuildingCell {building} {location} />
	{/each}
</section>

<style lang="scss">
	section {
		justify-items: center;
		margin: 0 0.5rem;
	}
</style>
