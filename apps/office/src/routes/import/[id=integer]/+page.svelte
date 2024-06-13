<script lang="ts">
	import UpdateForm from '$lib/components/UpdateForm.svelte';

	export let data;

</script>


<h1>Update: {data.building.address}  </h1>

<UpdateForm {data} />