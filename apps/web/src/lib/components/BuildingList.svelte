<script lang="ts">
	import '$styles/grid.scss'

	// Components
	import { BuildingCell } from '$components'

	// Utils
	import type { Building, BuildingSortBy, Coords } from '$types'

	// Props
	export let moreInfo: string
	export let buildingsTitle: string
	export let buildings: Building[]
	export let location: Coords | null = null

	let sort: BuildingSortBy = 'default'

	$: {
		console.log('sort', sort)
	}
</script>

<h2 class="sr-only">{buildingsTitle}</h2>

<form>
	<label for="sort">Sorting</label>
	<select bind:value={sort} id="sort" name="sort">
		<option value="default" selected>Standaard</option>
		<option value="distance">Afstand</option>
		<option value="name">A-Z</option>
		<option value="year">Bouwjaar</option>
	</select>
	<input class="sr-only" type="submit" value="Submit" />
</form>
<ul>
	{#each buildings as building}
		<li>
			<BuildingCell {building} {location} {moreInfo} />
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		margin: 0 0 3rem 0;
	}

	form {
		display: flex;
		justify-content: end;
		margin: 4rem 0 1rem 0;
		align-items: center;
		gap: 0.5rem;

		select {
			border: 1px solid var(--accent-color);
			border-radius: 999px;
			cursor: pointer;
			padding: 0 0.5rem;
		}
	}
</style>
