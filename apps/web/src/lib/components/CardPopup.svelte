<script lang="ts">
	import type { Building, Coords } from '$types'
	import { getDistance } from '~/lib'
	import { AudioGuideIcon, RouteIcon } from '$icons'
	import { page } from '$app/stores'

	export let building: Building
	export let location: Coords | null | undefined = null

	// Distance to building in km
	$: km =
		location && building.location.coordinates[0] !== 0
			? getDistance(
					{ lat: location.lat, lng: location.lng },
					{ lat: building.location.coordinates[0], lng: building.location.coordinates[1] }
				)
			: building.distance || 0

	// Distance to building in km or m
	$: distance = km > 0 ? Math.round(km < 1 ? km * 1000 : km) + (km < 1 ? ' m' : ' km') : ''
</script>

<a href={`/${$page.data.locale}/building/${building.id}`}>
	<div>
		<p>{building?.address || 'Address missing'}</p>
		<!--		<button>-->
		<!--			<CloseIcon />-->
		<!--		</button>-->
	</div>
	<div>
		<p class="anno">Anno {building.construction_year}</p>
		<ul>
			<li>
				<RouteIcon color={!building.timeline?.length ? '#C5D9E0' : '#00425A'} />
			</li>
			<li>
				<AudioGuideIcon color={!building.audioguids?.length ? '#C5D9E0' : '#00425A'} />
			</li>
		</ul>
	</div>
	<ul>
		<li>
			<p>Distance to</p>
			<p>{distance ? `(${distance})` : ''}</p>
		</li>
		<li><span /></li>
		<li>
			<p>Type of use</p>
			<p>{building?.type_of_use}</p>
		</li>
	</ul>
</a>

<style lang="scss">
	:global(.mapboxgl-popup-close-button) {
		right: 5px;
		//top: 5px;
	}

	:global(.mapboxgl-popup-content) {
		padding: 1rem 1.5rem;
		border-radius: 5px;
	}

	a {
		padding: 10px;
		outline: none;

		button {
			position: absolute;
			right: 5px;
			top: 5px;
			appearance: none;
			background-color: transparent;
			border: none;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 5px;
		}

		div {
			display: flex;

			&:nth-of-type(1) {
				margin-bottom: 10px;
			}

			&:nth-of-type(2) {
				margin: 0.75rem 0 0.75rem 0;
				justify-content: space-between;

				p {
					font-size: 22px;
					font-weight: 500;
					color: var(--secondary-color-dark);
					font-family: 'Noto Serif', Helvetica, sans-serif;
				}

				ul {
					gap: 0.5rem;
				}
			}

			p {
				font-family: Oswald, sans-serif;
				font-size: 1rem;
				line-height: 1;
			}
		}

		ul {
			display: flex;
			justify-content: space-between;
			gap: 1rem;

			li {
				span {
					display: block;
					height: 100%;
					width: 1px;
					background-color: var(--accent-color-light);
				}

				p:first-of-type {
					font-size: 0.75rem;
					color: var(--primary-color-light);
					opacity: 50%;
				}
			}
		}
	}
</style>
