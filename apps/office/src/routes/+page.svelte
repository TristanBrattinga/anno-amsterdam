<script lang="ts">
	import LinkButton from '$lib/components/LinkButton.svelte';
	import Table from '$lib/components/Table.svelte';
	export let data;
</script>

<h1>Gebouwen</h1>
<div>
	<LinkButton href="/import" size="large" cta={false} subtle={false}>+ Nieuw gebouw</LinkButton>
</div>
<Table data={data.buildings} />


<style lang="scss">
  div {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }


</style>
