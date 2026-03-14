<script lang="ts">
  import { onMount } from 'svelte';
  import { Cat, Heart } from 'lucide-svelte';
  import profileImage from '$lib/assets/Profile.png';

  let nameText = "Sache Sophie Anne Rafols";
  let displayedName = $state("");
  let showNickname = $state(false);
  let index = 0;

  onMount(() => {
    const typeWriter = () => {
      if (index < nameText.length) {
        displayedName += nameText.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
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

<section id="home" class="min-h-screen flex items-center justify-center py-20">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
    
    <!-- Left: Profile Image -->
    <div class="relative group animate-fade-up">
      <!-- Pulsing Neon Ring -->
      <div class="absolute inset-0 rounded-full bg-neon-purple/20 blur-2xl animate-pulse"></div>
      
      <div class="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
        <!-- Main Profile Border with Chopper Icon -->
        <div class="w-full h-full rounded-full border-4 border-neon-purple/50 overflow-hidden neon-glow-violet p-2 bg-charcoal">
          <div class="w-full h-full rounded-full overflow-hidden bg-white/10 flex items-center justify-center relative">
             <!-- Placeholder Profile Image -->
             <img src={profileImage} alt="Oasiskitty" class="w-full h-full object-cover" />
          </div>
        </div>

        <!-- Chopper Character Icon (Placeholder as small circle/image) -->
        <div class="absolute -top-2 -right-2 w-16 h-16 rounded-full glass p-2 neon-border flex items-center justify-center animate-bounce">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Chopper" alt="Chopper" class="w-full h-full object-contain" title="Chopper" />
        </div>

        <!-- Animated Cat playing with yarn ball -->
        <div class="absolute -bottom-4 -right-4 w-24 h-24 flex items-center justify-center">
          <div class="relative">
            <Cat class="text-neon-purple animate-bounce" size={40} />
            <div class="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-neon-violet blur-[2px] animate-ping"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Text Content -->
    <div class="space-y-6 animate-fade-up" style="animation-delay: 0.2s;">
      <h1 class="text-4xl md:text-6xl font-bold leading-tight">
        {displayedName}<span class="animate-pulse">|</span>
      </h1>
      
      {#if showNickname}
        <div class="text-2xl md:text-3xl text-neon-purple font-medium animate-fade-up">
          a.k.a <span class="text-white drop-shadow-[0_0_8px_rgba(191,149,255,0.6)]">Oasiskitty</span>
        </div>
      {/if}

      <p class="text-lg text-gray-400 max-w-lg leading-relaxed">
        I’m a collector of cozy hobbies, a veteran of pixelated worlds, and a full-time cat enthusiast. Welcome to my little corner of the neon-violet universe. Stay a while—we have yarn."
      </p>

      <div class="flex items-center gap-6 pt-8">
        <button 
          onclick={handleLike}
          class="group flex items-center gap-3 glass px-8 py-3 rounded-full neon-border hover:bg-neon-purple/10 transition-all duration-300"
        >
          <Heart class="text-neon-purple group-hover:fill-neon-purple transition-all" />
          <span class="font-medium">{likes} by viewers</span>
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  @reference "../../app.css";
  .glass {
    @apply bg-white/5 backdrop-blur-md border border-white/10;
  }
</style>
