export type Locale = 'pt-BR' | 'en-US';

const routes = [
  ['/sobre/', '/en/about/'],
  ['/curriculo/', '/en/resume/'],
  ['/projetos/', '/en/projects/'],
  ['/contato/', '/en/contact/'],
  ['/404.html', '/en/404/'],
] as const;

export function getLocale(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en-US' : 'pt-BR';
}

/** Convert only site routes; preserve project slugs, queries and anchors. */
export function localizePath(path: string, locale: Locale): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const [, pathname, suffix = ''] = path.match(/^([^?#]*)([?#].*)?$/)!;
  const normalized = pathname.endsWith('/') || pathname.includes('.') ? pathname : `${pathname}/`;
  if (normalized === '/' || normalized === '/en/') return (locale === 'en-US' ? '/en/' : '/') + suffix;

  for (const [pt, en] of routes) {
    for (const source of [pt, en]) {
      if (normalized === source || (source.endsWith('/') && normalized.startsWith(source))) {
        return (locale === 'en-US' ? en : pt) + normalized.slice(source.length) + suffix;
      }
    }
  }
  return path;
}

export const navigationLabels = {
  'pt-BR': { '/': 'Home', '/sobre/': 'Sobre', '/curriculo/': 'Currículo', '/projetos/': 'Portfólio', '/contato/': 'Contato' },
  'en-US': { '/': 'Home', '/sobre/': 'About', '/curriculo/': 'Resume', '/projetos/': 'Portfolio', '/contato/': 'Contact' },
};
