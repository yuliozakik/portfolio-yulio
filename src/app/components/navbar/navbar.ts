import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { ScrollService } from '../../core/services/scroll.service';
import { ThemeService } from '../../core/services/theme.service';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-navbar',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  private readonly portfolio = inject(PortfolioService);
  private readonly scrollService = inject(ScrollService);
  private readonly themeService = inject(ThemeService);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly navItems = this.portfolio.navItems;
  protected readonly profile = this.portfolio.profile;
  protected readonly activeSection = this.scrollService.activeSection;
  protected readonly progress = this.scrollService.progress;
  protected readonly scrolled = this.scrollService.scrolled;
  protected readonly theme = this.themeService.theme;

  protected readonly menuOpen = signal(false);
  protected readonly progressRounded = computed(() => Math.round(this.progress()));
  protected readonly themeLabel = computed(() =>
    this.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
  );

  constructor() {
    // Lock body scroll while the mobile drawer is open so the page behind it
    // does not scroll under the visitor's finger.
    effect(() => {
      const open = this.menuOpen();
      if (this.isBrowser) {
        this.document.body.classList.toggle('no-scroll', open);
      }
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleTheme(): void {
    this.themeService.toggle();
  }

  protected go(id: string): void {
    this.closeMenu();
    this.scrollService.scrollTo(id);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMenu();
  }
}
