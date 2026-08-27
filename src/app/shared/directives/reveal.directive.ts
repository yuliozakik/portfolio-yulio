import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
  input,
  afterNextRender,
} from '@angular/core';

/**
 * Fades and lifts an element into view the first time it enters the viewport.
 *
 * The element is visible by default and only hidden once we know the browser
 * will animate it, so server-rendered content and reduced-motion users always
 * see the finished state.
 */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class RevealDirective implements OnDestroy {
  /** Stagger in milliseconds, for revealing lists one item after another. */
  readonly delay = input<number>(0, { alias: 'appReveal' });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      const element = this.host.nativeElement;

      // No browser, no observer support, or a stated preference against motion:
      // skip straight to the finished state so content is never left hidden.
      if (!this.isBrowser || !this.supportsObserver() || this.prefersReducedMotion()) {
        element.classList.add('reveal--visible');
        return;
      }

      element.style.setProperty('--reveal-delay', `${this.delay()}ms`);
      element.classList.add('reveal--armed');

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              element.classList.add('reveal--visible');
              this.observer?.disconnect();
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );

      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private supportsObserver(): boolean {
    return typeof IntersectionObserver !== 'undefined';
  }

  private prefersReducedMotion(): boolean {
    return (
      this.host.nativeElement.ownerDocument.defaultView?.matchMedia?.(
        '(prefers-reduced-motion: reduce)',
      )?.matches ?? false
    );
  }
}
