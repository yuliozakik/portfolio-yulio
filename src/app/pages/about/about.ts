import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Icon } from '../../shared/components/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [Icon, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About {
  private readonly portfolio = inject(PortfolioService);

  protected readonly profile = this.portfolio.profile;
  protected readonly education = this.portfolio.education;
  protected readonly courses = this.portfolio.courses;

  /** What I bring to a team — rendered as the value cards. */
  protected readonly values = [
    {
      icon: 'code',
      title: 'Requirements to shipped code',
      text: 'I read BRDs and FSDs closely, ask the awkward questions early, and turn them into features that survive review.',
    },
    {
      icon: 'wrench',
      title: 'Calm in production',
      text: 'Four years of live financial and HR systems taught me to triage from logs, correct the data, fix the cause, and communicate while doing it.',
    },
    {
      icon: 'layout',
      title: 'Interfaces that respect people',
      text: 'Responsive, accessible, and fast on the mid-range phones most of my users actually carry.',
    },
  ];
}
