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

  // O matchMedia do GSAP só chama a função quando alguma condição casa; as duas
  // juntas cobrem todo caso, então ela sempre roda e decide pelo `reduced`.
  media.add({
    motion: '(prefers-reduced-motion: no-preference)',
    reduced: '(prefers-reduced-motion: reduce)',
  }, (context) => {
    if (context.conditions?.reduced) {
      root.dataset.motionState = 'static';
      return;
    }

    const hero = root.querySelector<HTMLElement>('[data-home-hero]')!;
    const listeners = new AbortController();
    const reveals: { tween: Tween; requested: boolean }[] = [];
    let disposed = false;
    let loaderReady = false;
    let releaseTimer: number;
    let heroVisible = hero.getBoundingClientRect().bottom > 0;

    const intro: Timeline = gsap.timeline({ paused: true, onComplete: () => { introFinished = true; } });
    if (!introFinished) {
      intro.from(root.querySelectorAll('[data-home-intro]'), {
        autoAlpha: 0, y: 10, duration: 0.35, stagger: 0.06, ease: 'power3.out',
      }, 0.06);
    }

    const canPlay = () => loaderReady && !document.hidden && !document.documentElement.hasAttribute('data-loading');
    const sync = () => {
      if (disposed) return;
      const ready = canPlay();
      root.dataset.motionState = ready && heroVisible ? 'running' : 'paused';
      if (!introFinished) intro.paused(!(ready && heroVisible));
      for (const reveal of reveals) reveal.tween.paused(!(ready && reveal.requested));
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
      if (!disposed) ScrollTrigger.refresh();
    });

    return () => {
      disposed = true;
      window.clearTimeout(releaseTimer);
      listeners.abort();
      observer.disconnect();
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
