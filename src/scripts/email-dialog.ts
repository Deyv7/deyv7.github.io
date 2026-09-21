let currentDialog: HTMLDialogElement | null = null;
let cleanupEmailDialog = () => {};

function disposeEmailDialog() {
  cleanupEmailDialog();
  cleanupEmailDialog = () => {};
  currentDialog = null;
}

function initEmailDialog() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-email-dialog]');
  if (dialog === currentDialog) return;
  disposeEmailDialog();
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const panel = dialog.querySelector<HTMLElement>('.t-modal');
  const address = dialog.querySelector<HTMLInputElement>('[data-email-address]');
  const copy = dialog.querySelector<HTMLButtonElement>('[data-email-copy]');
  const status = dialog.querySelector<HTMLElement>('[data-email-status]');
  const email = dialog.dataset.email;
  if (!panel || !address || !copy || !status || !email) return;

  currentDialog = dialog;
  const listeners = new AbortController();
  const { signal } = listeners;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  let trigger: HTMLElement | null = null;
  let openingFrame = 0;
  let closingTimer = 0;
  let closing = false;
  let backdropStarted = false;
  let copyGeneration = 0;
  let disposed = false;
  let unlockScroll: (() => void) | undefined;

  function clearScheduled() {
    cancelAnimationFrame(openingFrame);
    window.clearTimeout(closingTimer);
    openingFrame = 0;
    closingTimer = 0;
  }

  function lockScroll() {
    if (unlockScroll) return;
    const properties = ['overflow', 'padding-right'] as const;
    const previous = properties.map((name) => ({
      name,
      value: root.style.getPropertyValue(name),
      priority: root.style.getPropertyPriority(name),
    }));
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const padding = Number.parseFloat(getComputedStyle(root).paddingRight) || 0;
    root.style.setProperty('overflow', 'hidden');
    if (scrollbarWidth > 0) root.style.setProperty('padding-right', `${padding + scrollbarWidth}px`);
    unlockScroll = () => {
      previous.forEach(({ name, value, priority }) => {
        if (value) root.style.setProperty(name, value, priority);
        else root.style.removeProperty(name);
      });
      unlockScroll = undefined;
    };
  }

  function reset(restoreFocus: boolean) {
    clearScheduled();
    copyGeneration++;
    closing = false;
    backdropStarted = false;
    panel!.classList.remove('is-open', 'is-closing');
    dialog!.removeAttribute('data-instant');
    copy!.disabled = false;
    status!.textContent = '';
    unlockScroll?.();
    const previousTrigger = trigger;
    trigger = null;
    if (restoreFocus && previousTrigger?.isConnected) previousTrigger.focus({ preventScroll: true });
  }

  function closeDuration() {
    const value = getComputedStyle(root).getPropertyValue('--modal-close-dur').trim();
    const duration = Number.parseFloat(value);
    if (!Number.isFinite(duration)) return 150;
    return Math.max(0, value.endsWith('ms') ? duration : duration * 1000);
  }

  function close(instant: boolean, restoreFocus = true) {
    if (!dialog!.open || closing) return;
    clearScheduled();
    copyGeneration++;
    closing = true;
    const skipAnimation = instant || reducedMotion.matches;
    dialog!.toggleAttribute('data-instant', skipAnimation);
    panel!.classList.remove('is-open');
    panel!.classList.add('is-closing');
    const finish = () => {
      dialog!.close();
      reset(restoreFocus);
    };
    if (skipAnimation) finish();
    else closingTimer = window.setTimeout(finish, closeDuration());
  }

  function open(nextTrigger: HTMLElement, instant: boolean) {
    if (dialog!.open) return true;
    clearScheduled();
    panel!.classList.remove('is-open', 'is-closing');
    dialog!.toggleAttribute('data-instant', instant || reducedMotion.matches);
    try {
      dialog!.showModal();
    } catch {
      dialog!.removeAttribute('data-instant');
      return false;
    }
    trigger = nextTrigger;
    copyGeneration++;
    status!.textContent = '';
    copy!.disabled = false;
    lockScroll();
    dialog!.querySelector<HTMLElement>('[data-email-provider]')?.focus({ preventScroll: true });
    if (instant || reducedMotion.matches) panel!.classList.add('is-open');
    else {
      // Establish the initial state before the next frame starts the transition.
      panel!.getBoundingClientRect();
      openingFrame = requestAnimationFrame(() => {
        openingFrame = 0;
        if (dialog!.open && !closing) panel!.classList.add('is-open');
      });
    }
    return true;
  }

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target instanceof Element
      ? event.target.closest<HTMLAnchorElement>('a[data-email-trigger]')
      : null;
    if (!anchor || anchor.protocol !== 'mailto:') return;
    if (open(anchor, event.detail === 0)) event.preventDefault();
  }, { signal });

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close(true);
  }, { signal });

  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || !dialog.open) return;
    const focusable = [...dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])')];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }, { signal });

  dialog.addEventListener('close', () => {
    // An earlier close event can arrive after a fresh opening.
    if (!dialog.open) reset(!disposed);
  }, { signal });

  dialog.addEventListener('pointerdown', (event) => {
    backdropStarted = event.button === 0 && event.target === dialog;
  }, { signal });
  dialog.addEventListener('pointercancel', () => { backdropStarted = false; }, { signal });

  dialog.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('[data-email-close]') || target?.closest('[data-email-provider]')) {
      close(event.detail === 0);
    } else if (event.target === dialog && backdropStarted && event.detail > 0) {
      close(false);
    }
    backdropStarted = false;
  }, { signal });

  copy.addEventListener('click', async () => {
    if (!dialog.open || closing || copy.disabled) return;
    const generation = ++copyGeneration;
    const isCurrent = () => !disposed && dialog.open && !closing && generation === copyGeneration;
    copy.disabled = true;
    status.textContent = dialog.dataset.copyPending ?? 'Copiando e-mail…';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      if (isCurrent()) status.textContent = dialog.dataset.copySuccess ?? 'E-mail copiado!';
    } catch {
      if (isCurrent()) {
        address.focus({ preventScroll: true });
        address.select();
        status.textContent = dialog.dataset.copyError ?? 'Não foi possível copiar automaticamente. Copie o endereço selecionado manualmente.';
      }
    } finally {
      if (isCurrent()) copy.disabled = false;
    }
  }, { signal });

  cleanupEmailDialog = () => {
    disposed = true;
    listeners.abort();
    if (dialog.open) dialog.close();
    reset(false);
  };
}

document.addEventListener('astro:page-load', initEmailDialog);
document.addEventListener('astro:before-swap', disposeEmailDialog);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEmailDialog, { once: true });
} else {
  initEmailDialog();
}
