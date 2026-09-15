import { useEffect } from 'react';

// Progressive enhancement: content is visible unless an observer is ready.
// Native links and scrolling keep working without animation support.
export function useMotion() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
    let observer;
    let frame;

    function showAll() {
      observer?.disconnect();
      elements.forEach((element) => element.classList.remove('reveal-pending'));
    }
    function restore(event) {
      if (event.persisted) showAll();
    }

    function setup() {
      showAll();
      if (preference.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
      elements.forEach((element) => {
        if (element.getBoundingClientRect().top >= window.innerHeight) {
          element.classList.add('reveal-pending');
          observer.observe(element);
        }
      });
    }

    // Restore direct chapter links after React has rendered their targets.
    frame = requestAnimationFrame(() => {
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { id = ''; }
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
      setup();
    });
    preference.addEventListener('change', setup);
    window.addEventListener('pageshow', restore);
    return () => {
      cancelAnimationFrame(frame);
      showAll();
      preference.removeEventListener('change', setup);
      window.removeEventListener('pageshow', restore);
    };
  }, []);
}
