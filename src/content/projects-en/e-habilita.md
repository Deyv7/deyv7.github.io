---
title: E-Habilita
summary: A live marketplace connecting students with driving instructors, with payments, GPS lesson tracking, and instructor face verification.
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
  - { value: "12+", label: "PostgreSQL tables modeled" }
  - { value: "3", label: "dashboards for students, instructors, and administrators" }
  - { value: "Web + app", label: "Next.js in the browser, Expo on mobile" }
stack:
  - { name: Next.js 16 + React 19, role: "Web application with App Router and role-specific dashboards" }
  - { name: Expo / React Native, role: "Mobile app with camera, geolocation, maps, and notifications" }
  - { name: Supabase + PostgreSQL, role: "Authentication and a relational database for users, lessons, payments, and audit logs" }
  - { name: MercadoPago, role: "Checkout, status management, and automatic payment splitting" }
  - { name: TensorFlow.js (BlazeFace), role: "Face detection with a pretrained model to verify instructors" }
  - { name: TypeScript, role: "End-to-end typing across the web and mobile apps" }
  - { name: Tailwind CSS v4, role: "Web application interface" }
  - { name: Sentry, role: "Application error monitoring" }
links:
  demo: https://e-habilita.com.br
related: [ai-ehabilita]
order: 2
---

## Problem

Connecting someone who wants a driver's license with a driving instructor involves four things at once: **trust** (who is this instructor?), **scheduling**, **payments**, and **lesson tracking**. Solving just one is not enough.

## Solution

I founded the platform and developed the product end to end:

- **Data:** I modeled a relational PostgreSQL database on Supabase with more than 12 tables covering users, lessons, payments, and audit logs.
- **Payments:** I integrated the MercadoPago API for checkout, status management, and automatic payment splitting between parties.
- **Trust:** instructor face verification uses TensorFlow.js with the BlazeFace model and generates an automatic confidence score that feeds an approval workflow.
- **Lessons:** real-time GPS tracking and route reports with calculated distance and duration.
- **Channels:** a Next.js website with student, instructor, and administrator dashboards, plus an Expo mobile app.

## Result

The platform is **live** at e-habilita.com.br, in beta and still without a user base, with errors monitored through Sentry. Support and registration validation use a dedicated AI agent, described in the related project.
