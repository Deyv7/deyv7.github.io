---
title: E-Habilita
summary: A platform that connects learner drivers with independent driving instructors. Published in beta, with payments held until the lesson happens, live GPS during lessons, and instructor background checks.
category: [software, dados, ia]
cover: ../../assets/projects/e-habilita/logo-capa.png
gallery:
  - src: ../../assets/projects/e-habilita/hero.jpg
    alt: Homepage with instructor search by neighborhood or city
  - src: ../../assets/projects/e-habilita/como-funciona.jpg
    alt: How it works in three steps, from neighborhood search to a lesson with live route tracking
  - src: ../../assets/projects/e-habilita/instrutores.jpg
    alt: Instructor list with cars, ratings, and hourly prices (names and photos hidden)
  - src: ../../assets/projects/e-habilita/para-instrutores.jpg
    alt: Instructor section with an earnings calculator after the processing fee
  - src: ../../assets/projects/e-habilita/duvidas.jpg
    alt: Frequently asked questions about driver's licenses, payments, cancellations, and learner permits
role: Founder and Full-Stack Developer
period: 2024 — present
status: no-ar
private: true
metrics:
  - { value: "~20", label: "PostgreSQL tables used by the code" }
  - { value: "40", label: "API routes in the web app" }
  - { value: "Web + app", label: "Next.js in the browser, Expo on mobile" }
  - { value: "73", label: "automated tests running in CI" }
stack:
  - { name: Next.js 16 + React 19, role: "Web app with App Router, API routes, and student, instructor, and admin dashboards" }
  - { name: Expo / React Native, role: "Mobile app with camera, GPS, maps, and notifications, on the same Supabase backend" }
  - { name: Supabase + PostgreSQL, role: "Auth, Storage, Realtime, and RLS, with SQL functions for withdrawals and balance release" }
  - { name: MercadoPago, role: "Checkout and a webhook that verifies the signature and never processes the same payment twice" }
  - { name: TensorFlow.js (BlazeFace), role: "Face detection on the instructor's profile photo" }
  - { name: TypeScript, role: "End-to-end typing on web and mobile" }
  - { name: Tailwind CSS v4, role: "Web app interface" }
  - { name: Sentry, role: "Error monitoring on the web app, the mobile app, and the AI service" }
  - { name: GitHub Actions, role: "Tests and type checking on every PR, plus deployment to Vercel" }
links:
  demo: https://e-habilita.com.br
related: [ai-ehabilita]
order: 2
---

## Problem

Connecting someone who wants a driver's license with a driving instructor involves four things at once: **trust** (who is this instructor?), **scheduling**, **payments**, and **lesson tracking**. Solving just one is not enough.

## Solution

I founded the platform and wrote most of the code. In the web repository, 497 of the 578 commits on the main branch are mine.

- **Payment held until the lesson:** I integrated MercadoPago. The webhook verifies the header signature, skips payments that were already processed, and looks the payment up in the API before recording it. The amount goes into the instructor's wallet as pending and is released only after the lesson. Fees are calculated in whole cents.
- **Lessons:** start and end are confirmed with 4-digit codes, and a lesson must last at least 30 minutes to be completed. The instructor's app streams GPS live through Supabase Realtime, and family members can follow along through a link without an account.
- **Withdrawals:** the debit runs in a SQL function that locks the wallet row, so two simultaneous requests cannot spend the same balance.
- **Trust:** an instructor photo is accepted only when BlazeFace finds a face with at least 97% confidence. The background check certificate goes through the AI service, which verifies its code against the TJDFT court API.
- **Data:** about 20 tables in Supabase PostgreSQL, with RLS policies and SQL functions called by the API.
- **Security and tests:** I reviewed authorization on the routes that use the Supabase service key and the RLS policies on tables with sensitive data. The 73 tests cover authorization on the sensitive routes and password recovery, and they run in CI alongside type checking.
- **Channels:** a Next.js website with student, instructor, and admin dashboards, plus an Expo mobile app.

## Result

The platform is published at e-habilita.com.br, in beta and still without users, with errors monitored through Sentry. The app is not on the Play Store yet. The background check and the support chat run in a separate AI service, described in the related project.

Next steps: merge the two ways of completing a lesson into a single rule, limit attempts on the lesson code, and move the balance calculations that still happen in the application into the database.
