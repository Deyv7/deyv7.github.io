---
title: E-Habilita
summary: Marketplace que conecta alunos a instrutores de trânsito, no ar com pagamentos, rastreamento GPS das aulas e verificação facial dos instrutores.
category: [software, dados, ia]
cover: ../../assets/projects/e-habilita/logo-capa.png
gallery:
  - src: ../../assets/projects/e-habilita/hero.jpg
    alt: Página inicial, com a busca de instrutores por bairro ou cidade
  - src: ../../assets/projects/e-habilita/como-funciona.jpg
    alt: Como funciona em três passos, da busca pelo bairro até a aula com rota ao vivo
  - src: ../../assets/projects/e-habilita/instrutores.jpg
    alt: Lista de instrutores com carro, avaliação e preço por hora (nomes e fotos ocultados)
  - src: ../../assets/projects/e-habilita/para-instrutores.jpg
    alt: Área para instrutores, com calculadora de ganhos após a taxa de processamento
  - src: ../../assets/projects/e-habilita/duvidas.jpg
    alt: Dúvidas frequentes sobre CNH, pagamento, cancelamento e LADV
role: Co-fundador e Dev Full-Stack
period: 2024 — atual
status: no-ar
private: true
metrics:
  - { value: "12+", label: "tabelas PostgreSQL modeladas" }
  - { value: "3", label: "painéis: aluno, instrutor e administração" }
  - { value: "Web + app", label: "Next.js no navegador, Expo no celular" }
stack:
  - { name: Next.js 16 + React 19, role: "Aplicação web com App Router e painéis por perfil" }
  - { name: Expo / React Native, role: "App mobile com câmera, geolocalização, mapas e notificações" }
  - { name: Supabase + PostgreSQL, role: "Autenticação e banco relacional com usuários, aulas, pagamentos e auditoria" }
  - { name: MercadoPago, role: "Checkout, gestão de status e split automático de pagamentos" }
  - { name: TensorFlow.js (BlazeFace), role: "Detecção facial com modelo pré-treinado para verificar instrutores" }
  - { name: TypeScript, role: "Tipagem de ponta a ponta na web e no app" }
  - { name: Tailwind CSS v4, role: "Interface da aplicação web" }
  - { name: Sentry, role: "Monitoramento de erros da aplicação" }
links:
  demo: https://e-habilita.com.br
related: [ai-ehabilita]
order: 2
---

## Problema

Conectar quem quer tirar a habilitação a um instrutor de trânsito envolve quatro coisas ao mesmo tempo: **confiança** (quem é esse instrutor?), **agenda**, **pagamento** e **acompanhamento da aula**. Resolver só uma delas não basta.

## Solução

Co-fundei a plataforma e desenvolvi o produto de ponta a ponta:

- **Dados:** modelei o banco relacional em PostgreSQL (Supabase) com mais de 12 tabelas, cobrindo usuários, aulas, pagamentos e auditoria.
- **Pagamentos:** integrei a API do MercadoPago com checkout, gestão de status e split automático entre as partes.
- **Confiança:** a verificação facial dos instrutores usa TensorFlow.js com o modelo BlazeFace e gera um score de confiança automático que alimenta um fluxo de aprovação.
- **Aula:** rastreamento GPS em tempo real e relatório de rota com distância e duração calculadas.
- **Canais:** site em Next.js com painéis de aluno, instrutor e administração, e app mobile em Expo.

## Resultado

A plataforma está **no ar** em e-habilita.com.br, em fase beta e ainda sem base de usuários, com os erros monitorados pelo Sentry. O atendimento e a validação de cadastros contam com um agente de IA próprio, descrito no projeto relacionado.
