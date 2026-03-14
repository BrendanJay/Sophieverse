<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import PortfolioContent from "$lib/components/PortfolioContent.svelte";
  import KPopSection from "$lib/components/KPopSection.svelte";
  import Socials from "$lib/components/Socials.svelte";
  import Guestbook from "$lib/components/Guestbook.svelte";
</script>

<svelte:head>
  <title>Sache Sophie Anne Rafols | Oasiskitty</title>
  <meta name="description" content="Portfolio of Sache Sophie Anne Rafols (Oasiskitty)" />
</svelte:head>

<div class="space-y-32">
  <Hero />
  <PortfolioContent />
  <KPopSection />
  <Guestbook />
  <Socials />
  
  <footer class="py-12 border-t border-[var(--border-color)] text-center text-[var(--text-secondary)] text-sm">
    <p>© 2026 Sache Sophie Anne Rafols. Made with 💜 and SvelteKit.</p>
  </footer>
</div>
