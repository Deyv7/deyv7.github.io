---
title: AI E-Habilita
summary: A Python AI service that answers support questions from students and instructors and checks new instructors' background certificates, sending anything it cannot confirm to human review.
category: [ia, software]
cover: ../../assets/projects/ai-ehabilita/capa.svg
gallery:
  - src: ../../assets/projects/ai-ehabilita/fluxo-validacao.svg
    alt: The full registration validation workflow, from document submission to approval or human review
role: Developer
period: May 2026
status: no-ar
private: true
metrics:
  - { value: "2", label: "agents for support and registration validation" }
  - { value: "TJDFT", label: "certificate verified against the court's API" }
  - { value: "2", label: "attempts before an administrator is called" }
stack:
  - { name: Python, role: "Language for the service and agent tools" }
  - { name: FastAPI, role: "API called by E-Habilita for support and background checks" }
  - { name: Agno, role: "Orchestration of agents, tools, and session history" }
  - { name: Google Gemini, role: "Model for the agents and OCR of the certificates" }
  - { name: Supabase, role: "Balance, lesson, and request queries, plus instructor status updates" }
  - { name: Sentry, role: "Monitoring with transaction sampling and no personal data sent" }
  - { name: Railway, role: "Docker deployment with a health check" }
related: [e-habilita]
order: 4
---

## Problem

A platform connecting students with driving instructors involves two repetitive, sensitive tasks. The first is answering **recurring questions** from students and instructors about balances, request status, and lesson history. The second is **vetting each new instructor**, which must be rigorous because it affects learner safety.

## Solution

A FastAPI service with two agents built with Agno and Gemini:

- **Background check:** when an instructor uploads their clean-record certificate, E-Habilita calls the service. Gemini reads the certificate, and a second pass rereads only the validation code, where it is easy to mix up Z and 2 or O and 0. The name on the certificate is compared with the registration, and the code is checked against the TJDFT court API. The service approves on its own only when the court confirms. Everything else stays pending and goes to an administrator after 2 attempts. Every decision is written to the audit log.
- **Support agent:** answers in Portuguese using a knowledge base (RAG) and tools that look up balances, requests, and lesson history. Before a message reaches the model, a filter blocks common prompt injection phrases. The agent hands the conversation to a human when the user asks or when it has no answer.
- **Full registration validation:** the workflow that reads the driver's license and proof of address and cross-checks them with the registration is already written in the service, but it is not yet connected to E-Habilita.

## Result

The background check and the support chat are connected to E-Habilita, which is still in beta. The service runs in Docker on Railway, with errors monitored through Sentry. The next step is to connect the full registration validation.
