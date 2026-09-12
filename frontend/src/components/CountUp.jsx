import React, { useState, useEffect, useRef } from 'react';

/**
 * CountUp — animates a number from 0 to `target` when it scrolls into view.
 *
 * Usage:
 *   <CountUp target={150} suffix="+" />
 *   <CountUp target={95} suffix="%" duration={2000} />
 */
export default function CountUp({ target, suffix = '', duration = 1800, style }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startCounting = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let start = 0;

      const interval = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);
    };

    if (!('IntersectionObserver' in window)) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounting();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} style={style}>
      {count}{suffix}
    </span>
  );
}
