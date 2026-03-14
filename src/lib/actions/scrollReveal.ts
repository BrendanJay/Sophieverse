import { onMount } from 'svelte';

interface ScrollRevealOptions {
  delay?: number;
  duration?: number;
  distance?: string;
  origin?: 'top' | 'bottom' | 'left' | 'right';
}

export function scrollReveal(node: HTMLElement, options: ScrollRevealOptions = {}) {
  let observer: IntersectionObserver;

  const {
    delay = 200,
    duration = 600,
    distance = '20px',
    origin = 'bottom'
  } = options;

  const style = getComputedStyle(node);
  const initialOpacity = style.opacity;
  const initialTransform = style.transform;

  const isVisible = () => {
    const rect = node.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const animate = (isIntersecting: boolean) => {
    if (isIntersecting) {
      node.style.transition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`;
      node.style.opacity = '1';
      node.style.transform = 'translateY(0)';
    } else if (!isVisible()) {
      // Reset when scrolling out of view
      node.style.transition = 'none'; // No transition on reset
      node.style.opacity = '0';
      node.style.transform = `translateY(${origin === 'bottom' ? distance : `-${distance}`})`;
    }
  };

  onMount(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => animate(entry.isIntersecting));
    }, { threshold: 0.1 });

    // Initial state
    node.style.opacity = '0';
    node.style.transform = `translateY(${origin === 'bottom' ? distance : `-${distance}`})`;

    observer.observe(node);

    return () => observer.disconnect();
  });

  return {
    destroy() {
      if (observer) observer.disconnect();
    }
  };
}
