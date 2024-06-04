<script>
    export let data = [];
    const excludedKeys = new Set([
        '_id',
        'location',
        'description',
        'timeline',
        'audioguids',
        'created_at',
        'updated_at'
    ]);

    function shouldDisplayKey(key) {
        return !excludedKeys.has(key);
    }
</script>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    th {
        background-color: #f2f2f2;
        text-align: left;
    }
</style>

{#if data.length > 0}
    <table>
        <thead>
        <tr>
            {#each Object.keys(data[0]).filter(shouldDisplayKey) as key}
                <th>{key}</th>
            {/each}
        </tr>
        </thead>
        <tbody>
        {#each data as item}
            <tr>
                {#each Object.entries(item).filter(([key]) => shouldDisplayKey(key)) as [key, value]}
                    <td>
                        {#if key === 'image_urls' && value.length > 0}
                            <img src={value[0].url} alt={value[0].source} style="width: 100px;" />
                        {:else if Array.isArray(value)}
                            {value.join(', ')}
                        {:else}
                            {value}
                        {/if}
                    </td>
                {/each}
            </tr>
        {/each}
        </tbody>
    </table>
{:else}
    <p>Loading...</p>
{/if}
