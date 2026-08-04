/**
 * Eccentric Systems - Cookie Consent & Tracking Integration
 * GA4 ID: G-2PPX3V33CG
 * Microsoft Clarity ID: xwsr0lzjpm
 * Scripts are ONLY injected dynamically after explicit user consent.
 */

(function () {
  'use strict';

  const GA_ID = 'G-2PPX3V33CG';
  const CLARITY_ID = 'xwsr0lzjpm';
  const STORAGE_KEY = 'cookie_consent';

  let gaInjected = false;
  let clarityInjected = false;

  function injectGA() {
    if (gaInjected) return;
    gaInjected = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function injectClarity() {
    if (clarityInjected) return;
    clarityInjected = true;

    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }

  function trackEvent(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  }
  window.trackEvent = trackEvent;

  function applyConsent(consentValue) {
    if (consentValue === 'accepted') {
      injectGA();
      injectClarity();
    } else if (typeof consentValue === 'object' && consentValue !== null) {
      if (consentValue.analytics) injectGA();
      if (consentValue.recording) injectClarity();
    }
  }

  function initCookieBanner() {
    const savedConsent = localStorage.getItem(STORAGE_KEY);
    const banner = document.getElementById('cookie-banner');
    const modal = document.getElementById('cookie-modal');

    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        applyConsent(parsed);
      } catch (e) {
        applyConsent(savedConsent);
      }
      return;
    }

    if (banner) {
      banner.classList.add('active');
    }

    const acceptBtn = document.getElementById('cookie-accept');
    const manageBtn = document.getElementById('cookie-manage');
    const savePrefsBtn = document.getElementById('cookie-save-prefs');
    const rejectAllBtn = document.getElementById('cookie-reject-all');
    const closeModalBtn = document.getElementById('cookie-modal-close');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem(STORAGE_KEY, 'accepted');
        if (banner) banner.classList.remove('active');
        applyConsent('accepted');
      });
    }

    if (manageBtn) {
      manageBtn.addEventListener('click', function () {
        if (modal) modal.classList.add('active');
      });
    }

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', function () {
        if (modal) modal.classList.remove('active');
      });
    }

    if (savePrefsBtn) {
      savePrefsBtn.addEventListener('click', function () {
        const analytics = document.getElementById('toggle-analytics')?.checked ?? true;
        const recording = document.getElementById('toggle-recording')?.checked ?? true;
        const consentObj = { analytics: analytics, recording: recording };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(consentObj));
        if (modal) modal.classList.remove('active');
        if (banner) banner.classList.remove('active');
        applyConsent(consentObj);
      });
    }

    if (rejectAllBtn) {
      rejectAllBtn.addEventListener('click', function () {
        localStorage.setItem(STORAGE_KEY, 'rejected');
        if (modal) modal.classList.remove('active');
        if (banner) banner.classList.remove('active');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieBanner);
  } else {
    initCookieBanner();
  }
})();
