import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Icon } from '../../shared/components/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [Icon, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills.html',
  styleUrls: ['./skills.css'],
})
export class Skills {
  private readonly portfolio = inject(PortfolioService);

  protected readonly categories = this.portfolio.skillCategories;

  protected readonly totalSkills = computed(() =>
    this.categories.reduce((sum, category) => sum + category.skills.length, 0),
  );
}
