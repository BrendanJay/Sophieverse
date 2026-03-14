<script lang="ts">
  import { onMount } from 'svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import { Facebook, Ghost } from 'lucide-svelte';
  
  const navItems = [
    { name: 'Home', jp: 'ホーム', href: '#home' },
    { name: 'Hobbies', jp: '趣味', href: '#hobbies' },
    { name: 'Games', jp: 'ゲーム', href: '#games' },
    { name: 'K-pop', jp: 'アイドル', href: '#kpop' }
  ];

  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/oasiskittyy', icon: Facebook },
    { name: 'Steam', url: 'https://steamcommunity.com/profiles/76561198841629351', isSteam: true }
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
  class="fixed top-0 left-0 w-full z-50 transition-all duration-500 {scrolled ? 'py-2' : 'py-6'}"
>
  <nav class="max-w-7xl mx-auto px-6 flex items-center justify-between">
    <div class="group relative cursor-pointer">
      <div class="text-2xl font-bold neon-text flex items-center gap-2">
        <span class="text-3xl">✨</span> Sophie<span class="text-white">verse</span>
      </div>
      <div class="jp-label absolute -bottom-4 left-0 opacity-0 group-hover:opacity-100 transition-opacity">ソフィーバース</div>
    </div>
    
    <div class="flex items-center gap-4 md:gap-8">
      {#each navItems as item}
        <a 
          href={item.href}
          class="group relative px-4 py-2"
        >
          <span class="jp-label text-center group-hover:text-neon-purple transition-colors">{item.jp}</span>
          <span class="text-sm font-medium transition-all duration-300 group-hover:text-neon-purple block text-center">
            {item.name}
          </span>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-neon-purple rounded-full transition-all duration-300 group-hover:w-2/3 shadow-[0_0_10px_rgba(212,182,255,0.8)]"></div>
        </a>
      {/each}

      <div class="ml-4 border-l border-neon-purple/20 pl-4 flex items-center gap-4">
        {#each socialLinks as social}
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            class="text-[var(--text-secondary)] hover:text-neon-purple transition-colors"
            aria-label={social.name}
          >
            {#if social.isSteam}
              <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.372 0 0 5.372 0 12c0 1.25.19 2.45.54 3.58l5.24 2.15c.34-.13.72-.21 1.12-.21.15 0 .29.02.43.05l2.45-3.56c-.05-.14-.08-.29-.08-.45 0-1.1.89-1.99 1.99-1.99s1.99.89 1.99 1.99c0 1.1-.89 1.99-1.99 1.99-.15 0-.3-.02-.44-.06l-3.56 2.45c.03.14.05.28.05.43 0 1.1-.89 1.99-1.99 1.99-.44 0-.85-.14-1.18-.38l-2.6 1.07C3.38 22.8 7.5 24 12 24c6.628 0 12-5.372 12-12S18.628 0 12 0zm-3.23 18.06c0 .41-.33.74-.74.74-.41 0-.74-.33-.74-.74s.33-.74.74-.74c.41 0 .74.33.74.74zm1.18-1.55c-.41 0-.74-.33-.74-.74 0-.41.33-.74.74-.74.41 0 .74.33.74.74 0 .41-.33.74-.74.74zm5.55-2.52c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-1.5 0c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5z"/>
              </svg>
            {:else if social.icon}
              <social.icon size={20} />
            {/if}
          </a>
        {/each}
        <ThemeToggle />
      </div>
    </div>
  </nav>
</header>

<style>
  @reference "../../app.css";
</style>
