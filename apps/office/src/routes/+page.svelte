<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import LinkButton from '$lib/components/LinkButton.svelte';
    import Table from '$lib/components/Table.svelte';
    import {onMount} from "svelte";


    let data = [];
    onMount(() => {


        // Fetch data from a JSON file
        async function fetchData() {
            const response = await fetch('data/data.json');

            data = await response.json();
            console.log(data)
        }

        // Fetch data when the component is mounted
        fetchData();
    });
</script>

<h1>Gebouwen</h1>
<div>
	<LinkButton href="/import" size="large" cta={false} subtle={false} >+ Nieuw gebouw</LinkButton>
</div>
<Table {data} />




<style lang="scss">
	div{
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;
	}
	
	
	
</style>
