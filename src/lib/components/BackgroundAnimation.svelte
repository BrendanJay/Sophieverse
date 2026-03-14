<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;

  class Petal {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
    width: number;
    height: number;

    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
      this.x = Math.random() * width;
      this.y = Math.random() * height - height;
      this.size = Math.random() * 10 + 5;
      this.speedY = Math.random() * 1 + 0.5;
      this.speedX = Math.random() * 1 - 0.5;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 1 - 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > this.height) {
        this.y = -20;
        this.x = Math.random() * this.width;
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      
      // Draw a simple petal shape (ellipse-like)
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size/2, -this.size, this.size/2, -this.size, 0, 0);
      ctx.fillStyle = '#BF95FF'; // Neon purple petal
      ctx.fill();
      ctx.restore();
    }
  }

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let petals: Petal[] = [];
    const petalCount = 50;

    const initPetals = () => {
      petals = [];
      for (let i = 0; i < petalCount; i++) {
        petals.push(new Petal(width, height));
      }
    };

    initPetals();

    let animationId: number;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      petals.forEach(petal => {
        petal.update();
        petal.draw(ctx);
      });
      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Re-init petals on resize to update their width/height reference
      petals.forEach(p => {
        p.width = width;
        p.height = height;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
></canvas>
