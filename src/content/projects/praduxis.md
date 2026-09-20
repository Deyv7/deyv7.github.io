---
title: PraduXIS
summary: Bot de Discord em Python que roda partidas de Banco Imobiliário dentro do servidor, com motor de regras testável, tabuleiro desenhado em imagem e turnos por botões.
category: [software]
cover: ../../assets/projects/praduxis/capa.png
gallery:
  - src: ../../assets/projects/praduxis/banner.png
    alt: Banner do bot, com o mascote Praduck em pixel art
role: Desenvolvedor
period: jun 2026 — atual
status: desenvolvimento
private: true
metrics:
  - { value: "40", label: "casas do tabuleiro brasileiro modeladas" }
  - { value: "5", label: "slash commands para conduzir a partida" }
stack:
  - { name: Python, role: "Linguagem do bot e do motor de regras" }
  - { name: discord.py, role: "Slash commands, botões de turno e cogs carregados automaticamente" }
  - { name: Pillow, role: "Renderização do tabuleiro em PNG, com base em cache e peões desenhados por jogada" }
  - { name: Railway, role: "Hospedagem do bot como processo worker" }
order: 6
---

## Problema

Jogar Banco Imobiliário com amigos no Discord exige alguém controlando dinheiro, propriedades e regras na mão. O desafio era levar o jogo inteiro para dentro do servidor, com o bot aplicando as regras.

## Solução

- **Motor de regras isolado** (`monopoly_game/`), sem nenhuma dependência do Discord: as 40 casas da versão brasileira, o estado da partida, rolagem, movimento, salário, compra, aluguel e falência. As regras podem ser testadas sem subir o bot.
- **Camada do Discord** em um cog separado: lobby por canal, slash commands (`/monopoly criar`, `entrar`, `iniciar`, `status` e `encerrar`) e turnos conduzidos por botões: rolar, depois comprar ou passar.
- **Tabuleiro como imagem:** o Pillow gera o PNG a partir de uma base em cache e desenha apenas os peões a cada jogada.
- **Deploy** no Railway como processo worker.

## Resultado

MVP jogável de ponta a ponta: partidas com dois ou mais jogadores, aluguel em dobro para grupo completo, estações e companhias, falência e vitória. As próximas fases são leilão, casas e hotéis, hipoteca e cartas de Sorte/Revés.
