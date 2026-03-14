<script lang="ts">
  import { onMount } from 'svelte';

  let x = $state(0);
  let y = $state(0);
  let mouseX = $state(0);
  let mouseY = $state(0);

  onMount(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Smooth lag logic
    const animate = () => {
      x += (mouseX - x) * 0.12; // Smooth factor
      y += (mouseY - y) * 0.12;
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  });
</script>

<div 
  class="custom-cursor flex items-center justify-center text-neon-purple drop-shadow-[0_0_12px_rgba(191,149,255,0.9)] pointer-events-none"
  style="transform: translate3d({x - 24}px, {y - 24}px, 0)"
>
  <!-- Custom Cat Paw SVG -->
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12,14c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3S13.66,14,12,14z M7,11c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S8.1,11,7,11z M17,11c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S18.1,11,17,11z M10,6c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S11.1,6,10,6z M14,6c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S15.1,6,14,6z" />
  </svg>
</div>

<style>
  :global(body) {
    cursor: none;
  }
  
  :global(a, button) {
    cursor: none !important;
  }
</style>
