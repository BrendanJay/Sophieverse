<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import CustomCursor from '$lib/components/CustomCursor.svelte';
	import BackgroundAnimation from '$lib/components/BackgroundAnimation.svelte';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative min-h-screen">
	<BackgroundAnimation />
	<CustomCursor />
	<Header />
	<main class="relative z-10 px-4 pt-20">
		{@render children()}
	</main>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
