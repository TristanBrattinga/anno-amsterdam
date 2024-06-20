<script lang="ts">
    import { Dialog } from '$components';
    import { watchLocation, location, locError, locWatchId, isDialogOpen } from '$lib';
    import { page } from '$app/stores'
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { goto } from "$app/navigation";

    interface PropData {
        yes: string
        no: string
    }

    let dialog: HTMLDialogElement | undefined;
    export let data: PropData;

    // // Close dialog on mount to ensure it's initially closed
    // onMount(() => {
    //     dialog?.close();
    // });

    // Watch for changes in isDialogOpen to open or close the dialog
    if (get(isDialogOpen) === true) {
        dialog?.showModal();
    } else {
        dialog?.close();
    }

    // Close dialog if location is set
    // $: if ($location) {
    //     dialog?.close();
    //     isDialogOpen.set(false);
    // }
</script>

<Dialog bind:dialog>
    <h2>Locatie toestemming</h2>
    <p>Om de app optimaal te gebruiken hebben we uw locatie nodig. Staat u dit toe?</p>
    {#if $location}
        <p>Je hebt toestemming gegeven.</p>
    {:else if $locError && $locError.code === $locError.PERMISSION_DENIED}
        <p>Je hebt toestemming geweigerd. Reset je keuze en probeer nog een keer.</p>
    {:else if $locError}
        <p>Er is iets fout gegaan bij het locatie ophalen.</p>
    {/if}
    <ul>
        <li>
            <button
                on:click={() => watchLocation($locWatchId)}
                disabled={!!$locWatchId && !$locError}
                aria-disabled={!!$locWatchId && !$locError}
            >
                {data.no}
            </button>
        </li>
        <li>
            <button
                on:click={() => {
                  watchLocation($locWatchId)
                  goto(`/${$page.data.locale}/map`)
                }}
                disabled={!!$locWatchId && !$locError}
                aria-disabled={!!$locWatchId && !$locError}
            >
                {data.yes}
            </button>
        </li>
    </ul>
</Dialog>

<style lang="scss">
  :global(dialog) {
    background-color: white;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    width: 80%;
    border-radius: 5px;
    border: none;
    z-index: 10000;

    h2 {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: .5rem;
    }

    ul {
      display: flex;
      gap: 1rem;

      li {
        width: 50%;

        button {
          border-radius: 5px;
          padding: .5rem 1rem;
          margin-top: 1rem;
          width: 100%;
        }

        &:nth-of-type(1) button {
          border: 1px solid var(--primary-color-light);
          background-color: transparent;
        }

        &:nth-of-type(2) button {
          color: white;
          border: 1px solid var(--primary-color-light);
          background-color: var(--primary-color-light);
        }
      }
    }
  }
</style>
