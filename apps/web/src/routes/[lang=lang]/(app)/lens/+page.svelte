<script lang="ts">
	// Components
	import { BuildingList } from '$components'

	// Stores
	import { location } from '$stores'
	import { onMount } from 'svelte'

	export let data

	$: {
		console.log($location)
	}

	onMount(() => {
		window.onload = () => {
			let downloaded = false

			const el = document.querySelector('[gps-new-camera]')

			if (!el) return

			el.addEventListener('gps-camera-update-position', async (e: any) => {
				if (!downloaded) {
					const west = e.detail.position.longitude - 0.05,
						east = e.detail.position.longitude + 0.05,
						south = e.detail.position.latitude - 0.05,
						north = e.detail.position.latitude + 0.05
					console.log(`${west} ${south} ${east} ${north}`)
					const response = await fetch(
						`https://hikar.org/webapp/map?bbox=${west},${south},${east},${north}&layers=poi&outProj=4326`
					)
					const pois = await response.json()
					pois.features.forEach((feature: any) => {
						const compoundEntity = document.createElement('a-entity')
						compoundEntity.setAttribute('gps-new-entity-place', {
							latitude: feature.geometry.coordinates[1],
							longitude: feature.geometry.coordinates[0]
						})
						const box = document.createElement('a-box')
						box.setAttribute('scale', {
							x: 20,
							y: 20,
							z: 20
						})
						box.setAttribute('material', { color: 'red' })
						box.setAttribute('position', {
							x: 0,
							y: 20,
							z: 0
						})
						const text = document.createElement('a-text')
						const textScale = 100
						text.setAttribute('look-at', '[gps-new-camera]')
						text.setAttribute('scale', {
							x: textScale,
							y: textScale,
							z: textScale
						})
						text.setAttribute('value', feature.properties.name)
						text.setAttribute('align', 'center')
						compoundEntity.appendChild(box)
						compoundEntity.appendChild(text)
						document.querySelector('a-scene')?.appendChild(compoundEntity)
					})
				}
				downloaded = true
			})
		}
	})
</script>

<svelte:head>
	<script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
	<script
		type="text/javascript"
		src="https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js"
	></script>
	<script
		type="text/javascript"
		src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"
	></script>
</svelte:head>

<a-scene
	vr-mode-ui="enabled: false"
	arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false"
	renderer="antialias: true; alpha: true"
>
	<a-camera gps-new-camera="gpsMinDistance: 5"></a-camera>
	<a-entity
		material="color: red"
		geometry="primitive: box"
		gps-new-entity-place="latitude: 52.359289920443835; longitude: 4.908652848835472"
		scale="10 10 10"
	></a-entity>
</a-scene>
