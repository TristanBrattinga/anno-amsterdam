<script lang="ts">
	// Components
	import { BuildingList } from '$components'

	// Stores
	import { location } from '$stores'
	import { onMount } from 'svelte'

	let orientation: string = 'No orientation data'

	onMount(() => {
		if (window.DeviceOrientationEvent) {
			console.log('DeviceOrientation is supported')
			window.addEventListener('deviceorientation', (event) => {
				console.log('event', event)
				orientation = `alpha: ${event.alpha} beta: ${event.beta} gamma: ${event.gamma}`
			})
		}
	})

	export let data
</script>

<section>
	<h2>{data.buildingsTitle}</h2>
	<h3>{orientation}</h3>
	<BuildingList
		buildingsTitle={data.buildingsTitle}
		buildings={data.buildings}
		location={$location || null}
	/>
</section>
