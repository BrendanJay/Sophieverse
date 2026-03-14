<script lang="ts">
  import { onMount } from 'svelte';
  import { Sun, Moon } from 'lucide-svelte';

  let isLight = $state(false);

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
      isLight = true;
      document.documentElement.classList.add('light');
    }
  });

  function toggleTheme() {
    isLight = !isLight;
    if (isLight) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }
</script>

<button
  onclick={toggleTheme}
  class="w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-500 hover:scale-110 hover:border-neon-purple shadow-[0_0_15px_rgba(212,182,255,0.3)] relative group overflow-hidden"
  aria-label="Toggle Theme"
>
  <div class="relative z-10 transition-transform duration-500 group-hover:rotate-12">
    {#if isLight}
      <Sun class="text-neon-violet" size={20} />
    {:else}
      <Moon class="text-neon-purple" size={20} />
    {/if}
  </div>
  
  <div class="absolute inset-0 bg-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
</button>

<style>
  @reference "../../app.css";
</style>
