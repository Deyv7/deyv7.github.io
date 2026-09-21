import * as pt from './profile';
import type { Job } from './profile';

export const profile = {
  ...pt.profile,
  headline: 'Data Analyst & Developer',
  roles: ['a Data Analyst', 'a Full-Stack Developer', 'an AI Developer'],
  description:
    'Data analyst and developer. I use SQL, Power BI, and Python to solve real problems and build systems that are live today.',
  workModes: 'remote, hybrid, or on-site in Brasília',
  targetRoles: {
    dados: ['Data Analyst', 'BI Analyst', 'Analytics Engineer', 'Data Engineer'],
    dev: ['Full-Stack Developer', 'Front-End Developer (React and Next.js)', 'Back-End Developer (Node and Python)'],
  },
};

export const nav = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/sobre/', label: 'About', icon: 'user' },
  { href: '/curriculo/', label: 'Resume', icon: 'star' },
  { href: '/projetos/', label: 'Portfolio', icon: 'grid' },
  { href: '/contato/', label: 'Contact', icon: 'mail' },
] as const;

export const highlights = [
  { ...pt.highlights[0], label: 'employee departures analyzed', source: 'NovaCasa case study' },
  { ...pt.highlights[1], label: 'of departures within 90 days', source: 'NovaCasa case study' },
  { ...pt.highlights[2], label: 'less manual work each week', source: 'TRE-DF internship' },
  { ...pt.highlights[3], label: 'staff members using the reports', source: 'TRE-DF internship' },
];

export const experience: Job[] = [
  {
    ...pt.experience[0],
    period: 'Aug 2026 — present',
    title: 'Co-Founder and Developer',
    place: 'remote',
    points: [
      'Co-founded the studio and built its website from scratch: visual identity, copy, and code using Next.js 16, TypeScript, and Tailwind',
      'Launched the landing page in Portuguese and English, with light and dark themes and contrast adjusted to meet WCAG AA',
      'Set up the infrastructure: Vercel deployment, custom DNS and email, and a wildcard subdomain with a certificate for individual client previews',
    ],
  },
  {
    ...pt.experience[1],
    period: '2024 — present',
    title: 'Founder and Developer (Data and Product)',
    place: 'remote',
    points: [
      'Designed the PostgreSQL database (12+ tables) and the API integrations that power the platform',
      'Implemented MercadoPago payments, GPS tracking for driving lessons, and facial verification with TensorFlow.js',
    ],
  },
  {
    ...pt.experience[2],
    period: 'Feb 2024 — Sep 2025',
    title: 'IT, Support, and Development Intern',
    place: 'Brasília, on-site',
    points: [
      'Automated 3+ data collection, organization, and reporting workflows with Python, reducing the team’s weekly manual work by about 30%',
      'Built recurring reports used by 200+ staff members to support management decisions',
      'Turned requests from managers into analyses, reports, and automations with technical autonomy',
      'Developed and maintained 2+ internal systems used during peak election periods',
    ],
  },
];

export const education = [
  { ...pt.education[0], title: 'Technical Program in Data Science' },
  { ...pt.education[1], title: 'Systems Analysis and Development' },
];

export const certifications = [
  pt.certifications[0],
  pt.certifications[1],
  { ...pt.certifications[2], name: 'Complete Web Development' },
];

export const skills = [
  { group: 'Data & BI', items: ['Power BI', 'DAX', 'Dimensional modeling', 'ETL', 'Advanced Excel', 'Google Sheets', 'Databricks'] },
  { group: 'SQL & databases', items: ['SQL', 'Relational modeling', 'PostgreSQL', 'SQL Server', 'MySQL', 'MongoDB', 'Supabase'] },
  { group: 'Python & analytics', items: ['Python', 'Pandas', 'NumPy', 'Streamlit', 'Exploratory data analysis', 'R'] },
  { group: 'Development', items: ['TypeScript', 'Next.js', 'React Native / Expo', 'Node.js / Express', 'FastAPI', 'REST APIs', 'Git'] },
  { group: 'Applied AI', items: ['Claude', 'ChatGPT', 'Gemini', 'Agents with Agno', 'TensorFlow.js', 'OpenCV', 'MediaPipe'] },
];

export const languages = [
  { name: 'Portuguese', level: 'native' },
  { name: 'English', level: 'intermediate, technical reading and meetings' },
];
