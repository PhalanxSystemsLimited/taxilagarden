/**
 * Motion layer — Lenis smooth scroll + GSAP/ScrollTrigger/SplitText.
 * Calm, premium, fast: power3/expo easing, 0.6–0.9s, transform/opacity/clip-path only.
 * Fully disabled under prefers-reduced-motion (content is simply shown).
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const isRtl = root.dir === 'rtl';

function showEverything() {
  root.classList.remove('js-motion', 'js-intro');
  document.querySelectorAll('[data-split]').forEach((el) => el.classList.add('is-split'));
}

function init() {
  (window as unknown as { __motionReady?: boolean }).__motionReady = true;
  if (reduce) {
    showEverything();
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: 'power3.out', duration: 0.8 });

  /* ---------------- Smooth scroll ---------------- */
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true, autoRaf: false });
  (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.addEventListener('tghs:lock-scroll', () => lenis.stop());
  window.addEventListener('tghs:unlock-scroll', () => lenis.start());
  // Clean up on navigation (MPA): kill triggers and Lenis.
  window.addEventListener('pagehide', () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    lenis.destroy();
  });
  // In-page anchors through Lenis
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a || a.getAttribute('href') === '#') return;
    const target = document.querySelector(a.getAttribute('href')!);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target as HTMLElement, { offset: -96 });
  });

  /* ---------------- Split headings ---------------- */
  const splitLines = (el: HTMLElement) => {
    el.classList.add('is-split');
    return SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'line', autoSplit: true, aria: 'auto' });
  };

  /* ---------------- Intro (once per session) + hero ---------------- */
  const intro = document.getElementById('intro');
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const heroTl = gsap.timeline({ paused: true });

  if (hero) {
    const h1 = hero.querySelector<HTMLElement>('[data-hero-title]');
    if (h1) {
      const split = splitLines(h1);
      heroTl.from(split.lines, { yPercent: 110, duration: 0.9, ease: 'expo.out', stagger: 0.12 }, 0.05);
    }
    heroTl.fromTo(
      hero.querySelectorAll('[data-hero-fade]'),
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      0.25,
    );
    // LCP-friendly: hero copy is visible from first paint and only slides into place.
    heroTl.from(hero.querySelectorAll('[data-hero-rise]'), { y: 24, duration: 0.9 }, 0.15);
  }

  const startHero = () => heroTl.play();

  if (intro && root.classList.contains('js-intro')) {
    try {
      sessionStorage.setItem('tghs-intro', '1');
    } catch {
      /* private mode */
    }
    lenis.stop();
    gsap
      .timeline({
        onComplete: () => {
          root.classList.remove('js-intro');
          lenis.start();
        },
      })
      .from('#intro [data-intro-logo]', { opacity: 0, y: 12, duration: 0.5 })
      .fromTo('#intro [data-intro-line]', { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'expo.inOut' }, '-=0.15')
      .to(intro, { opacity: 0, duration: 0.35, ease: 'power2.inOut' }, '+=0.05')
      .add(startHero, '-=0.3');
  } else {
    root.classList.remove('js-intro');
    startHero();
  }

  // Everything below the hero is set up when the main thread is idle (keeps first load snappy).
  const idle = (fn: () => void) =>
    typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(fn, { timeout: 900 }) : setTimeout(fn, 200);
  idle(setupScrollMotion);
}

function setupScrollMotion() {
  /* ---------------- Section headings (split lazily, when they scroll into view) ---------------- */
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    if (el.hasAttribute('data-hero-title')) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'line', aria: 'auto' });
        gsap.set(split.lines, { yPercent: 110 });
        el.classList.add('is-split');
        gsap.to(split.lines, {
          yPercent: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.1,
          onComplete: () => split.revert(),
        });
      },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal="eyebrow"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: isRtl ? 24 : -24 },
      { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: el, start: 'top 90%', once: true } },
    );
  });

  /* ---------------- Blocks & cards: fade + rise, staggered ---------------- */
  const blocks = gsap.utils.toArray<HTMLElement>('[data-reveal]:not([data-reveal="eyebrow"])');
  gsap.set(blocks, { y: 32 });
  ScrollTrigger.batch(blocks, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, overwrite: true }),
  });

  /* ---------------- Images: clip reveal + parallax ---------------- */
  document.querySelectorAll<HTMLElement>('[data-reveal-clip]').forEach((el) => {
    gsap.to(el, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax || 8);
    gsap.fromTo(
      el,
      { yPercent: -amount / 2, scale: 1.1 },
      {
        yPercent: amount / 2,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  /* ---------------- Count-up stats ---------------- */
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    const obj = { v: 0 };
    const render = () => {
      el.textContent = obj.v.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: el.dataset.grouping !== 'false',
      });
    };
    gsap.to(obj, {
      v: end,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: render,
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onStart: render,
      delay: el.closest('[data-hero]') ? 1 : 0,
    });
  });

  /* ---------------- Road-width bars ---------------- */
  document.querySelectorAll<HTMLElement>('[data-bar]').forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } },
    );
  });

  /* ---------------- Desktop-only pointer effects ---------------- */
  if (finePointer) {
    // Plot cards: slight 3D tilt
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
      const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
      gsap.set(card, { transformPerspective: 900 });
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx(-py * 5);
        ry(px * 5);
      });
      card.addEventListener('pointerleave', () => {
        rx(0);
        ry(0);
      });
    });

    // Primary CTAs: magnetic pull
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((btn) => {
      const x = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
      const y = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        x((e.clientX - (r.left + r.width / 2)) * 0.25);
        y((e.clientY - (r.top + r.height / 2)) * 0.35);
      });
      btn.addEventListener('pointerleave', () => {
        x(0);
        y(0);
      });
    });
  }

  // Fonts can change line breaks — refresh once they are ready.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

try {
  init();
} catch (err) {
  console.warn('[motion] disabled:', err);
  showEverything();
}
