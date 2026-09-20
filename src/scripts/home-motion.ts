import { loadingEvent } from '../lib/loading-state';

type Gsap = typeof import('gsap')['gsap'];
type ScrollPlugin = typeof import('gsap/ScrollTrigger')['ScrollTrigger'];
type Tween = ReturnType<Gsap['to']>;
type Timeline = ReturnType<Gsap['timeline']>;

let currentRoot: HTMLElement | null = null;
let generation = 0;
let cleanup = () => {};

function disposeHome() {
  generation++;
  cleanup();
  cleanup = () => {};
  currentRoot = null;
}

function animateHome(root: HTMLElement, gsap: Gsap, ScrollTrigger: ScrollPlugin) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  const seenCards = new WeakSet<Element>();
  let introFinished = false;

  media.add({
    desktop: '(min-width: 768px)',
    mobile: '(max-width: 767px)',
    pointer: '(min-width: 768px) and (hover: hover) and (pointer: fine)',
    reduced: '(prefers-reduced-motion: reduce)',
  }, (context) => {
    if (context.conditions?.reduced) {
      root.dataset.motionState = 'static';
      return;
    }

    const hero = root.querySelector<HTMLElement>('[data-home-hero]')!;
    const entrance = root.querySelector<HTMLElement>('[data-network-entrance]')!;
    const scrolling = root.querySelector<HTMLElement>('[data-network-scroll]')!;
    const pointer = root.querySelector<HTMLElement>('[data-network-pointer]')!;
    const listeners = new AbortController();
    const loops: (Tween | Timeline)[] = [];
    const reveals: { tween: Tween; requested: boolean }[] = [];
    let disposed = false;
    let loaderReady = false;
    let releaseTimer: number;
    let bounds = { top: 0, left: 0, width: 1, height: 1 };
    let heroVisible = hero.getBoundingClientRect().bottom > 0;
    let xTo: ReturnType<Gsap['quickTo']> | undefined;
    let yTo: ReturnType<Gsap['quickTo']> | undefined;

    const intro = gsap.timeline({ paused: true, onComplete: () => { introFinished = true; } });
    if (!introFinished) {
      intro.from(entrance, { autoAlpha: 0, duration: 0.6, ease: 'power2.out' }, 0)
        .from(root.querySelectorAll('[data-home-intro]'), {
          autoAlpha: 0, y: 10, duration: 0.35, stagger: 0.06, ease: 'power3.out',
        }, 0.06);
    }

    root.querySelectorAll('[data-network-float]').forEach((group, index) => {
      loops.push(gsap.to(group, {
        x: index ? -3 : 3, y: index ? -6 : 6,
        duration: index ? 14 : 10, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true,
      }));
    });

    root.querySelectorAll<SVGCircleElement>('[data-network-pulse]').forEach((pulse, index) => {
      if (context.conditions?.mobile && pulse.classList.contains('network-desktop')) return;
      const duration = 3.2 + index * 0.3;
      const timeline = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.2, delay: index * 0.65 });
      timeline.fromTo(pulse, { x: 0, y: 0 }, {
        x: Number(pulse.dataset.dx), y: Number(pulse.dataset.dy), duration, ease: 'none',
      }, 0).to(pulse, { opacity: 0.85, duration: 0.3 }, 0)
        .to(pulse, { opacity: 0, duration: 0.3 }, duration - 0.3);
      loops.push(timeline);
    });

    const scrollTween = gsap.to(scrolling, {
      y: -32, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 },
    });
    const scrollTrigger = scrollTween.scrollTrigger!;
    let scrollEnabled = true;

    const canPlay = () => loaderReady && !document.hidden && !document.documentElement.hasAttribute('data-loading');
    const sync = () => {
      if (disposed) return;
      const ready = canPlay();
      const ambient = ready && heroVisible;
      root.dataset.motionState = ambient ? 'running' : 'paused';
      for (const loop of loops) loop.paused(!ambient);
      if (!introFinished) intro.paused(!ambient);
      for (const reveal of reveals) reveal.tween.paused(!(ready && reveal.requested));
      if (!ambient) {
        xTo?.tween.pause();
        yTo?.tween.pause();
      }
      if (scrollEnabled !== ready) {
        scrollEnabled = ready;
        if (ready) scrollTrigger.enable(false, false);
        else scrollTrigger.disable(false);
      }
    };

    root.querySelectorAll<HTMLElement>('[data-home-project]').forEach((card, index) => {
      if (seenCards.has(card)) return;
      const reveal = {
        requested: false,
        tween: gsap.from(card, {
          autoAlpha: 0, y: 16, duration: 0.45, delay: index * 0.08,
          ease: 'power3.out', paused: true,
        }),
      };
      reveals.push(reveal);
      ScrollTrigger.create({
        trigger: card, start: 'top 90%', once: true,
        onEnter: () => {
          seenCards.add(card);
          reveal.requested = true;
          sync();
        },
      });
    });

    const measure = () => {
      const rect = hero.getBoundingClientRect();
      bounds = { top: rect.top + window.scrollY, left: rect.left + window.scrollX, width: rect.width, height: rect.height };
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(hero);

    if (context.conditions?.pointer) {
      xTo = gsap.quickTo(pointer, 'x', { duration: 0.65, ease: 'power3.out' });
      yTo = gsap.quickTo(pointer, 'y', { duration: 0.65, ease: 'power3.out' });
      hero.addEventListener('pointerenter', measure, { signal: listeners.signal });
      hero.addEventListener('pointermove', (event) => {
        if (!canPlay() || !heroVisible) return;
        xTo!(gsap.utils.clamp(-8, 8, ((event.pageX - bounds.left) / bounds.width - 0.5) * 16));
        yTo!(gsap.utils.clamp(-8, 8, ((event.pageY - bounds.top) / bounds.height - 0.5) * 16));
      }, { signal: listeners.signal, passive: true });
      hero.addEventListener('pointerleave', () => {
        if (canPlay()) { xTo!(0); yTo!(0); }
      }, { signal: listeners.signal });
    }

    const observer = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting && entry.intersectionRatio > 0;
      sync();
    }, { threshold: [0, 0.001] });
    observer.observe(hero);

    const loadingChanged = (busy: boolean) => {
      window.clearTimeout(releaseTimer);
      loaderReady = false;
      sync();
      if (!busy) {
        releaseTimer = window.setTimeout(() => {
          loaderReady = true;
          sync();
        }, 180);
      }
    };
    document.addEventListener(loadingEvent, (event) => loadingChanged(event.detail.active), { signal: listeners.signal });
    document.addEventListener('astro:before-preparation', () => loadingChanged(true), { signal: listeners.signal });
    document.addEventListener('visibilitychange', sync, { signal: listeners.signal });
    window.addEventListener('pageshow', sync, { signal: listeners.signal });
    loadingChanged(document.documentElement.hasAttribute('data-loading'));

    void document.fonts.ready.then(() => {
      if (!disposed) { measure(); ScrollTrigger.refresh(); }
    });

    return () => {
      disposed = true;
      window.clearTimeout(releaseTimer);
      listeners.abort();
      observer.disconnect();
      resizeObserver.disconnect();
      delete root.dataset.motionState;
    };
  }, root);

  return () => media.revert();
}

function initHome() {
  const root = document.querySelector<HTMLElement>('[data-home]');
  if (root === currentRoot) return;
  disposeHome();
  if (!root) return;
  currentRoot = root;
  root.dataset.motionState = 'static';
  const revision = generation;
  const listeners = new AbortController();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pending = false;
  let disposeMotion: (() => void) | undefined;

  const start = async () => {
    if (pending || disposeMotion || reducedMotion.matches) return;
    pending = true;
    try {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (revision !== generation || !root.isConnected || reducedMotion.matches) return;
      disposeMotion = animateHome(root, gsap, ScrollTrigger);
    } catch (error) {
      // O HTML permanece utilizável caso a biblioteca não esteja disponível.
      console.warn('Animação da Home indisponível; usando composição estática.', error);
    } finally {
      pending = false;
    }
  };
  reducedMotion.addEventListener('change', start, { signal: listeners.signal });
  cleanup = () => {
    listeners.abort();
    disposeMotion?.();
    delete root.dataset.motionState;
  };
  void start();
}

document.addEventListener('astro:page-load', initHome);
document.addEventListener('astro:before-swap', disposeHome);
if (document.readyState !== 'loading') initHome();
