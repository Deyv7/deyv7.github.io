import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectCollection = (base: string) => defineCollection({
  loader: glob({ base, pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      category: z.array(z.enum(['dados', 'software', 'ia'])).min(1),
      /** Imagem do card (16:10). Sem ela, o card mostra um bloco neutro com o título */
      cover: image().optional(),
      /** Imagens da página do projeto. Sem galeria, a página usa a capa */
      gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      role: z.string(),
      // coerce: um ano sozinho no YAML (period: 2025) chega como número
      period: z.coerce.string(),
      status: z.enum(['producao', 'no-ar', 'concluido', 'desenvolvimento']),
      private: z.boolean().default(false),
      metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      stack: z.array(z.object({ name: z.string(), role: z.string() })).min(1),
      links: z
        .object({
          demo: z.string().optional(),
          repo: z.string().optional(),
          pdf: z.string().optional(),
        })
        .default({}),
      related: z.array(z.string()).default([]),
      order: z.number(),
    }),
});

export const collections = {
  projects: projectCollection('./src/content/projects'),
  projectsEn: projectCollection('./src/content/projects-en'),
};
