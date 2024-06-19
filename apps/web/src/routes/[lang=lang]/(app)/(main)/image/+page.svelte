<script lang="ts">
	let input: HTMLInputElement | null
	let image: File | null = null
	let preview: string = ''

	const handleFileChange = () => {
		image = input?.files?.item(0) || null
		preview = image ? URL.createObjectURL(image) : ''
	}

	// Data
	export let data
	export let form
</script>

<section class="container">
	<form method="post" enctype="multipart/form-data">
		{#if preview}
			<img src={preview} alt="Preview" />
		{/if}
		<label for="image">Image</label>
		<input
			bind:this={input}
			type="file"
			id="image"
			name="image"
			accept="image/*"
			required
			on:change={handleFileChange}
		/>
		<button>Submit</button>
	</form>
	{#if form}
		<p>Image successfully uploaded:</p>
		<figure>
			<img src={form.url} alt="Uploaded image" />
			<figcaption>{form.url}</figcaption>
		</figure>
	{/if}
</section>

<style lang="scss">
	.container {
		margin-top: 48px;
	}
</style>
