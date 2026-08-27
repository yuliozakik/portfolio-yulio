import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
} from '@angular/core';

/**
 * Counts from zero up to the target value once the element scrolls into view.
 * Falls back to printing the final value immediately without a browser or when
 * the visitor prefers reduced motion.
 */
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements OnDestroy {
  readonly target = input.required<number>({ alias: 'appCountUp' });
  readonly duration = input<number>(1400);
  readonly suffix = input<string>('');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer?: IntersectionObserver;
  private frame?: number;

  constructor() {
    afterNextRender(() => {
      const element = this.host.nativeElement;

      // Without an observer (or with motion suppressed) the final figure is
      // what matters — print it and skip the animation entirely.
      if (
        !this.isBrowser ||
        typeof IntersectionObserver === 'undefined' ||
        this.prefersReducedMotion()
      ) {
        this.render(this.target());
        return;
      }

      this.render(0);

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.observer?.disconnect();
              this.animate();
            }
          }
        },
        { threshold: 0.4 },
      );

      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.frame !== undefined) {
      this.host.nativeElement.ownerDocument.defaultView?.cancelAnimationFrame(this.frame);
    }
  }

  private animate(): void {
    const view = this.host.nativeElement.ownerDocument.defaultView;
    if (!view) {
      this.render(this.target());
      return;
    }

    const total = this.target();
    const duration = this.duration();
    const started = view.performance.now();

    const step = (now: number): void => {
      const elapsed = now - started;
      const ratio = Math.min(1, elapsed / duration);
      // easeOutCubic — fast start, gentle landing on the final number.
      const eased = 1 - Math.pow(1 - ratio, 3);

      this.render(Math.round(total * eased));

      if (ratio < 1) {
        this.frame = view.requestAnimationFrame(step);
      }
    };

    this.frame = view.requestAnimationFrame(step);
  }

  private render(value: number): void {
    this.host.nativeElement.textContent = `${value}${this.suffix()}`;
  }

  private prefersReducedMotion(): boolean {
    return (
      this.host.nativeElement.ownerDocument.defaultView?.matchMedia?.(
        '(prefers-reduced-motion: reduce)',
      )?.matches ?? false
    );
  }
}
