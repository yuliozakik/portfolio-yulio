import { DOCUMENT } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'portfolio-theme';

/**
 * Owns the active colour scheme. Renders dark on the server so the SSR output
 * matches the default, then reconciles with the stored/system preference once
 * the browser takes over.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly current = signal<Theme>('dark');
  readonly theme = this.current.asReadonly();

  constructor() {
    if (this.isBrowser) {
      this.current.set(this.readPreference());
    }

    effect(() => {
      const theme = this.current();
      if (!this.isBrowser) {
        return;
      }

      const root = this.document.documentElement;
      root.setAttribute('data-theme', theme);
      root.style.colorScheme = theme;

      try {
        this.document.defaultView?.localStorage?.setItem(STORAGE_KEY, theme);
      } catch {
        // Storage can be unavailable (private mode, blocked cookies) — the
        // theme still applies for this page view.
      }
    });
  }

  toggle(): void {
    this.current.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }

  set(theme: Theme): void {
    this.current.set(theme);
  }

  private readPreference(): Theme {
    try {
      const stored = this.document.defaultView?.localStorage?.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    } catch {
      // Ignore and fall through to the system preference.
    }

    const prefersLight = this.document.defaultView?.matchMedia?.(
      '(prefers-color-scheme: light)',
    )?.matches;

    return prefersLight ? 'light' : 'dark';
  }
}
