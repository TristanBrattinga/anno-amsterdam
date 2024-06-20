<script lang="ts">
	// Components
	import { Arrow } from '$components'

	// Stores
	import { page } from '$app/stores'
	import { location } from '$stores'

	// Data
	export let data
</script>

<section>
	<button class="back" on:click={() => history.back()}>&#60; {data.back}</button>
	<img src={data.building.image_urls[0].url} alt={data.building.name} />
	<div class="content">
		<div class="top-bar">
			<p class="anno">Anno {data.building.construction_year}</p>
			{#if $location}
				<Arrow
					arrowAlt={data.arrowAlt}
					from={$location}
					to={{
						lat: data.building.location.coordinates[0],
						lng: data.building.location.coordinates[1]
					}}
				/>
			{/if}
		</div>
		<h1>{data.building.address}</h1>
		<div class="more-info">
			<div class="distance">
				<p>{data.distanceTo}</p>
				<p>3m</p>
			</div>
			<div class="type-of-use">
				<p>{data.typeOfUse}</p>
				<p>{data.building.type_of_use ? data[data.building.type_of_use] : data.unknown}</p>
			</div>
		</div>
		<div class="tags">
			{#each data.building.tags[$page.data.locale] as tag}
				<span>{tag}</span>
			{/each}
		</div>
		<p>{data.building.description}</p>
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		align-items: center;

		button.back {
			position: absolute;
			top: 0.25em;
			left: 0.5em;
			background-color: var(--accent-color);
			border: none;
			cursor: pointer;
			border-radius: 8px;
			padding: 0.5em 1em;

			&:hover {
				color: #fff;
				background-color: var(--primary-color);
			}
		}

		.content {
			width: 100%;
			padding: 1rem;

			> p {
				margin: 0 auto;
				max-width: calc(500px - 2rem);
			}

			.top-bar {
				max-width: calc(500px - 2rem);
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 48px;
				margin-top: calc(-24px - 1rem);

				.anno {
					padding: 0 0.5rem;
					border-radius: 8px;
					height: 48px;
					display: flex;
					align-items: center;
					width: fit-content;
					color: #fff;
					background-color: var(--secondary-color);
				}
			}

			h1 {
				font-size: 1.5rem;
				max-width: calc(500px - 2rem);
				margin: 1rem auto;
				color: var(--primary-color);
				text-transform: uppercase;
			}

			.more-info {
				display: flex;
				min-width: fit-content;
				max-width: calc(500px - 2rem);
				margin: 1rem auto;
				justify-content: space-between;
				padding: 1rem;
				border-radius: 8px;
				border: 2px solid var(--accent-color);

				> div {
					flex: 1;

					&:first-child {
						padding-right: 8px;
					}

					p:first-child {
						font-size: 0.75rem;
						color: var(--primary-color);
						opacity: 50%;
					}
				}

				.type-of-use {
					border-left: 1px solid var(--accent-color);
					padding-left: 8px;
				}
			}

			.tags {
				max-width: calc(500px - 2rem);
				margin: 1rem auto;
				display: flex;
				flex-wrap: wrap;
				gap: 0.5rem;

				> span {
					display: inline-block;
					width: fit-content;
					padding: 0.25rem 0.5rem;
					border-radius: 8px;
					border: 2px solid var(--accent-color);
					color: var(--text-color);
				}
			}
		}
	}

	img {
		width: 100%;
		max-width: 500px;
		object-fit: contain;
	}
</style>
