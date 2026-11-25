---
title: 2 Pulos
summary: A studio for websites, NFC cards, and custom software that I co-founded. I created the brand, the bilingual website, the infrastructure that delivers a preview for each client, and the first client's website.
category: [software]
cover: ../../assets/projects/2pulos/logo-capa.png
gallery:
  - src: ../../assets/projects/2pulos/site.png
    alt: The first screen of 2pulos.com, with the main headline and NFC card
  - src: ../../assets/projects/2pulos/queroacai.png
    alt: The Quero Açaí website, the studio's first client, published as a preview at queroacai.2pulos.com
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
  - { value: "1st client", label: "Quero Açaí website, live as a preview" }
stack:
  - { name: Next.js 16 (App Router), role: "Bilingual pages, global metadata, and sitemap, robots, and manifest routes" }
  - { name: TypeScript, role: "Types for components and for the copy dictionary in both languages" }
  - { name: Tailwind CSS v4, role: "Interface, color palette, and light/dark themes" }
  - { name: WebGL, role: "Animated smoke at the top of the page, rendered in two shader passes" }
  - { name: JSON-LD + Open Graph, role: "Structured data and a 1200×630 sharing image generated within the project" }
  - { name: Vercel, role: "Production deployment and wildcard certificate issuance" }
  - { name: DNS + wildcard TLS, role: "A subdomain per client (*.2pulos.com) with valid HTTPS" }
  - { name: WhatsApp and email, role: "Direct contact with the selected plan already included in the message" }
order: 7
---

## Problem

A studio that sells websites, NFC cards, and software needs two things. The first is a page that loads fast, ranks well in search, and turns visits into conversations. The second is a way to show clients a preview of their own website **before** closing a deal, without buying a domain for every prospect.

## Solution

I co-founded the studio and built the entire website, from layout and copy to code and infrastructure:

- **A Next.js 16 landing page** with services, NFC cards, plans, process, FAQ, and contact, in **Portuguese and English**. Both languages share one page component, and the English dictionary is typed from the Portuguese one, so a missing translation breaks the build.
- **Light and dark themes** applied before the first paint, so the page does not flash. I replaced the gray used for secondary text, which had a 3.1:1 contrast ratio, with one that meets the WCAG AA minimum of 4.5:1.
- **WebGL smoke** at the top of the page, in two shader passes: the first computes the smoke on a small texture, and the second scales it up and applies the theme colors. The animation pauses when it is off screen or the tab is hidden, and visitors who prefer reduced motion see a still frame.
- **Frictionless contact:** the form opens a prefilled email, and the WhatsApp buttons include the selected plan in the message.
- **Technical SEO** from day one: per-language `canonical` and `hreflang`, sitemap, robots, manifest, JSON-LD with services, offers, and FAQ, and a sharing image generated within the project.
- **Infrastructure:** Vercel deployment, custom DNS and email, and a **wildcard subdomain `*.2pulos.com`** with a certificate, so each prospect gets a preview at an address of their own.

## First client: Quero Açaí

The studio's first client is Quero Açaí, an açaí shop in Riacho Fundo I, Brasília. I built its website in Next.js 16 from the desktop and mobile layouts designed in Penpot, keeping the shop's own copy. The loyalty program screens, including sign-up, stamp card, reward, and cashier, are ready as a demo with fictional data. The reviews carousel pulls only 5-star reviews from Google through a server route, and it goes live once the Google credentials are configured.

## Result

The studio's website is live at 2pulos.com in both languages, and the Quero Açaí website is published as a preview at queroacai.2pulos.com, on the same subdomain infrastructure. Any subdomain responds with valid HTTPS, and each preview's `canonical` points to the right address, with no duplicate content.

The next step is protected previews: signed links with an expiration date, an entry screen that WhatsApp link preview bots cannot consume, `noindex`, and a block in `robots.txt`.
