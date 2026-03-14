<script lang="ts">
  import { Music, Film, Heart as HeartIcon, BookOpen, Gamepad2, Sparkles, Star } from 'lucide-svelte';
  import { scrollReveal } from '$lib/actions/scrollReveal';
  
  const hobbies = [
    { name: 'Music', jp: '音楽', icon: Music, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: 'Watch movies', jp: '映画', icon: Film, color: 'text-red-400', bg: 'bg-red-400/10' },
    { name: 'Pet lover', jp: 'ペット', icon: HeartIcon, color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { name: 'Reading', jp: '読書', icon: BookOpen, color: 'text-green-400', bg: 'bg-green-400/10' }
  ];

  const games = [
    { 
      name: 'PIMD', 
      jp: 'パーティー', 
      desc: 'Party in my Dorm', 
      icon: Sparkles,
      thumbnail: '/assets/images/Pimd.png', 
      video: '/assets/Pimd.mp4' 
    },
    { 
      name: 'Animal Crossing', 
      jp: 'あつ森', 
      desc: 'Relaxing island life', 
      icon: Star,
      thumbnail: '/assets/images/AnimalCrossing.png',
      video: '/assets/AnimalCrossing.mp4'
    },
    { 
      name: 'Stardew Valley', 
      jp: 'スタバレ', 
      desc: 'Farming and friendship', 
      icon: HeartIcon,
      thumbnail: '/assets/images/Stardew.png',
      video: '/assets/Stardew.mp4'
    },
    { 
      name: 'And more...', 
      jp: 'もっと', 
      desc: 'Exploring new worlds', 
      icon: Gamepad2,
      thumbnail: '/assets/images/MoreGames.png',
      video: ''
    }
  ];
</script>

<section id="hobbies" class="py-32 relative overflow-hidden">
  <div class="absolute top-0 right-0 p-10 opacity-10 text-9xl font-bold font-kawaii rotate-12 select-none">趣味</div>
  
  <div class="max-w-7xl mx-auto px-6 relative z-10">
    <div class="mb-16" use:scrollReveal={{ origin: 'left' }}>
      <span class="jp-label text-lg">私の趣味</span>
      <h2 class="text-5xl font-bold flex items-center gap-4">
        <span class="text-neon-purple text-6xl">#</span> Hobbies
      </h2>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each hobbies as hobby, i}
        <div 
          class="kawaii-card p-10 group relative decorative-border overflow-hidden"
          use:scrollReveal={{ delay: i * 100 }}
        >
          <div class="absolute top-0 right-0 p-4 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">✨</div>
          <div class="w-16 h-16 rounded-3xl {hobby.bg} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
            <hobby.icon class="{hobby.color}" size={32} />
          </div>
          <span class="jp-label">{hobby.jp}</span>
          <h3 class="text-2xl font-bold mb-3 group-hover:text-neon-purple transition-colors">{hobby.name}</h3>
          <p class="text-[var(--text-secondary)] text-sm leading-relaxed">Passionate about enjoying {hobby.name.toLowerCase()} in my cozy time.</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section id="games" class="py-32 bg-[var(--bg-secondary)] relative overflow-hidden">
  <div class="absolute bottom-0 left-0 p-10 opacity-10 text-9xl font-bold font-kawaii -rotate-12 select-none">ゲーム</div>

  <div class="max-w-7xl mx-auto px-6 relative z-10">
    <div class="mb-16 text-right" use:scrollReveal={{ origin: 'right' }}>
      <span class="jp-label text-lg">好きなゲーム</span>
      <h2 class="text-5xl font-bold flex items-center justify-end gap-4">
        Games I Played <span class="text-neon-purple text-6xl">#</span>
      </h2>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each games as game, i}
        <div 
          class="glass p-1 group hover:scale-[1.03] transition-all duration-500 relative overflow-hidden"
          use:scrollReveal={{ delay: i * 150, origin: 'bottom' }}
        >
          <!-- Media Container -->
          <div class="relative h-48 rounded-[1.6rem] overflow-hidden mb-4 bg-charcoal/50 group/media">
            <!-- Thumbnail (Always base layer) -->
            <img 
              src={game.thumbnail} 
              alt={game.name} 
              class="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover/media:scale-110"
              onerror={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/1A1A1A/D4B6FF?text=' + encodeURIComponent(game.name) }}
            />

            {#if game.video}
              <!-- Direct Video Auto-playing -->
              <video 
                src={game.video}
                autoplay
                loop
                muted
                playsinline
                class="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover/media:scale-110 z-10 opacity-0 group-hover/media:opacity-100"
                oncanplay={(e) => { if (e.currentTarget instanceof HTMLVideoElement) e.currentTarget.style.opacity = '1'; }}
              ></video>
            {/if}
            
            <!-- Glow Overlay on Hover -->
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover/media:opacity-100 transition-opacity duration-500 z-20"></div>
          </div>

          <div class="p-6 rounded-[1.8rem] bg-[var(--bg-primary)] h-full border-2 border-transparent group-hover:border-neon-purple/30 transition-colors">
            <div class="flex items-start justify-between mb-4">
              <div class="w-12 h-12 rounded-[1.1rem] bg-neon-purple/10 flex items-center justify-center text-neon-purple group-hover:rotate-12 transition-transform shadow-inner">
                <game.icon size={24} />
              </div>
              <div class="text-right">
                <span class="jp-label text-[8px] mb-0">ゲーマー</span>
                <span class="text-[10px] font-mono text-neon-purple/40 tracking-widest uppercase">Lv 99</span>
              </div>
            </div>
            <span class="jp-label">{game.jp}</span>
            <h3 class="text-xl font-bold mb-1 group-hover:text-neon-purple transition-colors">{game.name}</h3>
            <p class="text-[var(--text-secondary)] text-xs leading-relaxed">{game.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  @reference "../../app.css";
</style>
