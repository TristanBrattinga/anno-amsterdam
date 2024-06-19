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


<a href={`/${$page.data.locale}/building/${building.id}`} class={$viewMode === 'grid' ? 'grid' : ''}>
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

    <!--            <form action={`/${$page.data.locale}/map`} method="post">-->
    <!--                <input type="hidden" name="lat" value={building.location.coordinates[0]} />-->
    <!--                <input type="hidden" name="lon" value={building.location.coordinates[1]} />-->
    <!--                <button>{map}</button>-->
    <!--            </form>-->
    <!--    <ul>-->
    <!--
    <!--        &lt;!&ndash;{#if building.type_of_user || building.tags[$page.data.locale].length || building.description}&ndash;&gt;-->
    <!--        &lt;!&ndash;    <li>&ndash;&gt;-->
    <!--        &lt;!&ndash;        <a href={`/${$page.data.locale}/building/${building.id}`}>{moreInfo}</a>&ndash;&gt;-->
    <!--        &lt;!&ndash;    </li>&ndash;&gt;-->
    <!--        &lt;!&ndash;{/if}&ndash;&gt;-->
    <!--    </ul>-->
</a>

<style lang="scss">
    a {
        display: flex;
        gap: 20px;
        padding: .5rem;
        border: 1px solid var(--accent-color);
        border-radius: 5px;
        height: 100%;

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
                }

                ul {
                    display: flex;
                    gap: .5rem;

                    button {
                        border: 1px solid var(--primary-color-light);
                        padding: .25rem;
                        border-radius: 5px;
                        transition: all .2s ease-in-out;

                        &:hover {
                            background-color: var(--primary-color-light);
                            color: white;
                        }
                    }
                }
            }

            h3 {
                color: var(--secondary-color-light);
                font-weight: 500;
                font-size: 1.5rem;
                line-height: 1;
                font-family: 'Noto Serif', Helvetica, sans-serif;
            }

            > div:nth-of-type(2) p:first-child {
                font-size: 0.75rem;
                color: var(--primary-color-light);
                opacity: 50%;
            }
        }

        &.grid {
            flex-direction: column;
            gap: 10px;

            > div:nth-of-type(1) {
                display: block;
                width: 100%;
                height: auto;
                overflow: hidden;
                border-radius: 5px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

        }

        > div:nth-of-type(1) {
            display: block;
            width: 40%;
            height: 140px;
            overflow: hidden;
            border-radius: 5px;

            img {
                width: 100%;
                height: 100%;
                object-fit: fill;
                transition: transform .3s ease-in-out;

                &:hover {
                    transform: scale(1.05);
                }
            }
        }

        > div:nth-of-type(2) {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            > div:first-of-type {
                display: flex;
                justify-content: space-between;
                gap: 1.5rem;
                margin-bottom: 20px;


            }

            form button {
                padding: 10px;
                border-radius: 5px;
                border: 1px solid var(--accent-color);
                background-color: transparent;
                transition: all 0.3s ease;
                cursor: pointer;

                &:hover {
                    background-color: var(--accent-color);
                }
            }

            ul {
                display: flex;
                justify-content: space-between;
                align-items: center;

                li {


                    a {
                        background-color: var(--secondary-color-light);
                        padding: 8px 24px;
                        border-radius: 5px;
                        color: white;
                        line-height: 16px;
                        border: 1px solid var(--secondary-color-light);
                        transition: all 0.3s ease;

                        &:hover {
                            color: var(--secondary-color-light);
                            background-color: transparent;
                        }
                    }
                }
            }
        }
    }
</style>
