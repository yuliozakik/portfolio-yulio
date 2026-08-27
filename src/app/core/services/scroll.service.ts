import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

/**
 * Tracks which section is in view and how far the page has scrolled, and owns
 * the smooth-scroll helper used by the nav. All DOM access is guarded so the
 * service is inert during server rendering.
 */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly active = signal<string>('top');
  private readonly progressValue = signal<number>(0);
  private readonly scrolledValue = signal<boolean>(false);

  /** Id of the section currently occupying the viewport. */
  readonly activeSection = this.active.asReadonly();
  /** 0–100 reading progress, drives the header progress bar. */
  readonly progress = this.progressValue.asReadonly();
  /** True once the page has scrolled past the hero threshold. */
  readonly scrolled = this.scrolledValue.asReadonly();

  private sectionIds: string[] = [];
  private frame?: number;
  private listening = false;

  /**
   * Starts tracking the given sections.
   *
   * Position is measured from geometry on each scroll rather than with an
   * IntersectionObserver: a percentage `rootMargin` is resolved against the
   * root size at construction time, so an observer created before layout
   * settles gets a degenerate band, reports nothing as intersecting, and never
   * recovers. Measuring on scroll is immune to that and to later content
   * height changes (filtering projects, expanding a role).
   */
  observe(sectionIds: string[]): void {
    if (!this.isBrowser) {
      return;
    }

    this.sectionIds = sectionIds;

    if (!this.listening) {
      const view = this.document.defaultView;
      view?.addEventListener('scroll', this.onScroll, { passive: true });
      view?.addEventListener('resize', this.onScroll, { passive: true });
      this.listening = true;
    }

    this.measure();
  }

  disconnect(): void {
    const view = this.document.defaultView;
    view?.removeEventListener('scroll', this.onScroll);
    view?.removeEventListener('resize', this.onScroll);
    this.listening = false;

    if (this.frame !== undefined) {
      view?.cancelAnimationFrame(this.frame);
      this.frame = undefined;
    }
  }

  scrollTo(id: string): void {
    if (!this.isBrowser) {
      return;
    }

    const target = this.document.getElementById(id);
    if (!target) {
      return;
    }

    const behavior = this.prefersReducedMotion() ? 'auto' : 'smooth';

    // Moving the viewport is the optional part: if the environment has no
    // scroll implementation, focus and the active highlight must still update.
    if (typeof target.scrollIntoView === 'function') {
      target.scrollIntoView({ behavior, block: 'start' });
    }

    // Move focus for keyboard and screen-reader users without disturbing the
    // scroll that just happened.
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    this.active.set(id);
  }

  scrollToTop(): void {
    const view = this.document.defaultView;
    if (!this.isBrowser || !view) {
      return;
    }

    if (typeof view.scrollTo === 'function') {
      view.scrollTo({ top: 0, behavior: this.prefersReducedMotion() ? 'auto' : 'smooth' });
    }

    this.active.set(this.sectionIds[0] ?? 'top');
  }

  /** Coalesces bursts of scroll events into one measurement per frame. */
  private readonly onScroll = (): void => {
    const view = this.document.defaultView;
    if (!view || this.frame !== undefined) {
      return;
    }

    this.frame = view.requestAnimationFrame(() => {
      this.frame = undefined;
      this.measure();
    });
  };

  private measure(): void {
    const view = this.document.defaultView;
    if (!view) {
      return;
    }

    const scrollTop = view.scrollY;
    const viewportH = view.innerHeight;
    const scrollable = this.document.documentElement.scrollHeight - viewportH;

    this.progressValue.set(scrollable > 0 ? Math.min(100, (scrollTop / scrollable) * 100) : 0);
    this.scrolledValue.set(scrollTop > 24);

    if (!this.sectionIds.length) {
      return;
    }

    // The section that owns the reading line — a third of the way down the
    // viewport — is the one considered active.
    const anchor = scrollTop + viewportH * 0.34;
    let current: string | undefined;

    for (const id of this.sectionIds) {
      const element = this.document.getElementById(id);
      if (!element) {
        continue;
      }

      // The first section present is the fallback, so a page scrolled above
      // every section start still highlights something.
      current ??= id;

      const top = element.getBoundingClientRect().top + scrollTop;
      if (top <= anchor) {
        current = id;
      }
    }

    // Nothing to highlight if none of the sections are on the page.
    if (!current) {
      return;
    }

    // At the very bottom the last section is the one being read, even if its
    // start never crosses the reading line on a short final section.
    if (scrollable > 0 && scrollTop >= scrollable - 2) {
      current = this.sectionIds[this.sectionIds.length - 1];
    }

    this.active.set(current);
  }

  private prefersReducedMotion(): boolean {
    return (
      this.document.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    );
  }
}
