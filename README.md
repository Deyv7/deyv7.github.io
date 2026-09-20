# deyv7.github.io

Portfólio pessoal de **Deyvid Prado de Jesus** — Analista de Dados e Desenvolvedor.

Site: https://deyv7.github.io

## Stack

- [Astro](https://astro.build) 7 (site estático, com transições entre páginas)
- [Tailwind CSS](https://tailwindcss.com) v4 + [daisyUI](https://daisyui.com) 5
- Deploy automático no GitHub Pages a cada push na `main`

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em http://localhost:4321.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera o site em `dist/` |
| `npm run preview` | Serve o build de produção |

## Estrutura

```
src/
  pages/            Home, Sobre, Currículo, Portfólio, Contato e a página de cada projeto
  components/       Barra lateral, cards, título de seção, ícones e tela de carregamento
  content/projects/ Um arquivo Markdown por projeto (texto, stack, métricas e imagens)
  data/profile.ts   Dados pessoais, experiência, formação e competências
  assets/projects/  Imagens de cada projeto
  styles/global.css Temas (grafite e papel), tipografia e animações
public/             CV em PDF, favicon e arquivos estáticos
```

Para adicionar um projeto, crie um arquivo em `src/content/projects/` seguindo o formato dos existentes. O schema fica em `src/content.config.ts`.
