---
title: Eleições em dados
summary: Dados eleitorais do DF transformados em um mart no BigQuery com dbt, 27 testes de qualidade e um dashboard Power BI para analisar comparecimento e abstenção em 2018 e 2022.
category: [dados]
cover: ../../assets/projects/eleicoes-em-dados/logo-tse.png
disclaimer: Projeto independente de Deyvid Prado, sem vínculo institucional com o TSE.
gallery:
  - src: ../../assets/projects/eleicoes-em-dados/dashboard-2022-2turno.png
    alt: Dashboard Power BI com eleitorado, comparecimento, abstenção e ranking por zona eleitoral do DF no segundo turno de 2022
  - src: ../../assets/projects/eleicoes-em-dados/dashboard-2018-2turno.png
    alt: Dashboard Power BI com os indicadores do segundo turno de 2018 e comparação das taxas de abstenção do DF entre 2018 e 2022
role: Analytics Engineering e Análise de Dados (projeto individual)
period: set 2026
status: concluido
private: false
metrics:
  - { value: "27", label: "testes de qualidade aprovados" }
  - { value: "3", label: "modelos dbt" }
  - { value: "19", label: "zonas eleitorais do DF" }
  - { value: "76", label: "registros conciliados com a fonte" }
stack:
  - { name: BigQuery, role: "Armazenamento e consultas aos dados públicos do TSE via Base dos Dados" }
  - { name: dbt, role: "Transformação em camadas, testes de qualidade e documentação do mart" }
  - { name: SQL, role: "Modelagem, conciliação com a fonte e análises de participação eleitoral" }
  - { name: Power BI, role: "Dashboard com indicadores, comparação entre eleições e ranking de zonas" }
  - { name: DAX, role: "Medidas de comparecimento, abstenção e variação em pontos percentuais" }
links:
  repo: https://github.com/Deyv7/eleicoes-em-dados
related: [novacasa-people-analytics]
order: 0
---

## Problema

Os dados eleitorais repetem as contagens de eleitores aptos, comparecimento e abstenção para cada cargo e misturam eleições ordinárias e suplementares. Somar esses registros sem definir o recorte pode multiplicar os totais e gerar indicadores incorretos.

O objetivo foi construir uma base confiável para analisar a participação eleitoral no **Distrito Federal nas eleições presidenciais de 2018 e 2022**, nos dois turnos.

## Solução

- Consumi a tabela pública do TSE disponibilizada pela **Base dos Dados no BigQuery**, com filtros por UF, ano, cargo, tipo de eleição e turno.
- Organizei as transformações em **três modelos dbt: staging, intermediate e mart**, com uma linha por zona, ano e turno e um contrato explícito de dados.
- Implementei **27 testes de qualidade**, incluindo unicidade, domínios, conciliação entre aptos, comparecimento e abstenção, além de comparação linha a linha com a fonte.
- Montei um dashboard em **Power BI**, com medidas DAX conferidas contra análises SQL e totais de referência.

## Resultado

O `dbt build` aprovou os **3 modelos e 27 testes**, sem avisos nem erros. As **76 linhas do mart** cobrem 19 zonas em cada combinação de ano e turno, com reprodução verificada em um dataset separado.

A análise mostrou que a abstenção do DF caiu de **18,92% para 16,72% no segundo turno**, entre 2018 e 2022: uma redução de **2,20 pontos percentuais**. Dentro do segundo turno de 2022, as taxas por zona variaram de 14,95% a 18,60%.

O repositório reúne modelos SQL, testes, documentação, instruções de reprodução e o projeto Power BI em formato **PBIP**, com relatório PBIR e modelo TMDL. As imagens permitem consultar o dashboard sem autenticação.

## Escopo e cuidados

O projeto usa uma fonte já publicada no BigQuery; ingestão própria, orquestração e atualização automática ficam para uma próxima versão. Os resultados são descritivos e não atribuem causas à variação de participação. As zonas não são comparadas entre anos, pois sua continuidade territorial não foi comprovada.

Projeto independente, sem vínculo institucional com o TSE.
