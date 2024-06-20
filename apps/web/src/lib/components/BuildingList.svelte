<script lang="ts">
    // Components
    import { BuildingCell } from '$components'

    // Utils
    import type { Building, Coords } from '$types'
    import { viewMode } from '~/lib'

    // Props
    export let moreInfo: string
    export let map: string
    export let distanceTo: string
    export let buildingsTitle: string
    export let buildings: Building[]
    export let location: Coords | null = null
    export let noResults: string
</script>

<h2 class="sr-only">{buildingsTitle}</h2>
{#if buildings.length}
    <ul class={`container ${$viewMode === 'grid' ? 'grid' : ''}`}>
        {#each buildings as building}
            <li>
                <BuildingCell {building} {location} {moreInfo} {map} {distanceTo} />
            </li>
        {/each}
    </ul>
{:else}
    <p>{noResults}</p>
{/if}

<style lang="scss">
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &.grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      @media (min-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2rem;
      }
    }
  }
</style>
