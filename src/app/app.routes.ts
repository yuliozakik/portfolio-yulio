import { Routes } from '@angular/router';

/**
 * The portfolio is a single scrolling page — navigation happens by scrolling to
 * section anchors, not by routing, so there is no `<router-outlet>` and no
 * routed component. These entries exist so the router (and the SSR route
 * matcher in `app.routes.server.ts`) resolves cleanly, and so old section URLs
 * such as `/skills` land on the page instead of erroring.
 */
export const routes: Routes = [
  {
    path: '',
    title: 'Yulio Zaki Kurniawan — Software Engineer',
    children: [],
  },
  { path: '**', redirectTo: '' },
];
