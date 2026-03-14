<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;

  class Particle {
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
    type: 'petal' | 'sparkle';
    color: string;

    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
      this.x = Math.random() * width;
      this.y = Math.random() * height - height;
      this.size = Math.random() * 8 + 4;
      this.speedY = Math.random() * 1 + 0.5;
      this.speedX = Math.random() * 1 - 0.5;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 1 - 0.5;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.type = Math.random() > 0.7 ? 'sparkle' : 'petal';
      this.color = this.type === 'sparkle' ? '#FFF' : '#D4B6FF';
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
      
      if (this.type === 'petal') {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size/2, -this.size, this.size/2, -this.size, 0, 0);
        ctx.fillStyle = this.color;
        ctx.fill();
      } else {
        // Star/Sparkle shape
        const spikes = 4;
        const outerRadius = this.size;
        const innerRadius = this.size / 2;
        let rot = Math.PI / 2 * 3;
        let x = 0;
        let y = 0;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(0, -outerRadius);
        for (let i = 0; i < spikes; i++) {
          x = Math.cos(rot) * outerRadius;
          y = Math.sin(rot) * outerRadius;
          ctx.lineTo(x, y);
          rot += step;

          x = Math.cos(rot) * innerRadius;
          y = Math.sin(rot) * innerRadius;
          ctx.lineTo(x, y);
          rot += step;
        }
        ctx.lineTo(0, -outerRadius);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFF';
      }
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

    let particles: Particle[] = [];
    const particleCount = 60;

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
    };

    initParticles();

    let animationId: number;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles.forEach(p => {
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
