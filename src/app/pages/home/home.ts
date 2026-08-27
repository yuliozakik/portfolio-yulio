import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { ScrollService } from '../../core/services/scroll.service';
import { CountUpDirective } from '../../shared/directives/count-up.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-home',
  imports: [Icon, RevealDirective, CountUpDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnDestroy {
  private readonly portfolio = inject(PortfolioService);
  private readonly scrollService = inject(ScrollService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly profile = this.portfolio.profile;
  protected readonly stats = this.portfolio.stats;
  protected readonly socialLinks = this.portfolio.socialLinks;
  protected readonly techCloud = this.portfolio.techCloud;

  /** Derived from the stats so the portrait chip can never drift from them. */
  protected readonly experienceLabel = computed(() => {
    const years = this.stats.find((stat) => stat.label === 'Years experience');
    return years ? `${years.value}${years.suffix} yrs experience` : this.profile.role;
  });

  private readonly roleIndex = signal(0);
  /** The role currently shown by the rotating headline. */
  protected readonly currentRole = computed(
    () => this.profile.roleRotation[this.roleIndex() % this.profile.roleRotation.length],
  );

  private timer?: ReturnType<typeof setInterval>;

  constructor() {
    afterNextRender(() => {
      if (!this.isBrowser) {
        return;
      }

      this.timer = setInterval(() => this.roleIndex.update((i) => i + 1), 2600);
    });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  protected go(id: string): void {
    this.scrollService.scrollTo(id);
  }
}
