---
title: AI E-Habilita
summary: Serviço de IA em Python que atende alunos e instrutores e valida o cadastro de novos instrutores com OCR de documentos, escalando para revisão humana quando algo não bate.
category: [ia, software]
cover: ../../assets/projects/ai-ehabilita/capa.svg
gallery:
  - src: ../../assets/projects/ai-ehabilita/fluxo-validacao.svg
    alt: Fluxo da validação de cadastro, do envio dos documentos até a aprovação ou a revisão humana
role: Desenvolvedor
period: mai 2026
status: producao
private: true
metrics:
  - { value: "2", label: "agentes: suporte e validação de cadastro" }
  - { value: "4", label: "etapas antes de aprovar um instrutor" }
  - { value: "3", label: "documentos obrigatórios verificados por OCR" }
stack:
  - { name: Python, role: "Linguagem do serviço e das ferramentas dos agentes" }
  - { name: FastAPI, role: "API com a rota de suporte e os webhooks de resposta automática e de validação" }
  - { name: Agno, role: "Orquestração dos agentes, das ferramentas e do histórico de sessão" }
  - { name: Google Gemini, role: "Modelo dos agentes de suporte e de validação" }
  - { name: Supabase, role: "Consulta a saldo, aulas e solicitações, e atualização do status do instrutor" }
  - { name: Sentry, role: "Monitoramento com amostragem de transações e sem envio de dados pessoais" }
  - { name: Railway, role: "Deploy do serviço" }
related: [e-habilita]
order: 4
---

## Problema

Uma plataforma que conecta alunos a instrutores tem dois trabalhos repetitivos e sensíveis. O primeiro são as **dúvidas recorrentes** de alunos e instrutores: saldo, status de solicitação, histórico de aulas. O segundo é a **validação dos documentos** de cada novo instrutor, que precisa ser rigorosa porque envolve a segurança de quem vai aprender a dirigir.

## Solução

Um serviço FastAPI com dois agentes construídos com Agno:

- **Agente de suporte:** responde em português consultando uma base de conhecimento e ferramentas que leem dados reais (saldo, status de solicitação, histórico de aulas, instrutores por bairro). Faz triagem de urgência e transfere para atendimento humano quando necessário.
- **Agente de validação de cadastro:** segue um roteiro fixo. Primeiro, OCR da CNH, da certidão e do comprovante de endereço. Depois, validação cruzada com o cadastro, checagem de nada consta e decisão. Só aprova se tudo estiver consistente; qualquer inconsistência ou falha de leitura em documento crítico vai para **revisão humana**.
- **Guarda-corpos:** os agentes não executam operações destrutivas no banco, não expõem dados pessoais nem detalhes internos e recusam instruções do tipo "ignore as instruções anteriores".

## Resultado

O trabalho repetitivo fica com os agentes, e a revisão humana é reservada para os casos com inconsistência. O serviço é integrado ao E-Habilita por webhooks e monitorado pelo Sentry.
