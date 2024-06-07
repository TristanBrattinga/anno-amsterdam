<script lang="ts">
	// Stores
	import { page } from '$app/stores'

	import type { Building, Coords } from '$types'

	// Utils
	import { getDistance } from '$lib'

	// Props
	export let building: Building
	export let location: Coords | null = null

	$: km =
		location && building.location.coordinates[0] !== 0
			? getDistance(
					{ lat: location.lat, lng: location.lng },
					{ lat: building.location.coordinates[0], lng: building.location.coordinates[1] }
				)
			: 0

	$: distance = km > 0 ? Math.round(km < 1 ? km * 1000 : km) + (km < 1 ? ' m' : ' km') : ''
</script>

<article>
	<img src={building.image_urls[0].url} alt={building.name} />
	<div class="content">
		<header>
			<hgroup>
				<h3>{building.address}</h3>
				<p>Anno {building.construction_year}</p>
			</hgroup>
			<div>
				<form action={`/${$page.data.locale}/map`} method="post">
					<input type="hidden" name="lat" value={building.location.coordinates[0]} />
					<input type="hidden" name="lon" value={building.location.coordinates[1]} />
					<button>Map</button>
				</form>
			</div>
		</header>
		<footer>
			{#if building.type_of_user}
				<a href={`/${$page.data.locale}/building/${building._id}`}>Meer info</a>
			{/if}
			<p>{distance ? `(${distance})` : ''}</p>
		</footer>
	</div>
</article>

<style lang="scss">
	article {
		display: flex;
		max-width: 600px;
		border-top: solid 1px var(--primary-color);
		padding-top: 1em;

		img {
			height: 100%;
			max-width: 50%;
			object-fit: cover;
			border-radius: 8px;
		}

		.content {
			display: flex;
			flex-direction: column;
			flex: 1;
			padding: 0.5em;

			& > * {
				flex: 1;
			}

			header {
				display: flex;
				justify-content: space-between;

				hgroup {
					h3 {
						margin: 0;
					}

					p {
						color: var(--secondary-color);
						font-size: 1.5em;
					}
				}

				div {
					display: flex;
					align-items: center;

					a {
						text-transform: uppercase;
						display: block;
						width: fit-content;
						padding: 0.25rem 0.5rem;
						border-radius: 8px;
						border: 2px solid var(--primary-color);
						color: var(--text-color);

						&:hover {
							background-color: var(--primary-color);
							color: #fff;
						}
					}
				}
			}

			footer {
				display: flex;
				align-items: center;
				justify-content: space-between;

				a {
					text-transform: uppercase;
					display: block;
					width: fit-content;
					padding: 0.25rem 0.5rem;
					border-radius: 8px;
					background-color: var(--primary-color);
					color: #fff;

					&:hover {
						background-color: unset;
						border: 2px solid var(--primary-color);
						color: var(--text-color);
					}
				}
			}
		}
	}

	@media screen and (max-width: 400px) {
		article {
			flex-direction: column;

			img {
				max-width: 100%;
			}
		}
	}
</style>
