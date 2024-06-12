<script lang="ts">
	// Components
	import { BuildingList } from '$components'

	// Stores
	import { location } from '$stores'

	// Data
	export let data
</script>

<section class="container">
	<BuildingList
		buildingsTitle={data.buildingsTitle}
		buildings={data.buildings}
		moreInfo={data.moreInfo}
		location={$location || null}
	/>
</section>
