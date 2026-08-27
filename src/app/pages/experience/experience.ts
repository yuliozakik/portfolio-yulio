import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Icon } from '../../shared/components/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-experience',
  imports: [Icon, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience.html',
  styleUrls: ['./experience.css'],
})
export class Experience {
  private readonly portfolio = inject(PortfolioService);

  protected readonly experiences = this.portfolio.experiences;

  /** Ids of roles whose highlight list is expanded. Current role starts open. */
  private readonly expanded = signal<Set<string>>(
    new Set(this.portfolio.experiences.filter((e) => e.current).map((e) => e.id)),
  );

  protected isExpanded(id: string): boolean {
    return this.expanded().has(id);
  }

  protected toggle(id: string): void {
    this.expanded.update((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }
}
