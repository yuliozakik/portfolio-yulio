import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { ScrollService } from '../../core/services/scroll.service';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-footer',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {
  private readonly portfolio = inject(PortfolioService);
  private readonly scrollService = inject(ScrollService);

  protected readonly profile = this.portfolio.profile;
  protected readonly navItems = this.portfolio.navItems;
  protected readonly socialLinks = this.portfolio.socialLinks;
  protected readonly year = new Date().getFullYear();

  /** The back-to-top button only earns its space once there is a way back. */
  protected readonly showFab = computed(() => this.scrollService.progress() > 8);

  protected go(id: string): void {
    this.scrollService.scrollTo(id);
  }

  protected toTop(): void {
    this.scrollService.scrollToTop();
  }
}
