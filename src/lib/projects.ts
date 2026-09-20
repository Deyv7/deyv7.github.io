import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Category = Project['data']['category'][number];

// A ordem das chaves define a ordem das abas de filtro
export const categoryLabel: Record<Category, string> = {
  dados: 'Dados',
  software: 'Software',
  ia: 'IA',
};

export const statusLabel: Record<Project['data']['status'], string> = {
  producao: 'Em produção',
  concluido: 'Concluído',
  desenvolvimento: 'Em desenvolvimento',
};

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}
