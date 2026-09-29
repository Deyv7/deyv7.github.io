// Ícones de marca de https://thesvg.org, salvos em src/assets/stack/{slug}.svg.
// Monocromáticos (sem cor própria) vão inline com fill="currentColor" e seguem o tema;
// coloridos vão em <img>, para que <style> e ids internos de um SVG não vazem para a página.
const raws = import.meta.glob<string>('../assets/stack/*.svg', { query: '?raw', import: 'default', eager: true });
const urls = import.meta.glob<string>('../assets/stack/*.svg', { query: '?url', import: 'default', eager: true });

export type StackIcon = { slug: string } & ({ svg: string } | { src: string });

const slugOf = (path: string) => path.split('/').pop()!.replace('.svg', '');

const icons: Record<string, StackIcon> = Object.fromEntries(
  Object.entries(raws).map(([path, raw]) => {
    const slug = slugOf(path);
    const colored = /#[0-9a-f]{3,6}/i.test(raw);
    if (colored) return [slug, { slug, src: urls[path] }];
    const svg = raw
      .replace(/<title>.*?<\/title>/, '')
      // só na tag <svg>: elementos internos também podem ter width/height
      .replace(/<svg[^>]*>/, (tag) =>
        tag.replace(/ (width|height)="[^"]*"/g, '').replace('<svg ', '<svg aria-hidden="true" focusable="false" fill="currentColor" '),
      );
    return [slug, { slug, svg }];
  }),
);

/** Regra de nome da tecnologia (como aparece no frontmatter) → slug do ícone */
const rules: [RegExp, string][] = [
  [/next\.js/i, 'nextdotjs'],
  [/expo/i, 'expo'],
  [/react/i, 'react'],
  [/node\.js/i, 'nodedotjs'],
  [/express/i, 'express'],
  [/typescript/i, 'typescript'],
  [/tailwind/i, 'tailwind-css'],
  [/supabase/i, 'supabase'],
  [/postgres/i, 'postgresql'],
  [/mercado ?pago/i, 'mercado-pago'],
  [/tensorflow/i, 'tensorflow'],
  [/sentry/i, 'sentry'],
  [/github actions/i, 'github-actions'],
  [/python/i, 'python'],
  [/fastapi/i, 'fastapi'],
  [/bigquery/i, 'google-bigquery'],
  [/power bi/i, 'microsoft-power-bi'],
  [/^dbt$/i, 'dbt'],
  [/pandas/i, 'pandas'],
  [/railway/i, 'railway'],
  [/vercel/i, 'vercel'],
  [/gemini/i, 'google-gemini'],
  [/openai/i, 'openai'],
  [/whatsapp/i, 'whatsapp'],
  [/vitest/i, 'vitest'],
  [/pytest/i, 'pytest'],
  [/discord/i, 'discord'],
  [/json/i, 'json'],
];

/** Ícones das tecnologias citadas no nome, na ordem das regras */
export function getStackIcons(name: string): StackIcon[] {
  return rules.filter(([re]) => re.test(name)).flatMap(([, slug]) => (icons[slug] ? [icons[slug]] : []));
}
