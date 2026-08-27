import type {
  Course,
  EducationItem,
  Experience,
  NavItem,
  Profile,
  Project,
  SkillCategory,
  SocialLink,
  Stat,
} from '../models/portfolio.models';

export const PROFILE: Profile = {
  name: 'Yulio Zaki Kurniawan',
  shortName: 'Yulio Zaki',
  role: 'Software Engineer',
  roleRotation: [
    'Software Engineer',
    'Angular Specialist',
    'Full-Stack Developer',
    'HRIS Specialist',
  ],
  tagline: 'I build accessible, polished web and mobile applications.',
  summary:
    'Software Engineer with 4+ years of experience delivering web and mobile products for financial services and HR. I turn business requirements into maintainable technical solutions, resolve production issues under pressure, and collaborate closely with analysts and IT leadership.',
  location: 'Jakarta, Indonesia',
  email: 'yuliozaki16@gmail.com',
  phone: '+62 812-8963-3835',
  avatar: 'assets/images/profile.jpeg',
  photo: 'assets/images/photo.jpeg',
  available: true,
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'top', label: 'Home', icon: 'home' },
  { id: 'about', label: 'About', icon: 'user' },
  { id: 'skills', label: 'Skills', icon: 'sparkles' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'projects', label: 'Projects', icon: 'layers' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
];

