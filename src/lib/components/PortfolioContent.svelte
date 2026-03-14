<script lang="ts">
  import { Music, Film, Heart as HeartIcon, BookOpen, Gamepad2, Sparkles } from 'lucide-svelte';
  import { scrollReveal } from '$lib/actions/scrollReveal';
  
  const hobbies = [
    { name: 'Music', icon: Music, color: 'text-blue-400' },
    { name: 'Watch movies/ videos', icon: Film, color: 'text-red-400' },
    { name: 'Dog/Cat lover', icon: HeartIcon, color: 'text-pink-400' },
    { name: 'Reading', icon: BookOpen, color: 'text-green-400' }
  ];

  const games = [
    { name: 'PIMD', desc: 'Party in my Dorm', icon: Sparkles },
    { name: 'Animal Crossing', desc: 'Relaxing island life', icon: Sparkles },
    { name: 'Stardew Valley', desc: 'Farming and friendship', icon: Sparkles },
    { name: 'And more...', desc: 'Exploring new worlds', icon: Gamepad2 }
  ];
</script>

<section id="hobbies" class="py-24 bg-charcoal/30 backdrop-blur-sm">
  <div class="max-w-7xl mx-auto px-6">
    <h2 
      class="text-4xl font-bold mb-12 flex items-center gap-4"
      use:scrollReveal={{ origin: 'left' }}
    >
      <span class="text-neon-purple">#</span> Hobbies
    </h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each hobbies as hobby, i}
        <div 
          class="glass p-8 rounded-3xl neon-border group transition-all duration-500 decorative-border"
          use:scrollReveal={{ delay: i * 100 }}
        >
          <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            <hobby.icon class="{hobby.color}" size={28} />
          </div>
          <h3 class="text-xl font-bold mb-2 group-hover:text-neon-purple transition-colors">{hobby.name}</h3>
          <p class="text-gray-400 text-sm">Passionate about exploring and enjoying {hobby.name.toLowerCase()}.</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section id="games" class="py-24">
  <div class="max-w-7xl mx-auto px-6">
    <h2 
      class="text-4xl font-bold mb-12 flex items-center gap-4"
      use:scrollReveal={{ origin: 'right' }}
    >
      <span class="text-neon-purple">#</span> Games I Played
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each games as game, i}
        <div 
          class="glass p-1 rounded-3xl neon-border group overflow-hidden decorative-border"
          use:scrollReveal={{ delay: i * 150, origin: 'bottom' }}
        >
          <div class="p-8 rounded-[1.4rem] bg-charcoal h-full transition-colors group-hover:bg-white/5">
            <div class="flex items-start justify-between mb-6">
              <div class="w-12 h-12 rounded-2xl bg-neon-purple/10 flex items-center justify-center text-neon-purple">
                <game.icon size={24} />
              </div>
              <div class="text-xs font-mono text-neon-purple/50 tracking-widest uppercase">Gamer Mode</div>
            </div>
            <h3 class="text-2xl font-bold mb-2 group-hover:text-neon-purple transition-colors">{game.name}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">{game.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  @reference "../../app.css";
  .glass {
    @apply bg-white/5 backdrop-blur-md border border-white/10;
  }
</style>
