import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Inline SVG icon set. Kept local so the portfolio ships no icon-font or
 * icon-library dependency, and every glyph inherits `currentColor`.
 *
 * Each entry is the inner path data for a 24x24 stroked icon.
 */
const ICON_PATHS: Record<string, string> = {
  home: 'M3 10.2 12 3l9 7.2V20a1 1 0 0 1-1 1h-5v-6H10v6H4a1 1 0 0 1-1-1z',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
  sparkles:
    'M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z M19 15l.9 2.1 2.1.9-2.1.9L19 21l-.9-2.1-2.1-.9 2.1-.9L19 15z',
  briefcase:
    'M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M3 13h18',
  layers: 'M12 3 3 8l9 5 9-5-9-5z M3 13l9 5 9-5 M3 17.5l9 5 9-5',
  mail: 'M3 6h18v12H3z M3 7l9 6 9-6',
  phone:
    'M21 16.9v2.6a1.7 1.7 0 0 1-1.9 1.7 16.8 16.8 0 0 1-7.3-2.6 16.5 16.5 0 0 1-5.1-5.1A16.8 16.8 0 0 1 4.1 6.2 1.7 1.7 0 0 1 5.8 4.3h2.6a1.7 1.7 0 0 1 1.7 1.5c.1.9.3 1.7.6 2.5a1.7 1.7 0 0 1-.4 1.8l-1.1 1.1a13.6 13.6 0 0 0 5.1 5.1l1.1-1.1a1.7 1.7 0 0 1 1.8-.4c.8.3 1.6.5 2.5.6a1.7 1.7 0 0 1 1.5 1.7z',
  'map-pin': 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  linkedin:
    'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M6 9H2v12h4z M4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
  github:
    'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3.1-.3 6-1.5 6-6.6a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.4-.4-4.5 1.7a12.3 12.3 0 0 0-6.6 0C5.3 1.3 3.9 1.7 3.9 1.7a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 2.4 9c0 5 2.9 6.3 6 6.6a3.4 3.4 0 0 0-1 2.6V22',
  code: 'M16 18l6-6-6-6 M8 6l-6 6 6 6',
  layout: 'M3 4h18v16H3z M3 10h18 M10 10v10',
  server:
    'M3 4h18v6H3z M3 14h18v6H3z M7 7h.01 M7 17h.01',
  database:
    'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  wrench:
    'M14.7 6.3a4 4 0 1 0 5 5L21 12l-9 9-3-3 9-9z M6 12l-3 3 3 3 3-3',
  network:
    'M12 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6z M5 15a3 3 0 1 1 0 6 3 3 0 0 1 0-6z M19 15a3 3 0 1 1 0 6 3 3 0 0 1 0-6z M12 9v3 M12 12H5v3 M12 12h7v3',
  sun: 'M12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10z M12 1v2 M12 21v2 M4.2 4.2l1.4 1.4 M18.4 18.4l1.4 1.4 M1 12h2 M21 12h2 M4.2 19.8l1.4-1.4 M18.4 5.6l1.4-1.4',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  menu: 'M4 7h16 M4 12h16 M4 17h16',
  close: 'M6 6l12 12 M18 6 6 18',
  'arrow-up': 'M12 19V5 M5 12l7-7 7 7',
  'arrow-right': 'M5 12h14 M12 5l7 7-7 7',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
  check: 'M20 6 9 17l-5-5',
  send: 'M22 2 11 13 M22 2l-7 20-4-9-9-4z',
  calendar: 'M3 5h18v16H3z M3 10h18 M8 3v4 M16 3v4',
  star: 'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5L2.5 9.4l6.6-.9z',
};

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="icon"
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (segment of segments(); track $index) {
        <path [attr.d]="segment"></path>
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
    }

    .icon {
      display: block;
    }
  `,
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input<number>(20);
  readonly strokeWidth = input<number>(1.7);

  /**
   * Icon data is authored as space-separated `M…` subpaths so each can render
   * as its own `<path>` — that keeps stroke joins clean between subpaths.
   */
  protected readonly segments = computed(() => {
    const path = ICON_PATHS[this.name()];
    if (!path) {
      return [];
    }

    return path
      .split(/\s+(?=M)/)
      .map((segment) => segment.trim())
      .filter(Boolean);
  });
}
