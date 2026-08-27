# Yulio Zaki — Portfolio

Single-page developer portfolio built with Angular 21 (standalone components, signals, SSR
with prerendering). No CSS framework — the styling is a hand-written design-token system.

## Commands

```bash
npm install
ng serve      # dev server on http://localhost:4200/
ng build      # production build + prerender into dist/
ng test       # unit tests (Vitest)
npm run serve:ssr:frontend   # run the built SSR server
```

## Structure

```
src/app/
  core/
    data/portfolio.data.ts       all page content, typed
    models/portfolio.models.ts   domain types
    services/
      portfolio.service.ts       read model + project filter state
      scroll.service.ts          scroll-spy, reading progress, smooth scroll
      theme.service.ts           dark/light, persisted, SSR-safe
  shared/
    components/icon/             inline SVG icon set (no icon dependency)
    directives/
      reveal.directive.ts        fade/lift into view on scroll
      count-up.directive.ts      animated stat counters
  components/navbar, footer
  pages/home, about, skills, experience, projects, contact
```

Content lives in `core/data/portfolio.data.ts` — edit that file to update the site;
templates render it and don't hardcode copy.

## Conventions worth knowing

- **Everything is signal-based.** Components are `OnPush`; state is signals and `computed`.
- **SSR safety.** Anything touching `window`/`document` is behind `isPlatformBrowser` or
  `afterNextRender`, and feature-detects (`IntersectionObserver`, `scrollIntoView`) so the
  page degrades to its finished state rather than breaking.
- **Design tokens.** All colour, spacing, radius, and motion values are custom properties in
  `src/styles.css`. Both themes are defined there; component CSS should reference tokens
  rather than literal colours, since a hue that reads well on near-black is unreadable on
  white.
- **Mobile first.** Layouts use `auto-grid`/`clamp()` and add breakpoints only where needed.
  Controls are ≥2.75rem, inputs are ≥16px (so iOS doesn't zoom), and safe-area insets are
  respected. `overflow-x: clip` sits on `html` — on `body` alone it does not propagate to
  the viewport.
- **Scroll position is measured, not observed.** `ScrollService` computes the active section
  from geometry on scroll; a percentage `rootMargin` IntersectionObserver created before
  layout settles gets a degenerate band and never recovers.

## Accessibility

Skip link, focus-visible rings, `aria-current` on the active nav item, labelled form fields
with `aria-invalid` and described errors, `role="meter"` on proficiency bars, and full
`prefers-reduced-motion` support (animations and smooth scrolling are dropped).
