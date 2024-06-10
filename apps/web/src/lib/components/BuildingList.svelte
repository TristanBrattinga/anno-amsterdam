<script lang="ts">
	import '$styles/grid.scss';

	// Components
	import { BuildingCell } from '$components';

	// Utils
	import type { Building, Coords } from '$types';

	// Props
	export let buildingsTitle: string;
	export let buildings: Building[];
	export let location: Coords | null = null;
</script>

<h2 class="sr-only">{buildingsTitle}</h2>

<div>
	<p>Sorting</p>
	<label>
		<select>
			<option>Afstand</option>
			<option>A-Z</option>
			<option>Bouwjaar</option>
			<option>Type woning</option>
		</select>
	</label>
</div>
<ul>
	{#each buildings as building}
		<li>
			<BuildingCell {building} {location} />
		</li>
	{/each}
</ul>

<style lang="scss">
  ul {
    margin: 0 0 3rem 0;
  }

  div {
    display: flex;
    justify-content: end;
    margin: 4rem 0 1rem 0;
    align-items: center;
    gap: .5rem;

    select {
      border: 1px solid #C5D9E0;
      border-radius: 999px;
      padding: 0 .5rem;
    }
  }
</style>
