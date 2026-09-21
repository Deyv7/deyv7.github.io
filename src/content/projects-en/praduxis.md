---
title: PraduXIS
summary: A Python Discord bot that runs Banco Imobiliário games inside the server, with a testable rules engine, an image-rendered board, and button-driven turns.
category: [software]
cover: ../../assets/projects/praduxis/capa.png
gallery:
  - src: ../../assets/projects/praduxis/banner.png
    alt: Bot banner featuring the Praduck mascot in pixel art
role: Developer
period: Jun 2026 — present
status: desenvolvimento
private: true
metrics:
  - { value: "40", label: "spaces modeled from the Brazilian game board" }
  - { value: "5", label: "slash commands to manage a game" }
stack:
  - { name: Python, role: "Language for the bot and rules engine" }
  - { name: discord.py, role: "Slash commands, turn buttons, and automatically loaded cogs" }
  - { name: Pillow, role: "PNG board rendering with a cached background and tokens drawn on each turn" }
  - { name: Railway, role: "Bot hosting as a worker process" }
order: 6
---

## Problem

Playing Banco Imobiliário with friends on Discord requires someone to track money, properties, and rules manually. The challenge was to bring the entire game into the server, with the bot enforcing the rules.

## Solution

- **An isolated rules engine** (`monopoly_game/`) with no Discord dependency: the Brazilian edition's 40 spaces, game state, dice rolls, movement, salary, purchases, rent, and bankruptcy. The rules can be tested without starting the bot.
- **A Discord layer** in a separate cog: a lobby per channel, slash commands (`/monopoly criar`, `entrar`, `iniciar`, `status`, and `encerrar`), and button-driven turns: roll, then buy or pass.
- **An image-based board:** Pillow generates the PNG from a cached background and redraws only the tokens on each turn.
- **Deployment** on Railway as a worker process.

## Result

A playable end-to-end MVP: games with two or more players, double rent for a complete property group, railroads and utilities, bankruptcy, and victory. Upcoming stages include auctions, houses and hotels, mortgages, and Sorte/Revés cards.
