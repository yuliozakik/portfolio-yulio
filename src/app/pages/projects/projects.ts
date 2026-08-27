import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import type { ProjectCategory } from '../../core/models/portfolio.models';
import { Icon } from '../../shared/components/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [Icon, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class Projects {
  private readonly portfolio = inject(PortfolioService);

  protected readonly filters = this.portfolio.projectFilters;
  protected readonly projects = this.portfolio.visibleProjects;
  protected readonly activeFilter = this.portfolio.activeFilter;

  protected setFilter(key: ProjectCategory | 'all'): void {
    this.portfolio.setFilter(key);
  }

  /** Positions the spotlight gradient under the pointer. */
  protected trackPointer(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
