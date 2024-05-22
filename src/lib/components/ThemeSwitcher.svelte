<script lang="ts">
	import { getModeOsPrefers, setModeCurrent, setModeUserPrefers } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data: { system: string; light: string; dark: string; theme: string };

	let selected: string = 'system';
	const onChange = () => {
		if (selected === 'system') {
			localStorage.removeItem('modeUserPrefers');
		} else {
			setModeUserPrefers(selected === 'light');
		}
		setModeCurrent(selected === 'system' ? getModeOsPrefers() : selected === 'light');
	};

	onMount(() => {
		selected =
			'modeUserPrefers' in localStorage
				? localStorage.modeCurrent === 'dark'
					? 'dark'
					: 'light'
				: 'system';
	});
</script>

<label for="theme" class="label">{data.theme}</label>
<select id="theme" class="select" bind:value={selected} on:change={onChange}>
	<option value="system">{data.system}</option>
	<option value="light">{data.light}</option>
	<option value="dark">{data.dark}</option>
</select>
