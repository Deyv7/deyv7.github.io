---
title: 2 Pulos
summary: Estúdio próprio de sites, cartões NFC e sistemas sob medida. Criei a marca, o site em dois idiomas e a infraestrutura que entrega uma prévia por cliente.
category: [software]
cover: ../../assets/projects/2pulos/logo-capa.png
gallery:
  - src: ../../assets/projects/2pulos/site.png
    alt: Primeira dobra do site 2pulos.com, com a chamada principal e o cartão NFC
role: Fundador e Desenvolvedor
period: ago 2026 — atual
status: producao
private: true
links:
  demo: https://2pulos.com
metrics:
  - { value: "2 idiomas", label: "landing em português e inglês" }
  - { value: "4 dias", label: "do primeiro commit ao site no ar" }
  - { value: "HTTPS", label: "prévia por cliente em subdomínio próprio" }
stack:
  - { name: Next.js 16 (App Router), role: "Páginas em dois idiomas, metadados globais e rotas de sitemap, robots e manifest" }
  - { name: TypeScript, role: "Tipagem dos componentes, dos textos e da configuração" }
  - { name: Tailwind CSS v4, role: "Interface, paleta e tema claro/escuro" }
  - { name: JSON-LD + Open Graph, role: "Dados estruturados e imagem de compartilhamento 1200×630 gerada no projeto" }
  - { name: Vercel, role: "Deploy de produção e emissão do certificado curinga" }
  - { name: DNS + TLS curinga, role: "Subdomínio por cliente (*.2pulos.com) com HTTPS válido" }
  - { name: WhatsApp e e-mail, role: "Contato direto, com o plano escolhido já na mensagem" }
order: 7
---

## Problema

Um estúdio que vende sites, cartões NFC e sistemas precisa de duas coisas. A primeira é uma página que carregue rápido, apareça bem nas buscas e transforme visita em conversa. A segunda é uma forma de mostrar ao cliente a prévia do site dele **antes** de fechar negócio, sem comprar um domínio para cada prospect.

## Solução

Criei o estúdio e o site inteiro, do layout e dos textos ao código e à infraestrutura:

- **Landing em Next.js 16** com serviços, cartões NFC, planos, processo, FAQ e contato, publicada em **português e inglês**, com troca por bandeira.
- **Tema claro e escuro** com botão de alternância. Neutralizei a paleta e corrigi o contraste do rodapé, que estava em 3.1 e passou a cumprir o mínimo de 4.5 da WCAG.
- **Contato sem atrito:** o formulário abre o e-mail já preenchido e os botões de WhatsApp levam o plano escolhido dentro da mensagem.
- **SEO técnico** desde o início: `metadataBase`, sitemap, robots, manifest, JSON-LD e imagem de compartilhamento gerada no próprio projeto.
- **Infraestrutura:** deploy na Vercel, DNS e e-mail próprios, e **subdomínio curinga `*.2pulos.com`** com certificado, para cada prospect receber a prévia num endereço só dele.

## Resultado

Site no ar em 2pulos.com, nos dois idiomas, com a base das prévias por cliente já funcionando: qualquer subdomínio responde com HTTPS válido e o `canonical` consolida tudo no endereço principal, evitando conteúdo duplicado.

O próximo passo é a prévia protegida: link assinado com validade, tela de entrada que não é consumida pelos robôs de pré-visualização do WhatsApp, `noindex` e bloqueio no `robots.txt`.
