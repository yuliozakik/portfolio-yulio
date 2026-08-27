import { TestBed } from '@angular/core/testing';
import { PortfolioService } from './portfolio.service';

describe('PortfolioService', () => {
  let service: PortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioService);
  });

  it('starts unfiltered', () => {
    expect(service.activeFilter()).toBe('all');
    expect(service.visibleProjects().length).toBeGreaterThan(0);
  });

  it('narrows visible projects to the selected category', () => {
    service.setFilter('web-mobile');

    expect(service.visibleProjects().length).toBeGreaterThan(0);
    expect(service.visibleProjects().every((p) => p.category === 'web-mobile')).toBe(true);
  });

  it('restores the full list when the filter is cleared', () => {
    const total = service.visibleProjects().length;

    service.setFilter('web');
    service.setFilter('all');

    expect(service.visibleProjects().length).toBe(total);
  });

  it('marks the HC Eazy products as shipping on web and Android', () => {
    const hcEazy = service
      .visibleProjects()
      .filter((project) => project.title.includes('HC Eazy'));

    expect(hcEazy.length).toBe(3);
    for (const project of hcEazy) {
      expect(project.category).toBe('web-mobile');
      expect(project.platforms).toContain('Web');
      expect(project.platforms).toContain('Android (APK)');
    }
  });

  it('gives every project at least one platform', () => {
    for (const project of service.visibleProjects()) {
      expect(project.platforms.length).toBeGreaterThan(0);
    }
  });

  it('reports a count per filter that matches the filtered results', () => {
    for (const filter of service.projectFilters()) {
      service.setFilter(filter.key);
      expect(service.visibleProjects().length).toBe(filter.count);
    }
  });

  it('derives a de-duplicated, sorted technology list', () => {
    const cloud = service.techCloud();

    expect(new Set(cloud).size).toBe(cloud.length);
    expect([...cloud]).toEqual([...cloud].sort((a, b) => a.localeCompare(b)));
  });
});
