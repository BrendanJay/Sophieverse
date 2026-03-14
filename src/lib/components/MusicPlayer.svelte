<script lang="ts">
  import { onMount } from 'svelte';
  import { Music, Volume2, VolumeX, Sparkles } from 'lucide-svelte';
  import { isMainMusicPaused } from '$lib/audioStore';

  let audio: HTMLAudioElement;
  let isPlaying = $state(false);
  let isMuted = $state(false); // Changed to unmuted for direct sound
  let volume = $state(0.1); // Set to 10% as requested

  // Path to your custom soundtrack in the static/music folder
  const trackUrl = "/music/Soundtrack.mp3"; 

  // Watch for global pause signal from K-pop tracks
  isMainMusicPaused.subscribe(paused => {
    if (audio) {
      if (paused) {
        audio.pause();
        isPlaying = false;
      } else if (!paused && !isMuted) {
        // When K-pop stops, restart the main track from the beginning
        audio.currentTime = 0;
        audio.play().then(() => isPlaying = true).catch(() => {});
      }
    }
  });

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.log("Autoplay blocked, needs interaction:", err));
    }
    isPlaying = !isPlaying;
  }

  function toggleMute() {
    isMuted = !isMuted;
    if (audio) audio.muted = isMuted;
    if (!isMuted && !isPlaying) {
      audio.play().catch(err => console.log("Play on unmute blocked:", err));
      isPlaying = true;
    }
  }

  onMount(() => {
    audio.volume = volume;
    audio.muted = isMuted;
    
    // Start playing only when the user clicks anywhere on the website
    const handleFirstClick = () => {
      if (!isPlaying) {
        audio.play().then(() => {
          isPlaying = true;
        }).catch(err => {
          console.log("Playback failed:", err);
        });
      }
    };

    window.addEventListener('click', handleFirstClick, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstClick);
    };
  });
</script>

<div class="fixed bottom-8 left-8 z-50 flex items-center gap-4 group">
  <!-- Decorative Label -->
  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <span class="jp-label text-right mb-0">BGM を再生</span>
    <span class="text-[10px] font-kawaii text-[var(--text-primary)] block">Now Playing: Kawaii Vibes</span>
  </div>

  <div class="flex flex-col gap-2">
    <!-- Play/Pause Button -->
    <button
      onclick={togglePlay}
      class="w-12 h-12 rounded-full glass border-2 border-neon-purple/40 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:border-neon-purple shadow-[0_0_20px_rgba(212,182,255,0.3)] relative overflow-hidden"
      aria-label="Toggle Music"
    >
      {#if isPlaying}
        <div class="absolute inset-0 bg-neon-purple/10 animate-pulse"></div>
        <Music class="text-neon-purple animate-pulse relative z-10" size={20} />
      {:else}
        <Music class="text-neon-purple/50 relative z-10" size={20} />
      {/if}
    </button>

    <!-- Mute/Unmute Button -->
    <button
      onclick={toggleMute}
      class="w-12 h-12 rounded-full glass border-2 border-neon-purple/40 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:border-neon-purple shadow-[0_0_20px_rgba(212,182,255,0.3)]"
      aria-label="Toggle Mute"
    >
      {#if isMuted}
        <VolumeX class="text-neon-purple/50" size={20} />
      {:else}
        <Volume2 class="text-neon-purple" size={20} />
      {/if}
    </button>
  </div>

  <audio
    bind:this={audio}
    src={trackUrl}
    loop
  ></audio>
</div>

<style>
  @reference "../../app.css";
</style>
