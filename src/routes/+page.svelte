<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import PortfolioContent from "$lib/components/PortfolioContent.svelte";
</script>

<svelte:head>
  <title>Sache Sophie Anne Rafols | Oasiskitty</title>
  <meta name="description" content="Portfolio of Sache Sophie Anne Rafols (Oasiskitty)" />
</svelte:head>

<div class="space-y-32">
  <Hero />
  <PortfolioContent />
  
  <footer class="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
    <p>© 2026 Sache Sophie Anne Rafols. Made with 💜 and SvelteKit.</p>
  </footer>
</div>
