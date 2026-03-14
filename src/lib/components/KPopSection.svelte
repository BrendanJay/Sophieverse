<script lang="ts">
  import { Heart, Sparkles, Music, Play, Pause, Square } from 'lucide-svelte';
  import { scrollReveal } from '$lib/actions/scrollReveal';
  import { isMainMusicPaused, activeKpopTrack } from '$lib/audioStore';
  import { onMount } from 'svelte';

  const kpopGroups = [
    { 
      name: 'NewJeans', 
      jp: 'ニュージーンズ', 
      desc: 'Hype Boy, Attention, Ditto', 
      thumbnail: '/assets/images/NewJeans.png', 
      video: '/assets/kpop/NewJeans.mp4',
      audio: '/music/kpop/NewJeans.mp3'
    },
    { 
      name: 'Katseye', 
      jp: 'キャッツアイ', 
      desc: 'Debut Global Girl Group', 
      thumbnail: '/assets/images/Katseye.png',
      video: '/assets/kpop/Katseye.mp4',
      audio: '/music/kpop/Katseye.mp3'
    },
    { 
      name: 'Unis', 
      jp: 'ユニス', 
      desc: 'Superwoman, Curious', 
      thumbnail: '/assets/images/Unis.png',
      video: '/assets/kpop/Unis.mp4',
      audio: '/music/kpop/Unis.mp3'
    },
    { 
      name: 'TWICE', 
      jp: 'トゥワイス', 
      desc: 'What is Love, Fancy, Feel Special', 
      thumbnail: '/assets/images/Twice.png',
      video: '/assets/kpop/Twice.mp4',
      audio: '/music/kpop/Twice.mp3'
    }
  ];

  let hoveredGroup = $state<string | null>(null);
  let currentPlayingAudio = $state<HTMLAudioElement | null>(null);
  let currentlyPlayingName = $state<string | null>(null);

  function toggleKpopMusic(group: any) {
    // If clicking the same one that's playing
    if (currentlyPlayingName === group.name) {
      stopMusic();
      return;
    }

    // Stop any existing K-pop music
    stopMusic();

    // Start new music
    const audio = new Audio(group.audio);
    audio.volume = 0.5;
    
    audio.onplay = () => {
      isMainMusicPaused.set(true);
      currentlyPlayingName = group.name;
      activeKpopTrack.set(group.name);
    };

    audio.onended = () => {
      stopMusic();
    };

    audio.play().catch(err => console.log("Kpop playback blocked:", err));
    currentPlayingAudio = audio;
  }

  function stopMusic() {
    if (currentPlayingAudio) {
      currentPlayingAudio.pause();
      currentPlayingAudio = null;
    }
    currentlyPlayingName = null;
    activeKpopTrack.set(null);
    isMainMusicPaused.set(false);
  }

  onMount(() => {
    return () => stopMusic();
  });
</script>

<section id="kpop" class="py-32 relative overflow-hidden bg-white/5">
  <div class="absolute top-0 left-0 p-10 opacity-10 text-9xl font-bold font-kawaii -rotate-12 select-none pointer-events-none">K-POP</div>
  
  <div class="max-w-7xl mx-auto px-6 relative z-10">
    <div class="mb-16" use:scrollReveal={{ origin: 'left' }}>
      <span class="jp-label text-lg">大好きなグループ</span>
      <h2 class="text-5xl font-bold flex items-center gap-4">
        <span class="text-neon-purple text-6xl">#</span> K-pop Groups I Loved
      </h2>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each kpopGroups as group, i}
        <div 
          class="glass p-1 group hover:scale-[1.03] transition-all duration-500 relative overflow-hidden"
          use:scrollReveal={{ delay: i * 150, origin: 'bottom' }}
          onmouseenter={() => hoveredGroup = group.name}
          onmouseleave={() => hoveredGroup = null}
        >
          <!-- Media Container -->
          <div class="relative h-64 rounded-[1.6rem] overflow-hidden mb-4 bg-charcoal/50 group/media">
            <!-- Thumbnail (Always base layer) -->
            <img 
              src={group.thumbnail} 
              alt={group.name} 
              class="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover/media:scale-110"
            />

            <!-- Video (Overlay on hover) -->
            {#if group.video && hoveredGroup === group.name}
              <video 
                src={group.video}
                autoplay
                loop
                muted
                playsinline
                class="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover/media:scale-110 z-10"
              ></video>
            {/if}
            
            <!-- Music Play Toggle Overlay -->
            <button 
              onclick={() => toggleKpopMusic(group)}
              class="absolute inset-0 flex items-center justify-center bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
              <div class="w-16 h-16 rounded-full glass border-2 border-neon-purple flex items-center justify-center text-neon-purple shadow-[0_0_20px_rgba(212,182,255,0.5)] hover:scale-110 transition-transform">
                {#if currentlyPlayingName === group.name}
                  <Square size={32} fill="currentColor" />
                {:else}
                  <Play size={32} fill="currentColor" class="ml-1" />
                {/if}
              </div>
            </button>

            <!-- Floating Sparkles on hover -->
            {#if hoveredGroup === group.name || currentlyPlayingName === group.name}
              <div class="absolute top-2 right-2 animate-bounce z-30">
                <Sparkles class="text-neon-purple" size={24} />
              </div>
            {/if}

            <!-- Active Playing Glow -->
            {#if currentlyPlayingName === group.name}
              <div class="absolute inset-0 border-4 border-neon-purple animate-pulse z-10 pointer-events-none"></div>
            {/if}
          </div>

          <div class="p-6 rounded-[1.8rem] bg-[var(--bg-primary)] h-full border-2 border-transparent group-hover:border-neon-purple/30 transition-colors text-center">
            <div class="flex justify-center mb-4">
              <div class="w-12 h-12 rounded-full bg-neon-purple/10 flex items-center justify-center text-neon-purple {currentlyPlayingName === group.name ? 'animate-spin' : ''}">
                <Music size={24} />
              </div>
            </div>
            <span class="jp-label">{group.jp}</span>
            <h3 class="text-xl font-bold mb-1 group-hover:text-neon-purple transition-colors">{group.name}</h3>
            <p class="text-[var(--text-secondary)] text-xs leading-relaxed italic">"{group.desc}"</p>
            
            <div class="mt-4 flex items-center justify-center gap-1 text-neon-purple/40">
              <Heart size={12} class="fill-current" />
              <span class="text-[10px] font-kawaii uppercase tracking-widest">Stan Forever</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  @reference "../../app.css";
</style>
