import { useEffect } from 'react';

/**
 * Global scroll-reveal animation system.
 *
 * Any element with a `data-reveal` attribute will animate in when it scrolls
 * into the viewport. Optional `data-reveal-delay` (ms) staggers the animation.
 *
 * Usage in JSX:
 *   <div data-reveal>...</div>
 *   <div data-reveal data-reveal-delay="150">...</div>
 *
 * The observer is re-run on every render cycle so dynamically mounted pages
 * (SPA route switches) are picked up automatically.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window) || elements.length === 0) {
      // Fallback: just reveal everything immediately
      elements.forEach((el) => el.classList.add('reveal-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute('data-reveal-delay');
            if (delay) {
              el.style.transitionDelay = `${delay}ms`;
            }
            el.classList.add('reveal-visible');
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
}
