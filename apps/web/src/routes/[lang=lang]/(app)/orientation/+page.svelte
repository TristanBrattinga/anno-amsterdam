<script lang="ts">
	import { onDestroy, onMount } from 'svelte'

	// Utils
	import { getBearing } from '$lib'
	import type { Coords } from '$types'
	import { browser } from '$app/environment'

	export let data

	function calcRotation(
		from: Coords = { lat: 52.63234070920139, lng: 4.751770580577386 },
		to: Coords = { lat: 52.36641592507471, lng: 4.901132200933971 }
	) {
		const angle = getBearing(from, to)

		const element = document.getElementById('arrow')

		// - 90 because the arrow image is pointing to the right by default
		if (element) element.style['transform'] = `rotate(${angle - 90}deg)`
	}

	function handleOrentation(e: DeviceOrientationEvent) {
		const info = document.getElementById('info')
		if (info) {
			info.innerHTML = `
				<p>alpha: ${e.alpha}</p>
				<p>beta: ${e.beta}</p>
				<p>gamma: ${e.gamma}</p>
			`
		}
	}

	onMount(() => {
		calcRotation()
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

<section>
	<p id="info"></p>
	<img
		id="arrow"
		src="https://pngfre.com/wp-content/uploads/red-arrow-26-1-1536x1536.png"
		alt="Arrow pointing to the destination"
		width="500"
	/>
</section>
