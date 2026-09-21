---
title: 2 Pulos
summary: A studio for websites, NFC cards, and custom software that I co-founded. I created the brand, the bilingual website, and the infrastructure that delivers a preview for each client.
category: [software]
cover: ../../assets/projects/2pulos/logo-capa.png
gallery:
  - src: ../../assets/projects/2pulos/site.png
    alt: The first screen of 2pulos.com, with the main headline and NFC card
role: Co-founder and Developer
period: Aug 2026 — present
status: producao
private: true
links:
  demo: https://2pulos.com
metrics:
  - { value: "2 languages", label: "landing page in Portuguese and English" }
  - { value: "4 days", label: "from the first commit to the live website" }
  - { value: "HTTPS", label: "client previews on individual subdomains" }
stack:
  - { name: Next.js 16 (App Router), role: "Bilingual pages, global metadata, and sitemap, robots, and manifest routes" }
  - { name: TypeScript, role: "Types for components, copy, and configuration" }
  - { name: Tailwind CSS v4, role: "Interface, color palette, and light/dark themes" }
  - { name: JSON-LD + Open Graph, role: "Structured data and a 1200×630 sharing image generated within the project" }
  - { name: Vercel, role: "Production deployment and wildcard certificate issuance" }
  - { name: DNS + wildcard TLS, role: "A subdomain per client (*.2pulos.com) with valid HTTPS" }
  - { name: WhatsApp and email, role: "Direct contact with the selected plan already included in the message" }
order: 7
---

## Problem

A studio selling websites, NFC cards, and custom software needs two things. First, a fast-loading page that performs well in search and turns visits into conversations. Second, a way to show each prospective client a preview of their website **before** closing the deal, without buying a domain for every prospect.

## Solution

I co-founded the studio and built the entire website, from layout and copy to code and infrastructure:

- **A Next.js 16 landing page** covering services, NFC cards, plans, process, FAQ, and contact, published in **Portuguese and English**, with a flag-based language switcher.
- **Light and dark themes** with a toggle. I made the palette neutral and fixed the footer contrast, raising it from 3.1 to meet the WCAG minimum of 4.5.
- **Easy contact:** the form opens a prefilled email, and WhatsApp buttons include the selected plan in the message.
- **Technical SEO** from the start: `metadataBase`, sitemap, robots, manifest, JSON-LD, and a sharing image generated within the project.
- **Infrastructure:** Vercel deployment, custom DNS and email, and a **wildcard subdomain `*.2pulos.com`** with a certificate, so each prospect gets a preview at their own address.

## Result

The website is live at 2pulos.com in both languages, with the foundation for client previews already working: every subdomain responds with valid HTTPS, and the `canonical` points to the main address to prevent duplicate content.

The next step is protected previews: expiring signed links, an entry screen that WhatsApp preview crawlers cannot consume, `noindex`, and blocking in `robots.txt`.
