---
title: Case People Analytics NovaCasa
summary: Análise de 603 desligamentos de uma rede varejista que revelou 48% de saídas nos primeiros 90 dias e virou dashboard em Power BI com 3 recomendações para o RH.
category: [dados]
cover: ../../assets/projects/novacasa-people-analytics/logo-novacasa.png
gallery:
  - src: ../../assets/projects/novacasa-people-analytics/dashboard-power-bi.png
    alt: Dashboard em Power BI com total de desligados, turnover precoce, curva de retenção, saídas por UF, motivos e evolução mensal
  - src: ../../assets/projects/novacasa-people-analytics/painel-operacional.png
    alt: Painel operacional com indicadores de justa causa, tempo médio de casa e rankings por motivo e por UF
  - src: ../../assets/projects/novacasa-people-analytics/insights.png
    alt: Seção de insights analíticos com os principais achados do case
role: Analista de Dados (case individual)
period: abr 2026
status: concluido
private: false
metrics:
  - { value: "603", label: "desligamentos analisados" }
  - { value: "48%", label: "das saídas nos primeiros 90 dias" }
  - { value: "371 dias", label: "tempo médio de casa" }
  - { value: "5", label: "visões analíticas em DAX" }
stack:
  - { name: Python, role: "Tratamento da base de desligamentos" }
  - { name: Pandas, role: "Análise exploratória: tempo de casa, motivos de saída e distribuição no tempo" }
  - { name: Power BI, role: "Dashboard interativo para a liderança de RH" }
  - { name: DAX, role: "Medidas das 5 visões: motivos, volume por UF, evolução mensal, curva de retenção e justa causa" }
links:
  repo: https://github.com/deyv7/Case-People-Analytics-NovaCasa
  pdf: https://github.com/deyv7/Case-People-Analytics-NovaCasa/blob/main/NovaCasa_PeopleAnalytics.pdf
order: 1
---

## Problema

Uma rede varejista estava perdendo gente e precisava entender o porquê: quais os motivos de saída, onde os desligamentos se concentram e em que momento do vínculo as pessoas vão embora.

## Solução

- Tratei e explorei a base de **603 desligamentos** com Python e Pandas.
- Montei o modelo no Power BI e escrevi as medidas em DAX para cinco visões: **motivos de saída, volume por UF, evolução mensal, curva de retenção e análise de justa causa**.
- Organizei o dashboard como uma narrativa: do panorama geral até o recorte que explica o problema.

## Resultado

O diagnóstico mostrou que **48% dos desligamentos aconteciam nos primeiros 90 dias**, apesar de o tempo médio de casa ser de 371 dias. O problema estava na entrada, não na permanência.

A partir desse achado, a análise terminou com **3 recomendações** entregues à liderança de RH. O arquivo `.pbix` e o relatório em PDF estão públicos no repositório.
