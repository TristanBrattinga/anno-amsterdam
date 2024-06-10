<script lang="ts">
	import UpdateForm from '$lib/components/UpdateForm.svelte';
	import Papa from 'papaparse';

	export let data;
	console.log(data);

</script>


<h1>Update: {data.ownMatch.address}  </h1>

<UpdateForm {data} />