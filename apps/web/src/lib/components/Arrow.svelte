<script lang="ts">
	import { onDestroy, onMount } from 'svelte'

	// Utils
	import { getBearing, getCompassHeading } from '$lib'
	import type { Coords } from '$types'
	import { browser } from '$app/environment'

	export let from: Coords
	export let to: Coords

	const bearing = getBearing(from, to)
	let rotation = 0
	let north = 0

	$: angle = (bearing + rotation + 360) % 360

	function handleOrentation(e: DeviceOrientationEvent) {
		rotation = e.alpha || 0
		north = getCompassHeading(e.alpha || 0, e.beta || 0, e.gamma || 0)
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('deviceorientation', handleOrentation)
		}
	})

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('deviceorientation', handleOrentation)
		}
	})
</script>

<img
	src="https://pngfre.com/wp-content/uploads/red-arrow-26-1-1536x1536.png"
	alt="Arrow pointing to the destination"
	width="50"
	style={`transform: rotate(${angle}deg)`}
/>
<p>{north}</p>
