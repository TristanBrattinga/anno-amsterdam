<script lang="ts">
	// Components
	import { BuildingCell } from '$components';

	// Utils
	import type { Building, Coords } from '$types';

	// Props
	export let buildings: Building[];
	export let location: Coords | null = null;
</script>

<div>
	{#each buildings as building}
		<BuildingCell {building} {location} />
	{/each}
</div>
