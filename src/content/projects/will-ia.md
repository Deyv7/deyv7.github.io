---
title: Will.IA
summary: Sistema de gestão de aluguéis que gera cobranças sozinho, concilia pagamentos Pix lidos do e-mail e atende moradores pelo WhatsApp com um time de agentes de IA.
category: [software, dados, ia]
cover: ../../assets/projects/will-ia/capa.png
gallery:
  - src: ../../assets/projects/will-ia/fluxo-conciliacao.svg
    alt: Fluxo da conciliação de Pix e da cobrança diária automática
  - src: ../../assets/projects/will-ia/capa.png
    alt: Logo do Will.IA
role: Desenvolvedor Full-Stack
period: mai — jun 2026
status: desenvolvimento
private: true
metrics:
  - { value: "3", label: "serviços: backend Node, agentes Python e app mobile" }
  - { value: "6", label: "agentes de IA especializados" }
  - { value: "1×/dia", label: "rotina de cobrança, multa e juros" }
stack:
  - { name: Node.js + Express 5 (TypeScript), role: "Backend com agendamentos, conciliação e API autenticada por JWT" }
  - { name: node-cron, role: "Rotina diária de cobrança automática, multa e juros" }
  - { name: IMAP, role: "Leitura das notificações de Pix recebidas por e-mail, com allowlist de servidores" }
  - { name: OpenAI, role: "Extração estruturada de remetente e valor a partir do texto do e-mail" }
  - { name: Python + FastAPI + Agno, role: "Time de agentes que atende moradores e proprietários pelo WhatsApp" }
  - { name: WhatsApp Cloud API, role: "Avisos de cobrança e canal de atendimento" }
  - { name: Supabase (PostgreSQL), role: "Banco e autenticação: imóveis, inquilinos, cobranças, recibos e quarentena de Pix" }
  - { name: Expo / React Native, role: "App do proprietário com dashboard, lançamentos, inadimplência, despesas e IRPF" }
  - { name: fpdf2, role: "Geração de relatórios em PDF, como o de IRPF" }
  - { name: Vitest + pytest, role: "Testes da cobrança automática, da conciliação, da segurança e do webhook" }
order: 3
---

## Problema

Quem aluga imóveis e administra por conta própria repete a mesma rotina todo mês: calcular o valor com água e luz, cobrar, conferir no extrato quem pagou, emitir recibo, correr atrás de atraso e responder dúvidas de inquilino. Tudo feito à mão.

## Solução

Um sistema em três partes, integradas pelo Supabase:

- **Cobrança automática:** um agendador diário cria a cobrança de cada imóvel no dia configurado (aluguel mais os últimos lançamentos de água e luz), sem duplicar se ela já existir. Em seguida avisa pelo WhatsApp e aplica multa e juros nas cobranças vencidas.
- **Conciliação de Pix pelo e-mail:** um listener IMAP por proprietário filtra as notificações de Pix. A OpenAI extrai remetente e valor, e o serviço de conciliação baixa a cobrança e gera o recibo. Pagamento sem correspondência vai para uma **quarentena de revisão**, em vez de ser dado como pago.
- **Atendimento com IA:** um time de agentes Agno responde pelo WhatsApp sobre cobranças, imóvel e cadastro. As consultas são somente leitura; a única escrita permitida é o morador corrigir o próprio nome ou WhatsApp, com confirmação explícita.
- **App do proprietário** em Expo: dashboard, lançamentos, inquilinos, despesas, inadimplência, quarentena de Pix e relatório para o IRPF.
- **Segurança:** credenciais de e-mail criptografadas, allowlist de servidores IMAP contra SSRF, validação de JWT e checagem de que o imóvel pertence ao usuário em cada chamada.

## Resultado

O ciclo mensal (cobrar, conferir pagamento, emitir recibo e cobrar atraso) passa a rodar sozinho. Ao proprietário chegam só os casos ambíguos, como um Pix cujo remetente não foi identificado.
