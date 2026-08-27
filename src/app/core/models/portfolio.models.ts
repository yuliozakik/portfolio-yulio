/** Domain models describing every piece of content rendered by the portfolio. */

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  /** Rotated one at a time under the hero title. */
  roleRotation: string[];
  tagline: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  avatar: string;
  photo: string;
  available: boolean;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface SocialLink {
  label: string;
  href: string;
  /** Key into the icon registry in `IconComponent`. */
  icon: string;
}

export interface Skill {
  name: string;
  /** 0–100, drives the proficiency meter width. */
  level: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  client?: string;
  period: string;
  start: string;
  end: string | null;
  current: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  period: string;
  summary: string;
  highlights: string[];
  tech: string[];
  /** Where the product actually ships, e.g. `['Web', 'Android (APK)']`. */
  platforms: string[];
  /** Grouping used by the project filter chips. */
  category: ProjectCategory;
  featured: boolean;
}

/**
 * `web-mobile` covers the HC Eazy products: one Angular/Ionic codebase served
 * as a web app and packaged as an APK distributed manually to staff.
 */
export type ProjectCategory = 'web' | 'web-mobile';

export interface EducationItem {
  institution: string;
  qualification: string;
  period: string;
  detail: string;
}

export interface Course {
  title: string;
  /** Technology family the course belongs to, e.g. `Java` or `Cisco`. */
  track: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}
