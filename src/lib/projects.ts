import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';

export type Project = CollectionEntry<'projects'> | CollectionEntry<'projectsEn'>;
export type Category = Project['data']['category'][number];

// A ordem das chaves define a ordem das abas de filtro
export const categoryLabel: Record<Category, string> = {
  dados: 'Dados',
  software: 'Software',
  ia: 'IA',
};

export const statusLabel: Record<Project['data']['status'], string> = {
  producao: 'Em produção',
  'no-ar': 'No ar',
  concluido: 'Concluído',
  desenvolvimento: 'Em desenvolvimento',
};

export function getCategoryLabels(locale: Locale = 'pt-BR'): Record<Category, string> {
  return locale === 'en-US' ? { dados: 'Data', software: 'Software', ia: 'AI' } : categoryLabel;
}

export function getStatusLabels(locale: Locale = 'pt-BR'): Record<Project['data']['status'], string> {
  return locale === 'en-US'
    ? { producao: 'In production', 'no-ar': 'Live', concluido: 'Completed', desenvolvimento: 'In development' }
    : statusLabel;
}

export async function getProjects(locale: Locale = 'pt-BR'): Promise<Project[]> {
  const projects = locale === 'en-US' ? await getCollection('projectsEn') : await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}
