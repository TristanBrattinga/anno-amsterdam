<script>
    import { onMount } from 'svelte';

    let data = null;
    let error = null;
    let wgs84Coords = null;

    async function fetchProxyData(cords) {
        try {
            const response = await fetch(`/api/proxy?coordinate1=${cords.coordinate1}&coordinate2=${cords.coordinate2}&format=text`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await response.text();
            console.log(responseData);

            // Extract WGS84 coordinates from the plain text response
            const wgs84Match = responseData.match(/WGS84\(E,N\):\s*([\d.]+),\s*([\d.]+)/);
            if (wgs84Match) {
                const latitude = parseFloat(wgs84Match[1]);
                const longitude = parseFloat(wgs84Match[2]);
                wgs84Coords = { latitude, longitude };
                console.log(wgs84Coords, "is wgs84Coords");
                return wgs84Coords;
            } else {
                throw new Error('Failed to parse WGS84 coordinates');
            }
        } catch (err) {
            error = err.message;
            console.error('Error:', error);
            return null;
        }
    }

    function processCords(cordsBAG) {
        const cords = {
            coordinate1: cordsBAG[0],
            coordinate2: cordsBAG[1],
        };
        console.log(cords);
        fetchProxyData(cords).then(coordsData => {
            console.log('Fetched WGS84 coordinates:', coordsData);
        });
    }

    onMount(() => {
        // Example data for `data`
        data = {
            adresseerbaarObjectGeometrie: {
                punt: {
                    coordinates: [85530, 446100]
                }
            }
        };

        const cordsBAG = data.adresseerbaarObjectGeometrie.punt.coordinates;
        console.log(cordsBAG.slice(0, 2));
        processCords(cordsBAG);
    });
</script>

{#if error}
    <p>Error: {error}</p>
{:else if wgs84Coords}
    <p>WGS84 Coordinates: {wgs84Coords.latitude}, {wgs84Coords.longitude}</p>
{:else}
    <p>Loading...</p>
{/if}
