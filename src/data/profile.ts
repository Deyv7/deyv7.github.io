// Fonte única dos dados pessoais. Base: CAREER-OPS/cv.md

export const profile = {
  name: 'Deyvid Prado de Jesus',
  displayName: 'Deyvid Prado',
  initials: 'DP',
  headline: 'Analista de Dados & Desenvolvedor',
  roles: ['Analista de Dados', 'Desenvolvedor Full-Stack', 'Desenvolvedor de IA'],
  description:
    'Analista de Dados e desenvolvedor. SQL, Power BI e Python aplicados a problemas reais, e sistemas que estão no ar.',
  workModes: 'remoto, híbrido ou presencial em Brasília',
  email: 'ddpessoall@gmail.com',
  linkedin: 'https://www.linkedin.com/in/deyv',
  github: 'https://github.com/deyv7',
  /** Caminho em /public do CV em PDF (gerado pela sessão CAREER-OPS); null esconde o botão */
  cvUrl: '/cv-deyvid-prado.pdf' as string | null,
  openToWork: true,
  /** Vagas que busca, agrupadas por área */
  targetRoles: {
    dados: ['Analista de Dados', 'Analista de BI', 'Analytics Engineer', 'Engenharia de Dados'],
    dev: ['Desenvolvedor Full-Stack', 'Front-end (React e Next.js)', 'Back-end (Node e Python)'],
  },
};

export const nav = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/sobre/', label: 'Sobre', icon: 'user' },
  { href: '/curriculo/', label: 'Currículo', icon: 'star' },
  { href: '/projetos/', label: 'Portfólio', icon: 'grid' },
  { href: '/contato/', label: 'Contato', icon: 'mail' },
] as const;

export const highlights = [
  { value: '603', label: 'desligamentos analisados', source: 'Case NovaCasa', href: '/projetos/novacasa-people-analytics/' },
  { value: '48%', label: 'das saídas em até 90 dias', source: 'Case NovaCasa', href: '/projetos/novacasa-people-analytics/' },
  { value: '~30%', label: 'menos tempo manual por semana', source: 'Estágio no TRE-DF', href: '/curriculo/' },
  { value: '200+', label: 'servidores usando os relatórios', source: 'Estágio no TRE-DF', href: '/curriculo/' },
];

export interface Job {
  period: string;
  title: string;
  org: string;
  place: string;
  href?: string;
  points: string[];
}

export const experience: Job[] = [
  {
    period: 'ago 2026 — atual',
    title: 'Fundador e Desenvolvedor',
    org: '2 Pulos',
    place: 'remoto',
    href: '/projetos/2pulos/',
    points: [
      'Criei o estúdio e o site institucional do zero: identidade, textos e código em Next.js 16, TypeScript e Tailwind',
      'Publiquei a landing em português e inglês, com tema claro e escuro e o contraste ajustado ao padrão WCAG AA',
      'Montei a infraestrutura: deploy na Vercel, DNS e e-mail próprios, e subdomínio curinga com certificado para enviar uma prévia por cliente',
    ],
  },
  {
    period: '2024 — atual',
    title: 'Co-fundador e Desenvolvedor (Dados e Produto)',
    org: 'E-Habilita',
    place: 'remoto',
    href: '/projetos/e-habilita/',
    points: [
      'Modelei o banco PostgreSQL (12+ tabelas) e as integrações de API que sustentam a plataforma',
      'Implementei pagamentos com MercadoPago, rastreamento GPS das aulas e verificação facial com TensorFlow.js',
    ],
  },
  {
    period: 'fev 2024 — set 2025',
    title: 'Estagiário de TI, Suporte e Desenvolvimento',
    org: 'TRE-DF',
    place: 'Brasília, presencial',
    points: [
      'Automatizei 3+ rotinas de coleta, organização e relatórios com Python, reduzindo ~30% do tempo manual semanal da equipe',
      'Construí relatórios periódicos usados por 200+ servidores em decisões de gestão',
      'Traduzi demandas diretas de gestores em análises, relatórios e automações, com autonomia técnica',
      'Desenvolvi e mantive 2+ sistemas internos usados nos períodos de alta demanda eleitoral',
    ],
  },
];

export const education = [
  { period: '2024 — 2025', title: 'Técnico em Ciência de Dados', org: 'Universidade Federal de Goiás (UFG)' },
  { period: '2023', title: 'Análise e Desenvolvimento de Sistemas', org: 'Centro Universitário IESB' },
];

export const certifications = [
  { name: 'Introduction to Data Science', issuer: 'Cisco', year: '2024' },
  { name: 'Networking Basics', issuer: 'Cisco', year: '2023' },
  { name: 'Desenvolvimento Web Completo', issuer: 'Udemy', year: '2023' },
];

export const skills = [
  { group: 'Dados & BI', items: ['Power BI', 'DAX', 'Modelagem dimensional', 'ETL', 'Excel avançado', 'Google Sheets', 'Databricks'] },
  { group: 'SQL & bancos', items: ['SQL', 'Modelagem relacional', 'PostgreSQL', 'SQL Server', 'MySQL', 'MongoDB', 'Supabase'] },
  { group: 'Python & análise', items: ['Python', 'Pandas', 'NumPy', 'Streamlit', 'Análise exploratória', 'R'] },
  { group: 'Desenvolvimento', items: ['TypeScript', 'Next.js', 'React Native / Expo', 'Node.js / Express', 'FastAPI', 'APIs REST', 'Git'] },
  { group: 'IA aplicada', items: ['Claude', 'ChatGPT', 'Gemini', 'Agentes com Agno', 'TensorFlow.js', 'OpenCV', 'MediaPipe'] },
];

export const languages = [
  { name: 'Português', level: 'nativo' },
  { name: 'Inglês', level: 'intermediário, leitura técnica e reuniões' },
];
