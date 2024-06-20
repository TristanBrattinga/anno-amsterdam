<script>
  import { location, locError, locWatchId } from '$lib/stores/location'
  import { onMount } from 'svelte'

  export let data

  const watchLocation = () => {
    if ('geolocation' in navigator) {
      const id = navigator.geolocation.watchPosition(
        (pos) => {
          location.set({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
          locError.set(null)
        },
        (err) => {
          locError.set(err)
        },
      )
      locWatchId.set(id)
    } else {
      locError.set({
        code:                 0,
        message:              'Geolocation is not supported by this browser.',
        PERMISSION_DENIED:    1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT:              3,
      })
    }
  }

  onMount(() => {
    const storedLocation = localStorage.getItem('location')
    if (storedLocation) {
      location.set(JSON.parse(storedLocation))
    } else {
      watchLocation()
    }
  })
</script>

<h1>{data.welcome}</h1>

<section>
    <h2>Locatie</h2>
    <p>Om de app optimaal te gebruiken hebben we uw locatie nodig.</p>
    {#if $location}
        <p>Je hebt toestemming gegeven.</p>
    {:else if $locError && $locError.code === $locError.PERMISSION_DENIED}
        <p>Je hebt toestemming geweigerd. Reset je keuze en probeer nog een keer.</p>
    {:else if $locError}
        <p>Er is iets fout gegaan bij het locatie ophalen.</p>
    {/if}
    {#if !$location}
        <button
            on:click={watchLocation}
            disabled={!!$locWatchId && !$locError}
            aria-disabled={!!locWatchId && !$locError}>Locatie toestaan
        </button>
    {/if}
</section>


<style>
    button {
        background-color: var(--secondary-color-light);
    }
</style>