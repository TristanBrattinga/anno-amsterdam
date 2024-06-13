<script lang="ts">
	import '$styles/grid.scss'

	// Components
	import { BuildingCell } from '$components'

	// Utils
	import type { Building, Coords } from '$types'

	// Props
	export let moreInfo: string
	export let map: string
	export let distanceTo: string
	export let buildingsTitle: string
	export let buildings: Building[]
	export let location: Coords | null = null
</script>

<h2 class="sr-only">{buildingsTitle}</h2>
<ul>
	{#each buildings as building}
		<li>
			<BuildingCell {building} {location} {moreInfo} {map} {distanceTo} />
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		margin: 0 0 3rem 0;
	}
</style>
