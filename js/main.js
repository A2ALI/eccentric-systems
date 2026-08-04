/**
 * Eccentric Systems - Main UI Interactions & Scroll Behavior
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Navigation scroll state
  const nav = document.querySelector('.nav');
  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. IntersectionObserver for scroll animations (.animate-in)
  const animatedElements = document.querySelectorAll('.animate-in');
  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  // 3. CTA Click Tracking
  document.querySelectorAll('a.cta, a.card-cta, a.nav-cta').forEach(link => {
    link.addEventListener('click', function () {
      const ctaLabel = this.getAttribute('data-cta-label') || this.innerText.trim();
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('cta_click', {
          cta_label: ctaLabel,
          href: this.getAttribute('href')
        });
      }
    });
  });
});
