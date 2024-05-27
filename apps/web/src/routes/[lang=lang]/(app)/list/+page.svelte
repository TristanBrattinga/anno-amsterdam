<script lang="ts">
	// Components
	import { BuildingList } from '$components'

	// Stores
	import { location } from '$stores'

	export let data
</script>

<section>
	<h2>{data.buildingsTitle}</h2>
	<BuildingList
		buildingsTitle={data.buildingsTitle}
		buildings={data.buildings}
		location={$location || null}
	/>
</section>
