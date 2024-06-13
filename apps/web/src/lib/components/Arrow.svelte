<script lang="ts">
	// Svelte
	import { onDestroy, onMount } from 'svelte'

	// Types
	import type { Coords } from '$types'

	// Utils
	import { browser } from '$app/environment'
	import { getBearing, getCompassHeading } from '$lib'

	// Props
	export let from: Coords
	export let to: Coords
	export let arrowAlt: string

	// Bearing between two points
	const bearing = getBearing(from, to)

	// The north angle
	let north = 0

	// The angle to rotate the arrow
	$: angle = (bearing - north + 360) % 360

	/**
	 * Handles device orientation event
	 * @param e The DeviceOrientationEvent
	 */
	function handleOrentation(e: DeviceOrientationEvent) {
		north = getCompassHeading(e.alpha || 0, e.beta || 0, e.gamma || 0)
	}

	// Add event listener on mount
	onMount(() => {
		if (browser) {
			window.addEventListener('deviceorientation', handleOrentation)
		}
	})

	// Remove event listener on destroy
	onDestroy(() => {
		if (browser) {
			window.removeEventListener('deviceorientation', handleOrentation)
		}
	})
</script>

<img
	src="https://pngfre.com/wp-content/uploads/red-arrow-26-1-1536x1536.png"
	alt={arrowAlt}
	width="50"
	style={`transform: rotate(${angle}deg)`}
/>
