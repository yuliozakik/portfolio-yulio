import { Injectable, computed, signal } from '@angular/core';
import {
  COURSES,
  EDUCATION,
  EXPERIENCES,
  NAV_ITEMS,
  PROFILE,
  PROJECTS,
  SKILL_CATEGORIES,
  SOCIAL_LINKS,
  STATS,
} from '../data/portfolio.data';
import type { Project, ProjectCategory } from '../models/portfolio.models';

type ProjectFilter = ProjectCategory | 'all';

/** Single read model for the whole portfolio, plus the project filter state. */
@Injectable({ providedIn: 'root' })
export class PortfolioService {
  readonly profile = PROFILE;
  readonly navItems = NAV_ITEMS;
  readonly stats = STATS;
  readonly socialLinks = SOCIAL_LINKS;
  readonly skillCategories = SKILL_CATEGORIES;
  readonly experiences = EXPERIENCES;
  readonly education = EDUCATION;
  readonly courses = COURSES;

  private readonly allProjects = signal<Project[]>(PROJECTS);
  private readonly filter = signal<ProjectFilter>('all');

  readonly activeFilter = this.filter.asReadonly();

  /** Filter chips, each carrying its own result count. */
  readonly projectFilters = computed(() => {
    const projects = this.allProjects();
    const counts = new Map<ProjectFilter, number>([['all', projects.length]]);

    for (const project of projects) {
      counts.set(project.category, (counts.get(project.category) ?? 0) + 1);
    }

    const labels: Record<ProjectFilter, string> = {
      all: 'All work',
      web: 'Web app',
      'web-mobile': 'Web & mobile app',
    };

    return (['all', 'web', 'web-mobile'] as ProjectFilter[])
      .filter((key) => counts.has(key))
      .map((key) => ({ key, label: labels[key], count: counts.get(key) ?? 0 }));
  });

  readonly visibleProjects = computed(() => {
    const filter = this.filter();
    const projects = this.allProjects();
    return filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  });

  /** Every distinct technology across all projects, alphabetised. */
  readonly techCloud = computed(() =>
    [...new Set(this.allProjects().flatMap((p) => p.tech))].sort((a, b) => a.localeCompare(b)),
  );

  setFilter(filter: ProjectFilter): void {
    this.filter.set(filter);
  }
}
