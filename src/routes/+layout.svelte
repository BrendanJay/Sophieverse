<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import CustomCursor from '$lib/components/CustomCursor.svelte';
	import BackgroundAnimation from '$lib/components/BackgroundAnimation.svelte';
	import Header from '$lib/components/Header.svelte';
	import MusicPlayer from '$lib/components/MusicPlayer.svelte';
	import Lenis from 'lenis';

	let { children } = $props();

	onMount(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 2,
			infinite: false,
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative min-h-screen">
	<BackgroundAnimation />
	<CustomCursor />
	<Header />
	<MusicPlayer />
	<main class="relative z-10 px-4 pt-20">
		{@render children()}
	</main>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
