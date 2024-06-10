<script lang="ts">
	export let color: string = '#00425A';
	export let width: string = '30px';
	export let height: string = '30px';
</script>

<svg width={width} height={height} viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect x="7" y="4.5" width="4" height="5" rx="0.5" stroke={color} />
	<rect x="7" y="12.5" width="4" height="5" rx="0.5" stroke={color} />
	<rect x="7" y="20.5" width="4" height="5" rx="0.5" stroke={color} />
	<rect x="14.5" y="7" width="11" height="1" rx="0.5" fill={color} />
	<rect x="14.5" y="14.5" width="11" height="1" rx="0.5" fill={color} />
	<rect x="14.5" y="22" width="11" height="1" rx="0.5" fill={color} />
</svg>

