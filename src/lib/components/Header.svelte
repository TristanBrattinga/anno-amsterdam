<script lang="ts">
	// Stores
	import { page } from '$app/stores';

	// Components
	import { Logo } from '$components';

	// Icons
	import Cog from 'lucide-svelte/icons/cog';

	// Props
	export let settings: string;
</script>

<header>
	<Logo />
	Amsterdam
	<a href={`/${$page.data.locale}/settings`} aria-label={settings}>
		<Cog />
	</a>
</header>
