<script lang="ts">
	// Stores
	import { page } from '$app/stores'

	// Types
	import type { Building, Coords } from '$types'

	// Utils
	import { getDistance } from '$lib'

	// Components
	import ImageSlider from '$components/ImageSlider.svelte'

	// Props
	export let building: Building
	export let location: Coords | null = null
	export let moreInfo: string

	// Distance to building in km
	$: km =
		location && building.location.coordinates[0] !== 0
			? getDistance(
					{ lat: location.lat, lng: location.lng },
					{ lat: building.location.coordinates[0], lng: building.location.coordinates[1] }
				)
			: 0

	// Distance to building in km or m
	$: distance = km > 0 ? Math.round(km < 1 ? km * 1000 : km) + (km < 1 ? ' m' : ' km') : ''
</script>

<article>
	<div class="image">
		<ImageSlider images={building.image_urls} />
	</div>
	<div class="content">
		<div>
			<div>
				<h2>{building.address}</h2>
				<p>Anno {building.construction_year}</p>
			</div>
			<form action={`/${$page.data.locale}/map`} method="post">
				<input type="hidden" name="lat" value={building.location.coordinates[0]} />
				<input type="hidden" name="lon" value={building.location.coordinates[1]} />
				<button>Map</button>
			</form>
		</div>
		<ul>
			<li>
				<p>Distance to</p>
				<p>{distance ? `${distance}` : ''}</p>
			</li>
			{#if building.type_of_user}
				<li>
					<a href={`/${$page.data.locale}/building/${building.id}`}>{moreInfo}</a>
				</li>
			{/if}
		</ul>
	</div>
</article>

<style lang="scss">
	.image {
		display: block;
		width: 40%;
		height: 140px;
		overflow: hidden;
		border-radius: 5px;
	}

	article {
		display: flex;
		gap: 20px;
		padding: 20px 0;
		border-top: 1px solid #c5d9e0;
	}

	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		> div:first-of-type {
			display: flex;
			justify-content: space-between;
			gap: 1.5rem;
			margin-bottom: 20px;

			p {
				color: var(--secondary-color-light);
				font-weight: 500;
				font-size: 1.375rem;
				line-height: 1;
			}
		}

		h2 {
			font-weight: 400;
			color: var(--primary-color-dark);
			text-transform: uppercase;
			margin-bottom: 0.5rem;
		}

		form button {
			padding: 10px;
			border-radius: 5px;
			border: 1px solid #c5d9e0;
			background-color: transparent;
			transition: all 0.3s ease;
			cursor: pointer;

			&:hover {
				background-color: #c5d9e0;
			}
		}

		ul {
			display: flex;
			justify-content: space-between;
			align-items: center;

			li {
				p:first-of-type {
					font-size: 0.75rem;
					color: var(--primary-color-light);
					opacity: 50%;
				}

				a {
					background-color: var(--secondary-color-light);
					padding: 8px 24px;
					border-radius: 5px;
					color: white;
					line-height: 16px;
					border: 1px solid var(--secondary-color-light);
					transition: all 0.3s ease;

					&:hover {
						color: var(--secondary-color-light);
						background-color: transparent;
					}
				}
			}
		}
	}

	//article {
	//  display: flex;
	//  max-width: 600px;
	//  border-top: solid 1px var(--primary-color);
	//  padding-top: 1em;
	//
	//  img {
	//    height: auto;
	//    max-width: 50%;
	//    object-fit: cover;
	//    border-radius: 8px;
	//  }
	//
	//  .content {
	//    display: flex;
	//    flex-direction: column;
	//    flex: 1;
	//    padding: 0.5em;
	//
	//    & > * {
	//      flex: 1;
	//    }
	//
	//    header {
	//      display: flex;
	//      justify-content: space-between;
	//
	//      hgroup {
	//        h3 {
	//          margin: 0;
	//        }
	//
	//        p {
	//          color: var(--secondary-color);
	//          font-size: 1.5em;
	//        }
	//      }
	//
	//      div {
	//        display: flex;
	//        align-items: center;
	//
	//        a {
	//          text-transform: uppercase;
	//          display: block;
	//          width: fit-content;
	//          padding: 0.25rem 0.5rem;
	//          border-radius: 8px;
	//          border: 2px solid var(--primary-color);
	//          color: var(--text-color);
	//
	//          &:hover {
	//            background-color: var(--primary-color);
	//            color: #fff;
	//          }
	//        }
	//      }
	//    }
	//
	//    footer {
	//      display: flex;
	//      align-items: center;
	//      justify-content: space-between;
	//
	//      a {
	//        text-transform: uppercase;
	//        display: block;
	//        width: fit-content;
	//        padding: 0.25rem 0.5rem;
	//        border-radius: 8px;
	//        background-color: var(--primary-color);
	//        color: #fff;
	//
	//        &:hover {
	//          background-color: unset;
	//          border: 2px solid var(--primary-color);
	//          color: var(--text-color);
	//        }
	//      }
	//    }
	//  }
	//}
</style>
