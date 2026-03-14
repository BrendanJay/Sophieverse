<script lang="ts">
  import { Facebook, Ghost, Sparkles, MessageCircle } from 'lucide-svelte';
  import { scrollReveal } from '$lib/actions/scrollReveal';

  const socials = [
    {
      name: 'Facebook',
      jp: 'フェイスブック',
      url: 'https://www.facebook.com/oasiskittyy',
      icon: Facebook,
      color: 'hover:text-blue-500',
      bg: 'hover:bg-blue-500/10'
    },
    {
      name: 'Steam',
      jp: 'スチーム',
      url: 'https://steamcommunity.com/profiles/76561198841629351',
      icon: Ghost, // Use Ghost or a custom SVG
      color: 'hover:text-indigo-400',
      bg: 'hover:bg-indigo-400/10'
    }
  ];
</script>

<section id="socials" class="py-32 relative overflow-hidden">
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 opacity-5 text-[15rem] font-bold font-kawaii select-none pointer-events-none">つながり</div>

  <div class="max-w-7xl mx-auto px-6 relative z-10 text-center">
    <div class="mb-16" use:scrollReveal={{ origin: 'bottom' }}>
      <span class="jp-label text-lg">私を見つけて</span>
      <h2 class="text-5xl font-bold flex items-center justify-center gap-4">
        <span class="text-neon-purple text-6xl">#</span> Social Media
      </h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
      {#each socials as social, i}
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          class="kawaii-card p-12 flex flex-col items-center group decorative-border {social.bg} transition-all duration-500"
          use:scrollReveal={{ delay: i * 200, origin: 'bottom' }}
        >
          <div class="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg {social.color}">
            {#if social.name === 'Steam'}
              <!-- Custom Steam SVG for better representation -->
              <svg viewBox="0 0 24 24" class="w-12 h-12 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.372 0 0 5.372 0 12c0 1.25.19 2.45.54 3.58l5.24 2.15c.34-.13.72-.21 1.12-.21.15 0 .29.02.43.05l2.45-3.56c-.05-.14-.08-.29-.08-.45 0-1.1.89-1.99 1.99-1.99s1.99.89 1.99 1.99c0 1.1-.89 1.99-1.99 1.99-.15 0-.3-.02-.44-.06l-3.56 2.45c.03.14.05.28.05.43 0 1.1-.89 1.99-1.99 1.99-.44 0-.85-.14-1.18-.38l-2.6 1.07C3.38 22.8 7.5 24 12 24c6.628 0 12-5.372 12-12S18.628 0 12 0zm-3.23 18.06c0 .41-.33.74-.74.74-.41 0-.74-.33-.74-.74s.33-.74.74-.74c.41 0 .74.33.74.74zm1.18-1.55c-.41 0-.74-.33-.74-.74 0-.41.33-.74.74-.74.41 0 .74.33.74.74 0 .41-.33.74-.74.74zm5.55-2.52c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-1.5 0c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5z"/>
              </svg>
            {:else}
              <social.icon size={48} />
            {/if}
          </div>
          <span class="jp-label">{social.jp}</span>
          <h3 class="text-2xl font-bold group-hover:text-neon-purple transition-colors">{social.name}</h3>
          <div class="mt-4 flex items-center gap-2 text-neon-purple/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles size={16} />
            <span class="text-xs font-kawaii">Click to visit!</span>
          </div>
        </a>
      {/each}
    </div>
    
    <div class="mt-16 flex items-center justify-center gap-4 text-neon-purple/40 animate-pulse">
      <MessageCircle size={20} />
      <span class="text-sm font-kawaii font-bold">LET'S CONNECT!</span>
    </div>
  </div>
</section>

<style>
  @reference "../../app.css";
</style>
