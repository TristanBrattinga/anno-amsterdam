<script lang="ts">
    // Stores
    import { page } from '$app/stores'

    // Types
    import type { Building, Coords, Tag } from '$types'

    // Utils
    import { getDistance, viewMode } from '$lib'

    // Components
    import ImageSlider from '$components/ImageSlider.svelte'

    // Props
    export let building: Building
    export let location: Coords | null = null
    export let moreInfo: string
    export let distanceTo: string
    export let map: string


    // Distance to building in km
    $: km =
        location && building.location.coordinates[0] !== 0
            ? getDistance(
                { lat: location.lat, lng: location.lng },
                { lat: building.location.coordinates[0], lng: building.location.coordinates[1] }
            )
            : building.distance || 0

    // Distance to building in km or m
    $: distance = km > 0 ? Math.round(km < 1 ? km * 1000 : km) + (km < 1 ? ' m' : ' km') : ''
</script>


<a href={`/${$page.data.locale}/building/${building.id}`} class={`group ${$viewMode === 'grid' ? 'grid' : ''}`}>
    <div>
        <!--{#if building.image_urls.length < 2}-->
        <img src={building.image_urls[0].url} alt="" />
        <!--{:else}-->
        <!--            <ImageSlider images={building.image_urls} />-->
        <!--        {/if}-->
    </div>
    <section>
        <div>
            <h2>{building.name}</h2>
            <ul>
                <li>
                    <button on:click={(e) => e.preventDefault()}>Tag 1</button>
                </li>
                <li>
                    <button on:click={(e) => e.preventDefault()}>Tag 2</button>
                </li>
            </ul>
        </div>
        <h3>Anno {building.construction_year}</h3>
        <div>
            {#if location || building.distance}
                <p>{distanceTo}</p>
                <p>{distance ? `${distance}` : ''}</p>
            {/if}
        </div>
    </section>
</a>

<style lang="scss">
  a {
    display: flex;
    gap: 20px;
    padding: .5rem;
    border: 1px solid var(--accent-color);
    border-radius: 5px;
    height: 100%;
    transition: all .3s ease-in-out;

    &:hover {
      border-color: var(--primary-color-light);
    }

    section {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;

      > div:first-child {
        display: flex;
        justify-content: space-between;

        h2 {
          font-weight: 400;
          color: var(--primary-color-dark);
          text-transform: capitalize;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;

          @media (max-width: 768px) {
            font-size: 1rem;
          }
        }

        ul {
          display: none;

          @media (min-width: 500px) {
            display: flex;
            gap: .5rem;

            button {
              border: 1px solid var(--primary-color-light);
              padding: .25rem;
              border-radius: 5px;
              transition: all .2s ease-in-out;
            }

            &:hover {
              background-color: var(--primary-color-light);
              color: white;
            }
          }
        }
      }

      > div:last-of-type {
        height: 2.375rem;
      }

      h3 {
        color: var(--secondary-color-light);
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 1;
        font-family: 'Noto Serif', Helvetica, sans-serif;
        margin-bottom: 1rem;

        @media (max-width: 768px) {
          margin-bottom: .5rem;
        }
      }

      > div:nth-of-type(2) p:first-child {
        font-size: 0.75rem;
        color: var(--primary-color-light);
        opacity: 50%;
      }
    }

    &.grid {
      flex-direction: column;
      gap: .5rem;

      > div:nth-of-type(1) {
        display: block;
        width: 100%;
        height: 10vh;
        overflow: hidden;
        border-radius: 5px;

        img {
          width: 100%;
          height: 100%;
          max-height: 110px;
          object-fit: cover;
        }
      }

    }

    > div:nth-of-type(1) {
      display: block;
      width: 50%;
      height: 140px;
      overflow: hidden;
      border-radius: 5px;

      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
        transition: transform .3s ease-in-out;
        border-radius: 5px;

        &:hover {
          transform: scale(1.05);
        }
      }
    }

    &.group:hover {
      > div:nth-of-type(1) img {
        transform: scale(1.05);
      }
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: .75rem;
    }
  }
</style>
