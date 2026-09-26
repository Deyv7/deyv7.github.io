---
title: AI E-Habilita
summary: A Python AI service that supports students and instructors and validates new instructor registrations with document OCR, escalating discrepancies to human review.
category: [ia, software]
cover: ../../assets/projects/ai-ehabilita/capa.svg
gallery:
  - src: ../../assets/projects/ai-ehabilita/fluxo-validacao.svg
    alt: Registration validation workflow, from document submission to approval or human review
role: Developer
period: May 2026
status: no-ar
private: true
metrics:
  - { value: "2", label: "agents for support and registration validation" }
  - { value: "4", label: "steps before approving an instructor" }
  - { value: "3", label: "required documents checked with OCR" }
stack:
  - { name: Python, role: "Language for the service and agent tools" }
  - { name: FastAPI, role: "API with a support endpoint and webhooks for automatic replies and validation" }
  - { name: Agno, role: "Orchestration of agents, tools, and session history" }
  - { name: Google Gemini, role: "Model for the support and validation agents" }
  - { name: Supabase, role: "Balance, lesson, and request queries, plus instructor status updates" }
  - { name: Sentry, role: "Monitoring with transaction sampling and no personal data sent" }
  - { name: Railway, role: "Service deployment" }
related: [e-habilita]
order: 4
---

## Problem

A platform connecting students with driving instructors involves two repetitive, sensitive tasks. The first is answering **recurring questions** from students and instructors about balances, request status, and lesson history. The second is **validating documents** for each new instructor, a process that must be rigorous because it affects learner safety.

## Solution

A FastAPI service with two agents built using Agno:

- **Support agent:** answers in Portuguese using a knowledge base and tools that query actual data, including balances, request status, lesson history, and instructors by neighborhood. It triages urgent cases and transfers them to human support when needed.
- **Registration validation agent:** follows a fixed sequence. First, it runs OCR on the driver's license (CNH), clearance certificate, and proof of address. Then it cross-checks the registration data, verifies the clearance, and makes a decision. Approval is granted only when everything is consistent; any inconsistency or unreadable critical document goes to **human review**.
- **Guardrails:** the agents do not run destructive database operations, expose personal data or internal details, or accept instructions such as "ignore previous instructions."

## Result

The agents handle repetitive work, while human review is reserved for inconsistent cases. The service integrates with E-Habilita through webhooks and is monitored by Sentry.
