---
title: 2 Pulos
summary: Estúdio de sites, cartões NFC e sistemas sob medida que co-fundei. Fiz a marca, o site em dois idiomas, a infraestrutura que entrega uma prévia por cliente e o site do primeiro cliente.
category: [software]
cover: ../../assets/projects/2pulos/logo-capa.png
gallery:
  - src: ../../assets/projects/2pulos/site.png
    alt: Primeira dobra do site 2pulos.com, com a chamada principal e o cartão NFC
  - src: ../../assets/projects/2pulos/queroacai.png
    alt: Site da Quero Açaí, primeiro cliente do estúdio, publicado em prévia em queroacai.2pulos.com
role: Co-fundador e Desenvolvedor
period: ago 2026 — atual
status: producao
private: true
links:
  demo: https://2pulos.com
metrics:
  - { value: "2 idiomas", label: "landing em português e inglês" }
  - { value: "4 dias", label: "do primeiro commit ao site no ar" }
  - { value: "HTTPS", label: "prévia por cliente em subdomínio próprio" }
  - { value: "1º cliente", label: "site da Quero Açaí, no ar em prévia" }
stack:
  - { name: Next.js 16 (App Router), role: "Páginas em dois idiomas, metadados globais e rotas de sitemap, robots e manifest" }
  - { name: TypeScript, role: "Tipagem dos componentes e do dicionário de textos dos dois idiomas" }
  - { name: Tailwind CSS v4, role: "Interface, paleta e tema claro/escuro" }
  - { name: WebGL, role: "Fumaça animada no topo da página, feita em duas passadas de shader" }
  - { name: JSON-LD + Open Graph, role: "Dados estruturados e imagem de compartilhamento 1200×630 gerada no projeto" }
  - { name: Vercel, role: "Deploy de produção e emissão do certificado curinga" }
  - { name: DNS + TLS curinga, role: "Subdomínio por cliente (*.2pulos.com) com HTTPS válido" }
  - { name: WhatsApp e e-mail, role: "Contato direto, com o plano escolhido já na mensagem" }
order: 7
---

## Problema

Um estúdio que vende sites, cartões NFC e sistemas precisa de duas coisas. A primeira é uma página que carregue rápido, apareça bem nas buscas e transforme visita em conversa. A segunda é uma forma de mostrar ao cliente a prévia do site dele **antes** de fechar negócio, sem comprar um domínio para cada prospect.

## Solução

Co-fundei o estúdio e fiz o site inteiro, do layout e dos textos ao código e à infraestrutura:

- **Landing em Next.js 16** com serviços, cartões NFC, planos, processo, FAQ e contato, em **português e inglês**. Os dois idiomas usam o mesmo componente de página, e o dicionário em inglês é tipado a partir do português, então uma tradução esquecida quebra o build.
- **Tema claro e escuro** aplicado antes da primeira pintura, para a página não piscar. Troquei o cinza do texto auxiliar, que tinha contraste de 3.1:1, por um que cumpre o mínimo de 4.5:1 da WCAG AA.
- **Fumaça em WebGL** no topo, em duas passadas de shader: a primeira calcula a fumaça numa textura pequena, e a segunda amplia e aplica as cores do tema. A animação pausa fora da tela e com a aba escondida, e quem pede menos movimento vê um quadro parado.
- **Contato sem atrito:** o formulário abre o e-mail já preenchido e os botões de WhatsApp levam o plano escolhido dentro da mensagem.
- **SEO técnico** desde o primeiro dia: `canonical` e `hreflang` por idioma, sitemap, robots, manifest, JSON-LD com serviços, ofertas e FAQ, e imagem de compartilhamento gerada no próprio projeto.
- **Infraestrutura:** deploy na Vercel, DNS e e-mail próprios, e **subdomínio curinga `*.2pulos.com`** com certificado, para cada prospect receber a prévia num endereço só dele.

## Primeiro cliente: Quero Açaí

O primeiro cliente do estúdio é a Quero Açaí, uma loja de açaí no Riacho Fundo I, em Brasília. Fiz o site em Next.js 16 a partir do layout desktop e mobile feito no Penpot, mantendo os textos da loja. As telas do programa de fidelidade, como cadastro, cartela, prêmio e caixa, estão prontas como demonstração, com dados fictícios. O carrossel de avaliações busca no Google, por uma rota no servidor, só as avaliações de 5 estrelas, e entra no ar quando as credenciais do Google forem configuradas.

## Resultado

O site do estúdio está no ar em 2pulos.com, nos dois idiomas, e o da Quero Açaí está publicado em prévia em queroacai.2pulos.com, usando a mesma infraestrutura de subdomínios. Qualquer subdomínio responde com HTTPS válido, e o `canonical` de cada prévia aponta para o endereço certo, sem conteúdo duplicado.

O próximo passo é a prévia protegida: link assinado com validade, tela de entrada que não é consumida pelos robôs de pré-visualização do WhatsApp, `noindex` e bloqueio no `robots.txt`.
