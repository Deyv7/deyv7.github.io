---
title: Libacess
summary: Ferramenta de acessibilidade em Python que traduz texto e fala para LIBRAS, mostrando letra por letra a imagem do sinal correspondente.
category: [ia]
cover: ../../assets/projects/libacess/capa.png
gallery:
  - src: ../../assets/projects/libacess/capa.png
    alt: Logo do Libacess, com o lema "mãos que conectam"
  - src: ../../assets/projects/libacess/sinal-letra-a.png
    alt: Ilustração do sinal da letra A em LIBRAS, exibida ao traduzir um texto
role: Desenvolvedor
period: 2025
status: concluido
private: false
stack:
  - { name: Python, role: "Base da aplicação" }
  - { name: Tkinter, role: "Interface desktop" }
  - { name: Pillow, role: "Exibição da imagem de cada letra em LIBRAS" }
  - { name: SpeechRecognition, role: "Conversão de fala em texto" }
links:
  repo: https://github.com/deyv7/Libacess
order: 5
---

## Problema

A comunicação entre pessoas surdas que usam LIBRAS e ouvintes que não conhecem a língua ainda depende, quase sempre, de um intérprete. Uma ferramenta simples ajuda a aproximar os dois lados, mostrando os sinais a partir de um texto ou de uma fala.

## Solução

Aplicação desktop em Python, com interface em Tkinter:

- a pessoa digita um texto ou fala no microfone;
- o SpeechRecognition converte o áudio em texto;
- o sistema mostra, letra por letra, a imagem do sinal correspondente em LIBRAS, respeitando o espaço entre as palavras;
- a interface (`interface.py`) fica separada da lógica principal (`main.py`).

## Próximos passos

Uma segunda versão, ainda em fase de protótipo, deve fazer o caminho inverso: reconhecer os sinais pela câmera e convertê-los em texto e voz.
