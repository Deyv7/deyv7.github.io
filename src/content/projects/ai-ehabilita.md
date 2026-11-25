---
title: AI E-Habilita
summary: Serviço de IA em Python que responde o suporte de alunos e instrutores e confere a certidão de antecedentes de novos instrutores, mandando para revisão humana o que não consegue confirmar.
category: [ia, software]
cover: ../../assets/projects/ai-ehabilita/capa.svg
gallery:
  - src: ../../assets/projects/ai-ehabilita/fluxo-validacao.svg
    alt: Roteiro da validação completa de cadastro, do envio dos documentos até a aprovação ou a revisão humana
role: Desenvolvedor
period: mai 2026
status: no-ar
private: true
metrics:
  - { value: "2", label: "agentes: suporte e validação de cadastro" }
  - { value: "TJDFT", label: "certidão conferida na API do tribunal" }
  - { value: "2", label: "tentativas antes de chamar o administrador" }
stack:
  - { name: Python, role: "Linguagem do serviço e das ferramentas dos agentes" }
  - { name: FastAPI, role: "API chamada pelo E-Habilita para o suporte e para a checagem de antecedentes" }
  - { name: Agno, role: "Orquestração dos agentes, das ferramentas e do histórico de sessão" }
  - { name: Google Gemini, role: "Modelo dos agentes e leitura (OCR) das certidões" }
  - { name: Supabase, role: "Consulta a saldo, aulas e solicitações, e atualização do status do instrutor" }
  - { name: Sentry, role: "Monitoramento com amostragem de transações e sem envio de dados pessoais" }
  - { name: Railway, role: "Deploy do serviço em Docker, com healthcheck" }
related: [e-habilita]
order: 4
---

## Problema

Uma plataforma que conecta alunos a instrutores tem dois trabalhos repetitivos e sensíveis. O primeiro são as **dúvidas recorrentes** de alunos e instrutores: saldo, status de solicitação, histórico de aulas. O segundo é a **verificação de cada novo instrutor**, que precisa ser rigorosa porque envolve a segurança de quem vai aprender a dirigir.

## Solução

Um serviço FastAPI com dois agentes feitos com Agno e Gemini:

- **Checagem de antecedentes:** quando o instrutor envia a certidão de nada consta, o E-Habilita chama o serviço. O Gemini lê a certidão, e uma segunda leitura confere só o código de validação, onde é fácil confundir Z com 2 ou O com 0. O nome da certidão é comparado com o do cadastro, e o código é consultado na API do TJDFT. O serviço só aprova sozinho quando o tribunal confirma. O resto fica pendente e, depois de 2 tentativas, vai para o administrador. Cada decisão fica no log de auditoria.
- **Agente de suporte:** responde em português com uma base de conhecimento (RAG) e ferramentas que consultam saldo, solicitações e histórico de aulas. Antes de a mensagem chegar ao modelo, um filtro barra frases típicas de prompt injection. O agente passa a conversa para atendimento humano quando o usuário pede ou quando não tem resposta.
- **Validação completa do cadastro:** o roteiro com leitura da CNH e do comprovante de endereço e cruzamento com o cadastro já está escrito no serviço, mas ainda não está ligado ao E-Habilita.

## Resultado

A checagem de antecedentes e o chat de suporte estão ligados ao E-Habilita, que segue em fase beta. O serviço roda em Docker no Railway, com os erros monitorados pelo Sentry. O próximo passo é ligar a validação completa do cadastro.
