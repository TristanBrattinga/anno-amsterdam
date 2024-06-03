<script lang="ts">
	export let data
</script>

<section>
	<button on:click={() => history.back()}>{data.back}</button>
	<img src={data.building.image_urls[0].url} alt={data.building.name} />
	<div class="content">
		<p class="anno">Anno {data.building.construction_year}</p>
		<h1>{data.building.address}</h1>
		<div class="tags">
			{#each data.building.tags as tag}
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

		button {
			position: absolute;
			top: 0.25em;
			left: 0.5em;
		}

		.content {
			width: 100%;
			padding: 1rem;

			.tags {
				display: flex;
				flex-wrap: wrap;
				gap: 0.5rem;

				> span {
					display: inline-block;
					width: fit-content;
					padding: 0.25rem 0.5rem;
					border-radius: 8px;
					border: 2px solid var(--primary-color);
					color: var(--text-color);
				}
			}

			.anno {
				padding: 0 0.5rem;
				border-radius: 8px;
				height: 48px;
				display: flex;
				align-items: center;
				margin-top: calc(-24px - 1rem);
				width: fit-content;
				color: #fff;
				background-color: var(--secondary-color);
			}
		}
	}

	img {
		width: 100%;
		max-width: 500px;
		object-fit: contain;
	}
</style>
