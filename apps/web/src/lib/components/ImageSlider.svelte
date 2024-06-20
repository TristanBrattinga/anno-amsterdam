<script lang="ts">
	import Swiper from 'swiper';
	import 'swiper/swiper-bundle.css';
	import { Pagination } from 'swiper/modules';
	import { onMount } from 'svelte';
	import type { Image } from '$types';

	export let images: Image[];

	// Initialize Swiper on mount
	onMount(() => {
		new Swiper('.swiper-container', {
			modules: [Pagination],
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				clickable: true,
				el: '.swiper-pagination'
			}
		});
	});
</script>

<div class="swiper-container">
<!--	TODO REFACTOR IMAGE SLIDER	-->
	<ul class="swiper-wrapper">
		{#each images as image}
			<li class="swiper-slide"><img src={image.url} alt="" /></li>
		{/each}
	</ul>
	<div class="swiper-pagination"></div>
</div>

<style lang="scss">
  .swiper-container {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
  }

  .swiper-slide {
    color: black;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .swiper-pagination {
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: fit-content;
    height: fit-content;
  }

  :global(.swiper-pagination-bullet) {
    width: 6px;
    height: 6px;
    background-color: #fff;
    opacity: 0.7;
    border-radius: 50%;
    margin: 0 5px;
    mix-blend-mode: screen;
  }

  :global(.swiper-pagination-bullet-active) {
    opacity: 1;
    background-color: #fff;
    mix-blend-mode: normal;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
</style>
