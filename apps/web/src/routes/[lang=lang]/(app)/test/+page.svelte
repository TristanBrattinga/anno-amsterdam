<script lang="ts">
	import { Sidebar } from '$components';
	import { onMount } from 'svelte';

	let sidebarOpen = false;
	let startX: number;

	const toggleSidebar = (event: TouchEvent) => {
		if (event.type === 'touchstart') {
			console.log('ja');
			startX = event.touches[0].clientX;
		} else if (event.type === 'touchmove') {
			const touchX = event.touches[0].clientX;
			if (touchX - startX > 100) {
				sidebarOpen = true;
			} else if (startX - touchX > 100) {
				sidebarOpen = false;
			}
		}
	};

	// Force reactivity on sidebarOpen
	$: sidebarOpen;
</script>

<style>
    #main {
        transition: margin-left 0.3s ease-out;
        padding: 16px;
        margin-left: 0;
    }

    #main.shifted {
        margin-left: 250px; /* Shift main content when sidebar is open */
    }

    .swipe-area {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 20px;
        z-index: 2;
    }
</style>

<Sidebar bind:open={sidebarOpen} {toggleSidebar} />

<div id="main" class:shifted={sidebarOpen} on:touchstart={toggleSidebar} on:touchmove={toggleSidebar}>
	<h2>Slideable Sidebar Example</h2>
	<p>Swipe the notch to open the sidebar, and click on the 'x' icon to close it.</p>
</div>

<div class="swipe-area" on:touchstart={toggleSidebar}></div>
