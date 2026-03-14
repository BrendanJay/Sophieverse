<script lang="ts">
  import { onMount } from 'svelte';
  import { Heart, Star, Sparkles, Cat, Smile, Send, Trash2 } from 'lucide-svelte';
  import { scrollReveal } from '$lib/actions/scrollReveal';

  interface Entry {
    id: number;
    name: string;
    message: string;
    sticker: string;
    date: string;
    color: string;
  }

  let entries = $state<Entry[]>([]);
  let newName = $state('');
  let newMessage = $state('');
  let selectedSticker = $state('Heart');
  
  const stickers = [
    { name: 'Heart', icon: Heart, color: 'text-pink-400' },
    { name: 'Star', icon: Star, color: 'text-yellow-400' },
    { name: 'Cat', icon: Cat, color: 'text-neon-purple' },
    { name: 'Sparkles', icon: Sparkles, color: 'text-blue-400' },
    { name: 'Smile', icon: Smile, color: 'text-green-400' }
  ];

  onMount(() => {
    const stored = localStorage.getItem('sophieverse_guestbook');
    if (stored) {
      entries = JSON.parse(stored);
    } else {
      // Pre-fill with some "personality" entries
      entries = [
        {
          id: 1,
          name: 'Oasiskitty',
          message: 'Welcome to my world! Leave a sticker and say hi! 🐾',
          sticker: 'Cat',
          date: new Date().toLocaleDateString(),
          color: 'text-neon-purple'
        }
      ];
    }
  });

  function addEntry() {
    if (!newName.trim() || !newMessage.trim()) return;

    const stickerObj = stickers.find(s => s.name === selectedSticker);
    const newEntry: Entry = {
      id: Date.now(),
      name: newName,
      message: newMessage,
      sticker: selectedSticker,
      date: new Date().toLocaleDateString(),
      color: stickerObj?.color || 'text-white'
    };

    entries = [newEntry, ...entries];
    localStorage.setItem('sophieverse_guestbook', JSON.stringify(entries));
    
    // Reset form
    newName = '';
    newMessage = '';
  }

  function deleteEntry(id: number) {
    entries = entries.filter(e => e.id !== id);
    localStorage.setItem('sophieverse_guestbook', JSON.stringify(entries));
  }

  const getStickerIcon = (name: string) => {
    return stickers.find(s => s.name === name)?.icon || Heart;
  };
</script>

<section id="guestbook" class="py-32 relative overflow-hidden bg-[var(--bg-secondary)]/30">
  <div class="absolute top-0 left-0 p-10 opacity-5 text-9xl font-bold font-kawaii -rotate-6 select-none pointer-events-none">ゲストブック</div>

  <div class="max-w-5xl mx-auto px-6 relative z-10">
    <div class="text-center mb-16" use:scrollReveal={{ origin: 'bottom' }}>
      <span class="jp-label text-lg">メッセージを残す</span>
      <h2 class="text-5xl font-bold flex items-center justify-center gap-4">
        <span class="text-neon-purple text-6xl">#</span> Sticker Guestbook
      </h2>
      <p class="mt-4 text-[var(--text-secondary)] font-medium">Leave a piece of your heart or a cute sticker on my board! ✨</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Left: Input Form -->
      <div 
        class="kawaii-card p-8 h-fit lg:sticky lg:top-32"
        use:scrollReveal={{ origin: 'left' }}
      >
        <div class="space-y-6">
          <div>
            <label for="name" class="jp-label">名前 / Name</label>
            <input 
              id="name"
              type="text" 
              bind:value={newName}
              placeholder="Your cute name..."
              class="w-full bg-white/5 border-2 border-neon-purple/20 rounded-2xl px-4 py-3 focus:border-neon-purple outline-none transition-all"
            />
          </div>

          <div>
            <label for="message" class="jp-label">メッセージ / Message</label>
            <textarea 
              id="message"
              bind:value={newMessage}
              placeholder="Write something sweet..."
              rows="3"
              class="w-full bg-white/5 border-2 border-neon-purple/20 rounded-2xl px-4 py-3 focus:border-neon-purple outline-none transition-all resize-none"
            ></textarea>
          </div>

          <div>
            <label class="jp-label">ステッカー / Sticker</label>
            <div class="flex flex-wrap gap-3">
              {#each stickers as sticker}
                <button
                  onclick={() => selectedSticker = sticker.name}
                  class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 {selectedSticker === sticker.name ? 'bg-neon-purple/20 border-2 border-neon-purple scale-110 shadow-lg' : 'bg-white/5 border-2 border-transparent hover:border-neon-purple/30'}"
                >
                  <sticker.icon class={sticker.color} size={24} />
                </button>
              {/each}
            </div>
          </div>

          <button
            onclick={addEntry}
            disabled={!newName.trim() || !newMessage.trim()}
            class="w-full py-4 rounded-2xl bg-neon-purple text-charcoal font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            <Send size={20} />
            Post Message!
          </button>
        </div>
      </div>

      <!-- Right: Entries Board -->
      <div class="lg:col-span-2 space-y-6">
        {#each entries as entry (entry.id)}
          {@const Icon = getStickerIcon(entry.sticker)}
          <div 
            class="glass p-6 group hover:border-neon-purple/40 transition-all duration-500 animate-fade-up relative overflow-hidden"
          >
            <div class="flex items-start gap-6 relative z-10">
              <div class="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-neon-purple/20 shadow-inner">
                <Icon class={entry.color} size={32} />
              </div>
              
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-xl font-bold text-neon-purple">{entry.name}</h4>
                  <span class="text-[10px] font-mono text-[var(--text-secondary)]">{entry.date}</span>
                </div>
                <p class="text-[var(--text-primary)] leading-relaxed italic">"{entry.message}"</p>
              </div>

              <button 
                onclick={() => deleteEntry(entry.id)}
                class="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                title="Delete entry"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <!-- Background Decoration -->
            <div class="absolute -bottom-2 -right-2 opacity-5 scale-150 rotate-12 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Icon size={80} />
            </div>
          </div>
        {:else}
          <div class="text-center py-20 kawaii-card opacity-50 italic">
            No messages yet... Be the first to leave one! 🌸
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  @reference "../../app.css";
</style>
