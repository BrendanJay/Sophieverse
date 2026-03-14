<script lang="ts">
  import { onMount } from 'svelte';
  import { Cat, Heart, Sparkles, Star } from 'lucide-svelte';
  import profileImage from '$lib/assets/Profile.png';
  import { scrollReveal } from '$lib/actions/scrollReveal';

  let nameText = "Sache Sophie Anne Rafols";
  let displayedName = $state("");
  let showNickname = $state(false);
  let index = 0;

  onMount(() => {
    const typeWriter = () => {
      if (index < nameText.length) {
        displayedName += nameText.charAt(index);
        index++;
        setTimeout(typeWriter, 80);
      } else {
        setTimeout(() => {
          showNickname = true;
        }, 500);
      }
    };
    typeWriter();
  });

  // Heart interaction logic
  let likes = $state(0);
  onMount(() => {
    const storedLikes = localStorage.getItem('sophieverse_likes');
    if (storedLikes) likes = parseInt(storedLikes);
  });

  const handleLike = () => {
    likes++;
    localStorage.setItem('sophieverse_likes', likes.toString());
  };
</script>

<section id="home" class="min-h-screen flex items-center justify-center py-20 overflow-hidden relative">
  <!-- Decorative background elements -->
  <div class="absolute top-20 left-10 text-neon-purple/20 text-8xl font-bold -rotate-12 select-none">KAWAII</div>
  <div class="absolute bottom-20 right-10 text-neon-purple/20 text-8xl font-bold rotate-12 select-none">ソフィー</div>

  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
    
    <!-- Left: Profile Image -->
    <div class="relative group" use:scrollReveal={{ origin: 'left' }}>
      <!-- Pulsing Neon Ring -->
      <div class="absolute inset-0 rounded-full bg-neon-purple/20 blur-3xl animate-pulse"></div>
      
      <div class="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
        <!-- Profile Container -->
        <div class="w-full h-full rounded-[3rem] border-4 border-neon-purple/30 overflow-hidden kawaii-glow p-4 bg-[var(--bg-secondary)] backdrop-blur-sm relative decorative-border">
          <div class="w-full h-full rounded-[2rem] overflow-hidden bg-white/5 flex items-center justify-center relative">
             <img src={profileImage} alt="Oasiskitty" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>

        <!-- Chopper Character Icon -->
        <div class="absolute -top-6 -right-6 w-24 h-24 rounded-3xl glass p-3 border-2 border-neon-purple/50 flex items-center justify-center animate-bounce shadow-[0_0_20px_rgba(212,182,255,0.4)] bg-[var(--bg-secondary)]">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Chopper" alt="Chopper" class="w-full h-full object-contain" title="Chopper" />
          <div class="absolute -top-2 -left-2 text-xl">🌸</div>
        </div>

        <!-- Animated Cat -->
        <div class="absolute -bottom-8 -right-8 w-32 h-32 flex flex-col items-center justify-center">
          <div class="relative group">
            <div class="absolute inset-0 bg-neon-purple/40 blur-lg rounded-full animate-ping"></div>
            <Cat class="text-neon-purple relative z-10" size={50} />
            <div class="text-[10px] font-kawaii text-neon-purple mt-1 font-bold">ニャー</div>
          </div>
        </div>
        
        <!-- Floating Sparkles -->
        <Sparkles class="absolute top-10 -left-10 text-pastel-pink animate-pulse" size={30} />
        <Star class="absolute bottom-20 -left-16 text-pastel-blue animate-bounce" size={25} />
      </div>
    </div>

    <!-- Right: Text Content -->
    <div class="space-y-8" use:scrollReveal={{ origin: 'right', delay: 300 }}>
      <div class="space-y-2">
        <span class="jp-label text-xl">はじめまして !</span>
        <h1 class="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
          {displayedName}<span class="text-neon-purple animate-pulse">_</span>
        </h1>
      </div>
      
      {#if showNickname}
        <div class="inline-flex items-center gap-4 bg-neon-purple/10 px-6 py-2 rounded-full border border-neon-purple/30 animate-fade-up">
          <span class="text-neon-purple font-kawaii">ニックネーム:</span>
          <span class="text-2xl font-bold text-[var(--text-primary)] drop-shadow-[0_0_8px_rgba(212,182,255,0.6)]">Oasiskitty</span>
          <span class="text-xl">🐾</span>
        </div>
      {/if}

      <p class="text-xl text-[var(--text-secondary)] max-w-lg leading-relaxed font-medium italic">
        "I’m a collector of cozy hobbies, a veteran of pixelated worlds, and a full-time cat enthusiast. Welcome to my little corner of the neon-violet universe. Stay a while—we have yarn."
      </p>

      <div class="flex flex-wrap items-center gap-6 pt-4">
        <button 
          onclick={handleLike}
          class="group flex items-center gap-4 glass px-10 py-4 rounded-full border-2 border-neon-purple/40 hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-500 shadow-[0_0_15px_rgba(212,182,255,0.2)]"
        >
          <div class="relative">
            <Heart class="text-neon-purple group-hover:scale-125 transition-transform duration-300 {likes > 0 ? 'fill-neon-purple' : ''}" size={28} />
            {#if likes > 0}
              <div class="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
            {/if}
          </div>
          <div class="text-left">
            <span class="block text-xs jp-label m-0">いいね !</span>
            <span class="text-lg font-bold">{likes} <span class="text-sm font-normal text-gray-400">by viewers</span></span>
          </div>
        </button>
        
        <div class="flex items-center gap-2 text-neon-purple animate-pulse">
          <Sparkles size={20} />
          <span class="text-sm font-kawaii font-bold">KAWAII VIBES ONLY</span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @reference "../../app.css";
</style>
