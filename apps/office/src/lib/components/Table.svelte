<script>
    export let data;
    console.log(data)
    const excludedKeys = new Set([
		    'id',
		    'bag_id',
		    'location',
		    'description',
		    'timeline',
		    'audioguids',
		    'created_at',
		    'updated_at',
		    'image_urls'
    ]);
    
    
    function shouldDisplayKey(key) {
		    return !excludedKeys.has(key);
    }
</script>


{#if data.length > 0}
    <table>
        <thead>
        <tr>
            {#each Object.keys(data[0]).filter(shouldDisplayKey) as key}
		            {#if key === 'construction_year'}
                <th>ANNO</th>
				            
		            {:else if key === 'active'}
								<th>Status</th>
		            {:else if key === 'image_urls'}
								<th>Image</th>
		            {:else if key === 'name'}
								<th>Naam</th>
				            {:else if key === 'address'}
				            								<th>Adres</th>
				            
				            {:else if key === 'type_of_user'}
				            								<th>Gebruik</th>
		            {:else}
								<th>{key}</th>
		            {/if}
            {/each}
        </tr>
        </thead>
        <tbody>
        {#each data as item}
            <tr>
                {#each Object.entries(item).filter(([key]) => shouldDisplayKey(key)) as [key, value]}
                    <td class={key}>
                        {#if key === 'image_urls' && value.length > 0}
                            {#if value[0].is_main}
                                <img src={value[0].url}
                                     alt={value[0].source}
                                     style="width: 100px;"/>
                                {/if}
		                        {:else if key === 'name' && value.length > 0}
														<a href="/import/{item.id}">{value}</a>
		                        {:else if key === 'active'}
		                        <span class={value}>
				                        {value ? 'Actief' : 'Inactief'}
		                        </span>
                        {:else if Array.isArray(value)}
                            {value.join(', ')}
		                        
                        {:else}
		                        <span>
                            {value}
		                        </span>
                        {/if}
                    </td>
                {/each}
            </tr>
        {/each}
        </tbody>
    </table>
{:else}
<p>No data</p>
{/if}



<style lang="scss">
    table {
		    width: 100%;
		    border-collapse: collapse;
    }
    
    th{
		    padding: 8px;
		    text-align: left;
		    border-bottom: 1px solid #dddddd;
		    border-top: 1px solid #dddddd;
		    
		    &:last-of-type{
				    border-right: 1px solid #dddddd;
		    }
		    &:first-of-type{
				    border-left: 1px solid #dddddd;
		    }
    }
    
    td {
		    border-bottom: 1px solid #dddddd;
		    border-top: 1px solid #dddddd;
		    padding: 8px;
		    text-align: left;
		    &:last-of-type{
				    border-right: 1px solid #dddddd;
		    }
		    &:first-of-type{
				    border-left: 1px solid #dddddd;
		    }
		    &.image_urls {
				    width: 100px;
				    max-height: 100px;
		    }
		    
		    &.address {
				    white-space: nowrap;
		    }
		    
		    &.construction_year {
				    text-align: center;
				    max-width: fit-content;
				    
				    span {
						    font-size: 1em;
						    padding: .25em .5em;
						    color: var(--primary-color);
						    background-color: var(--bg-color-light);
						    border-radius: .5rem;
				    }
		    }
		    
		    &.active {
				    span {
						    font-size: 1em;
						    padding: .25em .5em;
						    color: var(--primary-color);
						    background-color: var(--bg-color-light);
						    border-radius: .5rem;
						    
						    &.true {
								    
								    color: var(--success-color-light);
								    background-color: var(--success-color-dark);
						    }
						    
						    &.false {
								    color: var(--error-color-light);
								    background-color: var(--error-color-dark);
						    }
						    
				    }
		    }
		    
		    &.tags {
				    max-width: 25vw;
				    text-wrap: pretty;
				    span {
						    font-size: 1em;
						    padding: .25em .5em;
						    color: var(--primary-color);
						    background-color: var(--bg-color-light);
						    border-radius: .5rem;
				    }
		    }
    }
    
    
    th {
		    background-color: #f2f2f2;
		    text-align: left;
    }
</style>