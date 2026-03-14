<script lang="ts">
  import { onMount } from 'svelte';
  
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Hobbies', href: '#hobbies' },
    { name: 'Games I Played', href: '#games' }
  ];

  let scrolled = $state(false);

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<header 
  class="fixed top-0 left-0 w-full z-50 transition-all duration-300 {scrolled ? 'bg-charcoal/80 backdrop-blur-lg border-b border-neon-purple/20' : ''}"
>
  <nav class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <div class="text-2xl font-bold neon-text">
      Sophie<span class="text-white">verse</span>
    </div>
    
    <div class="flex items-center gap-8">
      {#each navItems as item}
        <a 
          href={item.href}
          class="glass px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group overflow-hidden neon-border hover:text-neon-purple"
        >
          <span class="relative z-10">{item.name}</span>
          <div class="absolute inset-0 bg-neon-violet/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
        </a>
      {/each}
    </div>
  </nav>
</header>

<style>
  @reference "../../app.css";
  .glass {
    @apply bg-white/5 backdrop-blur-md border border-white/10;
  }
</style>
