---
title: Will.IA
summary: A rental management system that generates charges automatically, reconciles Pix payments from email notifications, and supports tenants on WhatsApp through a team of AI agents.
category: [software, dados, ia]
cover: ../../assets/projects/will-ia/capa.png
gallery:
  - src: ../../assets/projects/will-ia/fluxo-conciliacao.svg
    alt: Pix reconciliation and automatic daily billing workflow
  - src: ../../assets/projects/will-ia/capa.png
    alt: Will.IA logo
role: Full-Stack Developer
period: May — Jun 2026
status: desenvolvimento
private: true
metrics:
  - { value: "3", label: "services: Node backend, Python agents, and mobile app" }
  - { value: "6", label: "specialized AI agents" }
  - { value: "1×/day", label: "billing, late fee, and interest routine" }
stack:
  - { name: Node.js + Express 5 (TypeScript), role: "Backend with scheduled jobs, reconciliation, and a JWT-authenticated API" }
  - { name: node-cron, role: "Daily routine for automatic billing, late fees, and interest" }
  - { name: IMAP, role: "Reads Pix payment notifications received by email, with a server allowlist" }
  - { name: OpenAI, role: "Structured extraction of sender and amount from email text" }
  - { name: Python + FastAPI + Agno, role: "Agent team that supports tenants and property owners on WhatsApp" }
  - { name: WhatsApp Cloud API, role: "Billing notifications and support channel" }
  - { name: Supabase (PostgreSQL), role: "Database and authentication for properties, tenants, charges, receipts, and quarantined Pix payments" }
  - { name: Expo / React Native, role: "Owner app with a dashboard, transactions, overdue payments, expenses, and Brazilian income tax reporting" }
  - { name: fpdf2, role: "PDF report generation, including Brazilian income tax reports" }
  - { name: Vitest + pytest, role: "Tests for automatic billing, reconciliation, security, and the webhook" }
order: 3
---

## Problem

Property owners who manage their own rentals repeat the same routine every month: add water and electricity costs to the rent, send charges, check statements to see who paid, issue receipts, follow up on late payments, and answer tenant questions. All by hand.

## Solution

A system in three parts, integrated through Supabase:

- **Automatic billing:** a daily scheduler creates each property's charge on its configured date, combining rent with the latest water and electricity entries, without creating duplicates. It then sends a WhatsApp notification and applies late fees and interest to overdue charges.
- **Pix reconciliation through email:** an IMAP listener for each owner filters Pix notifications. OpenAI extracts the sender and amount, and the reconciliation service marks the charge as paid and generates a receipt. Unmatched payments go into a **review quarantine** instead of being marked as paid.
- **AI support:** a team of Agno agents answers questions on WhatsApp about charges, properties, and account details. Queries are read-only; the only permitted write lets a tenant correct their own name or WhatsApp number, with explicit confirmation.
- **An owner app** built with Expo: dashboard, transactions, tenants, expenses, overdue payments, quarantined Pix payments, and a report for Brazilian individual income tax (IRPF).
- **Security:** encrypted email credentials, an IMAP server allowlist against SSRF, JWT validation, and a property ownership check on every request.

## Result

The monthly cycle—billing, checking payments, issuing receipts, and following up on overdue charges—runs automatically. Owners only receive ambiguous cases, such as a Pix payment with an unidentified sender.
