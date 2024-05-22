<script lang="ts">
	import { page } from '$app/stores';
	import { setLocale } from '$i18n/i18n-svelte';

	// Components
	import { Logo } from '$components';

	// Icons
	import Home from 'lucide-svelte/icons/home';
	import List from 'lucide-svelte/icons/list';
	import Map from 'lucide-svelte/icons/map';
	import Cog from 'lucide-svelte/icons/cog';

	export let data;
	setLocale(data.locale);

	type MenuItem = {
		name: string;
		href: string;
		icon: typeof Home;
	};

	const menuItems: MenuItem[] = [
		{
			name: 'Home',
			href: '',
			icon: Home
		},
		{
			name: 'Map',
			href: '/map',
			icon: Map
		},
		{
			name: 'List',
			href: '/list',
			icon: List
		}
	];
</script>

<slot />
