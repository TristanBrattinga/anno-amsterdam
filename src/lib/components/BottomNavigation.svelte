<script lang="ts">
	import MapIcon from '~/icons/MapIcon.svelte'
	import CameraIcon from '~/icons/CameraIcon.svelte'
	import ListIcon from '~/icons/ListIcon.svelte'
</script>

<nav class="fixed bottom-0 w-full bg-white border-t border-primary-light-blue pt-2 pb-4">
	<ul class="flex gap-12 justify-center">
		<li>
			<MapIcon />
			<p class="text-primary-dark-blue">Map</p>
		</li>
		<li>
			<CameraIcon />
			<p class="text-primary-dark-blue">Lens</p>
		</li>
		<li>
			<ListIcon />
			<p class="text-primary-dark-blue">List</p>
		</li>
	</ul>
</nav>
