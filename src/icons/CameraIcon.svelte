<script lang="ts">
	export let color: string = '#073854'
	export let width: number = 32
	export let height: number = 32
</script>

<svg {width} {height} viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M7.5 9H11.5L12.2721 6.68377C12.4082 6.27543 12.7903 6 13.2208 6H17.7792C18.2097 6 18.5918 6.27543 18.7279 6.68377L19.5 9H23.5C24.6046 9 25.5 9.89543 25.5 11V21C25.5 22.1046 24.6046 23 23.5 23H7.5C6.39543 23 5.5 22.1046 5.5 21V11C5.5 9.89543 6.39543 9 7.5 9Z"
		stroke={color}
		stroke-linejoin="round"
	/>
	<circle cx="15.5" cy="15.5" r="4" stroke={color} />
</svg>