export const STATS: Stat[] = [
  { label: 'Years experience', value: 4, suffix: '+' },
  { label: 'Projects shipped', value: 5, suffix: '' },
  { label: 'Companies', value: 3, suffix: '' },
  { label: 'Core stacks', value: 5, suffix: '' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Email', href: 'mailto:yuliozaki16@gmail.com', icon: 'mail' },
  { label: 'Phone', href: 'tel:+6281289633835', icon: 'phone' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yulio-zaki', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/yuliozakik', icon: 'github' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    icon: 'code',
    blurb: 'The languages I reach for day to day.',
    skills: [
      { name: 'TypeScript', level: 82 },
      { name: 'JavaScript', level: 85 },
      { name: 'Java', level: 78 },
      { name: 'SQL', level: 77 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'layout',
    blurb: 'Where most of my work lives — component architecture and UI polish.',
    skills: [
      { name: 'Angular', level: 88 },
      { name: 'AngularJS', level: 82 },
      { name: 'Ionic', level: 90 },
      { name: 'React / Next.js', level: 70 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'server',
    blurb: 'REST services and business logic behind the screens I build.',
    skills: [
      { name: 'Java Spring Boot', level: 88 },
      { name: 'Node.js', level: 80 },
      { name: 'LoopBack 3', level: 75 },
      { name: 'Express.js', level: 78 },
    ],
  },
  {
    id: 'data',
    title: 'Database',
    icon: 'database',
    blurb: 'Schema design, queries, and production data fixes.',
    skills: [
      { name: 'MySQL', level: 88 },
      { name: 'Microsoft SQL Server', level: 72 },
      { name: 'Query optimisation', level: 70 },
    ],
  },
  {
    id: 'platform',
    title: 'Platform & Tools',
    icon: 'wrench',
    blurb: 'The supporting cast around shipping and operating software.',
    skills: [
      { name: 'REST API design', level: 86 },
      { name: 'Salesforce Apex', level: 68 },
      { name: 'Git & code review', level: 85 },
      { name: 'Log monitoring', level: 80 },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'avows',
    role: 'Software Engineer',
    company: 'PT Avows Technologies Indonesia',
    client: 'IT Non-Core Developer at Bank Syariah Nasional',
    period: 'January 2026 – Present',
    start: 'Jan 2026',
    end: null,
    current: true,
    summary:
      'Building the Finance Originating System for a national Islamic bank, translating business requirement documents into production menus.',
    highlights: [
      'Developed the Finance Originating System using AngularJS, Node.js, LoopBack 3, HTML, and CSS.',
      'Read and interpreted Business Requirement Documents to turn them into user-friendly features and menus.',
      'Worked closely with the IT Non-Core Developer leader and business partners to discuss new features and fix existing programs.',
    ],
    stack: ['AngularJS', 'Node.js', 'LoopBack 3', 'HTML', 'CSS'],
  },
  {
    id: 'mtf',
    role: 'HC Information & System Staff — Head Office',
    company: 'PT Mandiri Tunas Finance',
    period: 'July 2023 – January 2026',
    start: 'Jul 2023',
    end: 'Jan 2026',
    current: false,
    summary:
      'Owned HRMS web and mobile features for an internal platform used company-wide, from build through production support and data integrity.',
    highlights: [
      'Developed a web-based career portal using Next.js and Node.js, including feature development and bug fixing.',
      'Built and maintained HRMS mobile and web apps using Angular, Ionic 6, and Java Spring Boot, adding new features and fixing bugs.',
      'Resolved production bugs in internal and employee-facing apps, performed data corrections in Salesforce, and built small features using Apex.',
      'Coordinated with Business Analysts and end users to gather and clarify requirements for web and app development.',
      'Analysed production bugs related to sync issues between the internal HRIS app and the data centre (Salesforce).',
      'Assisted the supervisor in monitoring AWS servers and checking application logs when errors occurred.',
      'Helped with internal app and web deployments by testing all features and menus thoroughly to ensure no bugs remained before final release.',
      'Processed data reports as needed for managers.',
      'Checked database records when data errors or duplicates occurred, and wrote SQL queries for the supervisor to run.',
    ],
    stack: ['Angular', 'Ionic 6', 'Java Spring Boot', 'Next.js', 'Salesforce Apex', 'AWS'],
  },
  {
    id: 'wide',
    role: 'Junior Front End Software Engineer',
    company: 'PT Wide Technologies Indonesia',
    period: 'April 2022 – June 2023',
    start: 'Apr 2022',
    end: 'Jun 2023',
    current: false,
    summary:
      'First engineering role, delivering web banking applications and sharpening my eye for responsive UI.',
    highlights: [
      'Developed web banking applications using AngularJS, HTML, and CSS.',
      'Handled bug fixing, added new features, and improved mobile responsiveness using Bootstrap.',
      'Joined meetings with Business Analysts to discuss Functional Specification Documents for new features and menu updates.',
      'Read and interpreted FSDs to turn them into user-friendly features and menus.',
      'Worked closely with Backend Developers to determine which APIs and data the UI needed.',
      'Stayed available during deployments to handle any new bugs or issues as they came up.',
    ],
    stack: ['AngularJS', 'HTML', 'CSS', 'Bootstrap'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'job-portal-p3',
    title: 'Enhancement Job Portal Phase 3',
    client: 'PT Mandiri Tunas Finance',
    period: 'Jul 2023 – Oct 2023',
    summary:
      'Recruitment analytics and screening tooling layered onto the existing candidate job portal.',
    highlights: [
      'Enhanced the dashboard with candidate analytics, including gender distribution and university trends using bar charts.',
      'Implemented ranking logic to display the top 10 universities by number of applicants.',
      'Integrated candidate distribution by domicile using Tableau dashboards via iframe embedding.',
      'Developed an advanced search filter with multiple parameters: candidate name, job title, job level, job specialisation, university name, GPA range slider, and application date range.',
      'Added "Qualified" and "Unqualified" actions to streamline candidate screening for administrators.',
    ],
    tech: ['TypeScript', 'Next.js', 'Express.js', 'Bulma CSS'],
    platforms: ['Web'],
    category: 'web',
    featured: true,
  },
  {
    id: 'employee-agreement',
    title: 'Employee Agreement — HC Eazy (Internal HRMS)',
    client: 'PT Mandiri Tunas Finance',
    period: 'Dec 2023 – Feb 2024',
    summary:
      'Digital agreement approvals inside the internal HRMS, replacing a paper-based signing flow. Shipped as a web app and packaged as an Android APK distributed manually to staff.',
    highlights: [
      'Developed a digital document approval feature for both the user and admin modules.',
      'Implemented automatic redirection so users review and approve required documents on login.',
      'Designed admin configuration for document templates, supporting both PDF uploads and HTML-based templates.',
      'Enabled dynamic PDF generation from HTML templates for user download and approval.',
    ],
    tech: ['JavaScript', 'AngularJS', 'Ionic', 'Java Spring Boot'],
    platforms: ['Web', 'Android (APK)'],
    category: 'web-mobile',
    featured: true,
  },
  {
    id: 'sk-digital',
    title: 'SK Digital — HC Eazy (Internal HRMS)',
    client: 'PT Mandiri Tunas Finance',
    period: 'Mar 2024 – Jun 2024',
    summary:
      'End-to-end digital decree lifecycle with legally binding e-signatures. Shipped as a web app and packaged as an Android APK distributed manually to staff.',
    highlights: [
      'Developed a digital decree system with an end-to-end document lifecycle, including approval, generation, and legal validation.',
      'Implemented dynamic PDF generation from HTML templates based on transaction and employee data.',
      'Integrated an external API (PrivyID) for legally binding e-signatures and digital stamps.',
      'Built automated document generation using scheduled cron jobs (H-1 transaction processing).',
      'Implemented template-matching logic based on transaction type, employee level, and status.',
      'Managed document storage and retrieval, letting users download signed documents via API.',
    ],
    tech: ['JavaScript', 'AngularJS', 'Ionic', 'Java Spring Boot', 'PrivyID API'],
    platforms: ['Web', 'Android (APK)'],
    category: 'web-mobile',
    featured: true,
  },
  {
    id: 'enhancement-pa',
    title: 'Enhancement Performance Appraisal — HC Eazy (Internal HRMS)',
    client: 'PT Mandiri Tunas Finance',
    period: 'May 2025 – Aug 2025',
    summary:
      'Quota-based performance appraisal engine producing KPI-ready evaluation outputs at company scale. Shipped as a web app and packaged as an Android APK distributed manually to staff.',
    highlights: [
      'Developed quota-based performance appraisal features, including Manager Evaluation, Participant Evaluation, and Balancing processes.',
      'Implemented backend batch processing to generate quotas dynamically from configurable parameters.',
      'Designed admin configuration for quota settings: process type, department, division, rating models, and exception handling.',
      'Built cron job automation for quota generation, including error logging and downloadable .xls reports.',
      'Implemented validation and sequencing logic for rating distribution based on predefined quota rules.',
      'Ensured final evaluation results contribute to KPI scoring for employee performance assessment.',
    ],
    tech: ['TypeScript', 'Angular', 'Ionic', 'Java Spring Boot'],
    platforms: ['Web', 'Android (APK)'],
    category: 'web-mobile',
    featured: true,
  },
  {
    id: 'fos',
    title: 'Finance Originating System',
    client: 'Bank Syariah Nasional',
    period: 'Jan 2026 – Present',
    summary:
      'Financing origination platform covering application intake, review, and approval for a national Islamic bank.',
    highlights: [
      'Developing the origination system using AngularJS, Node.js, LoopBack 3, HTML, and CSS.',
      'Reading and interpreting BRDs to turn them into user-friendly features and menus.',
      'Working closely with the IT Non-Core Developer leader and business partners on new features and fixes to existing programs.',
    ],
    tech: ['AngularJS', 'Node.js', 'LoopBack 3', 'HTML', 'CSS'],
    platforms: ['Web'],
    category: 'web',
    featured: true,
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: 'Gunadarma University',
    qualification: "Bachelor's degree, Informatics Engineering",
    period: '2017 – 2021',
    detail: 'Graduated with a GPA of 3.60 / 4.00.',
  },
  {
    institution: 'LePKom Universitas Gunadarma',
    qualification: 'Professional certification courses',
    period: '2017 – 2021',
    detail: 'Seven certified courses across Java development and Cisco networking.',
  },
];

export const COURSES: Course[] = [
  { title: 'Java (J2SE) for Beginner', track: 'Java' },
  { title: 'Java (J2SE) for Intermediate', track: 'Java' },
  { title: 'Fundamental Desktop Programming', track: 'Java' },
  { title: 'Fundamental Networking', track: 'Cisco' },
  { title: 'Local Area Network using Cisco Router', track: 'Cisco' },
  { title: 'Wide Area Network using Cisco Router for Intermediate', track: 'Cisco' },
  { title: 'Cisco Project', track: 'Cisco' },
];
