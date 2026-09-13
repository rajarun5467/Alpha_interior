import { useEffect } from 'react';

/**
 * Global scroll-reveal animation system.
 *
 * Any element with a `data-reveal` attribute will animate in when it scrolls
 * into the viewport. Optional `data-reveal-delay` (ms) staggers the animation.
 *
 * A MutationObserver watches the DOM so elements added later (e.g. after an
 * API fetch re-renders a list) are picked up automatically.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const reveal = (el, obs) => {
      const delay = el.getAttribute('data-reveal-delay');
      if (delay) el.style.transitionDelay = `${delay}ms`;
      el.classList.add('reveal-visible');
      if (obs) obs.unobserve(el);
    };

    let observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target, obs);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
      );
    }

    const observeAll = () => {
      document.querySelectorAll('[data-reveal]:not(.reveal-visible)').forEach((el) => {
        if (observer) observer.observe(el);
        else reveal(el);
      });
    };

    observeAll();

    // Watch for dynamically added [data-reveal] elements (API-driven content)
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (observer) observer.disconnect();
      mo.disconnect();
    };
  }, []);
}
