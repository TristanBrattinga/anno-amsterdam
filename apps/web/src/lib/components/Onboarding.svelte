<script lang="ts">
    import Swiper from 'swiper';
    import 'swiper/swiper-bundle.css';
    import { onMount } from 'svelte';
    import { Navigation, Pagination } from 'swiper/modules';
    import { Step1, Step2, Step3, Step4 } from '$components/onboarding';
    import { isDialogOpen } from '$lib/stores/dialog';
    import { get } from "svelte/store";
    import { LocationPopup } from "$components/index";
    import { page } from '$app/stores'

    let swiperInstance: Swiper;

    onMount(() => {
        swiperInstance = new Swiper('.swiper-container', {
            modules: [Navigation, Pagination],
            slidesPerView: 1,
            allowTouchMove: false,
            speed: 1000,
            navigation: {
                prevEl: '.prevButton',
                nextEl: '.nextButton'
            },
            pagination: {
                clickable: true,
                el: '.swiper-onboarding-pagination'
            },
            on: {
                slideChange: () => {
                    updateImagePosition();
                    updateCurrentStep();
                }
            }
        });
    });

    let currentStep = 0;
    const steps = [Step1, Step2, Step3, Step4];

    const updateImagePosition = () => {
        const progress = swiperInstance.progress;
        const image = document.querySelector('.background-image');
        if (image) {
            image.style.transform = `translateX(${ -progress * 42 }%)`;
        }
    };

    const updateCurrentStep = () => {
        currentStep = swiperInstance.realIndex;
    };

    const handleNextStep = () => {
        if (currentStep < steps.length - 1) {
            currentStep += 1;
        }
    };

    const showDialog = () => {
        isDialogOpen.set(true);
    }
</script>

<section class="swiper-container">
    <img class="background-image" src="/images/Naamloos-2%201.png" alt="" />
    <ul class="swiper-wrapper">
        {#each steps as Step}
            <li class="swiper-slide">
                <Step />
            </li>
        {/each}
    </ul>
    <div class="swiper-onboarding-pagination"></div>
    <ul class="container">
        <li>
            <a href={`/${$page.data.locale}/map`}>Skip</a>
        </li>
        <li>
            {#if currentStep < 3}
                <button class="nextButton" on:click={handleNextStep}>Next</button>
            {:else}
                <button on:click={showDialog}>Get started</button>
            {/if}
        </li>
    </ul>
</section>
{#if currentStep < 3}
    <LocationPopup />
{/if}


<style lang="scss">
  .swiper-container {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .background-image {
    transition: all 1s ease-in-out;
  }

  .swiper-wrapper {
    height: 20rem;
  }

  ul:nth-of-type(2) {
    width: 100%;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: space-between;
    bottom: 1rem;
  }

  button, a {
    font-family: Oswald, sans-serif;
    background-color: transparent;
    color: white;
    border: none;
    font-size: 1.25rem;
  }

  .nextButton {
    background-color: #D9D9D94D;
    padding: .25rem 1rem;
    border-radius: 5px;
    border: 1px solid #FF6464;
  }
</style>
