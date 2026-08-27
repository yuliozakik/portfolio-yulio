import { ChangeDetectionStrategy, Component, OnDestroy, afterNextRender, inject } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Skills } from './pages/skills/skills';
import { Experience } from './pages/experience/experience';
import { Projects } from './pages/projects/projects';
import { Contact } from './pages/contact/contact';
import { PortfolioService } from './core/services/portfolio.service';
import { ScrollService } from './core/services/scroll.service';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, Home, About, Skills, Experience, Projects, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnDestroy {
  private readonly scrollService = inject(ScrollService);
  private readonly portfolio = inject(PortfolioService);

  constructor() {
    // Sections only exist once the view is in the DOM, so wire scroll-spy here
    // rather than in the constructor body.
    afterNextRender(() => {
      this.scrollService.observe(this.portfolio.navItems.map((item) => item.id));
    });
  }

  ngOnDestroy(): void {
    this.scrollService.disconnect();
  }
}
