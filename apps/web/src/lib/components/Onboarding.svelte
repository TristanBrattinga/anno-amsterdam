<script lang="ts">
	import Swiper from 'swiper';
	import 'swiper/swiper-bundle.css';
	import { onMount } from 'svelte';
	import { EffectFade, Navigation, Pagination } from 'swiper/modules';
	import { Step1, Step2, Step3, Step4 } from '$components/onboarding';

	let swiperInstance: Swiper;

	// Initialize Swiper on mount
	onMount(() => {
		swiperInstance = new Swiper('.swiper-container', {
			modules: [Navigation, Pagination, EffectFade],
			slidesPerView: 1,
			allowTouchMove: false,
			speed: 1000,
			navigation: {
				prevEl: '.prevButton',
				nextEl: '.nextButton'
			},
			pagination: {
				clickable: true
			}
		});
	});

	// let loading = true;
	let currentStep = 0;

	const steps = [Step1, Step2, Step3, Step4];

	const handleNextStep = () => {
		currentStep += 1;
	};

	const handleSkip = () => {
		swiperInstance.slideTo(3);
		currentStep += 3;
	};

</script>

<div class="swiper-container">
	{#if currentStep < 3}
		<button on:click={handleSkip}>Skip</button>
	{/if}
	<ul class="swiper-wrapper">
		{#each steps as Step}
			<li class="swiper-slide">
				<Step />
			</li>
		{/each}
	</ul>
	<ul class="container">
		<li>
			<button class="prevButton">Previous</button>
		</li>
		<li>
			{#if currentStep < 3}
				<button class="nextButton" on:click={handleNextStep}>Next</button>
			{:else}
				<a href="/map">Get started</a>
			{/if}
		</li>
	</ul>
</div>

<style>
    .swiper-container {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    .swiper-wrapper {
        height: 20rem;
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
</style>