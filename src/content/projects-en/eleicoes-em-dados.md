---
title: Eleições em dados
summary: Federal District election data transformed into a BigQuery mart with dbt, 27 data quality tests, and a Power BI dashboard to analyze turnout and abstention in 2018 and 2022.
category: [dados]
cover: ../../assets/projects/eleicoes-em-dados/logo-tse.png
disclaimer: Independent project by Deyvid Prado, with no institutional affiliation with the TSE.
gallery:
  - src: ../../assets/projects/eleicoes-em-dados/dashboard-2022-2turno.png
    alt: Power BI dashboard showing eligible voters, turnout, abstention, and electoral zone rankings in Brazil's Federal District for the 2022 runoff
  - src: ../../assets/projects/eleicoes-em-dados/dashboard-2018-2turno.png
    alt: Power BI dashboard showing 2018 runoff indicators and a comparison of Federal District abstention rates in 2018 and 2022
role: Analytics Engineering and Data Analysis (individual project)
period: Sep 2026
status: concluido
private: false
metrics:
  - { value: "27", label: "data quality tests passed" }
  - { value: "3", label: "dbt models" }
  - { value: "19", label: "Federal District electoral zones" }
  - { value: "76", label: "records reconciled with the source" }
stack:
  - { name: BigQuery, role: "Storage and queries against public TSE data provided by Base dos Dados" }
  - { name: dbt, role: "Layered transformations, data quality tests, and mart documentation" }
  - { name: SQL, role: "Modeling, source reconciliation, and electoral participation analysis" }
  - { name: Power BI, role: "Dashboard with indicators, election comparisons, and zone rankings" }
  - { name: DAX, role: "Measures for turnout, abstention, and percentage point changes" }
links:
  repo: https://github.com/Deyv7/eleicoes-em-dados
related: [novacasa-people-analytics]
order: 0
---

## Problem

Election data repeats eligible voter, turnout, and abstention counts for each office and mixes regular and supplementary elections. Summing these records without defining the scope can multiply totals and produce incorrect indicators.

The goal was to build a reliable dataset to analyze participation in **Brazil's Federal District during the 2018 and 2022 presidential elections**, across both rounds.

## Solution

- Queried the public TSE table provided by **Base dos Dados in BigQuery**, filtering by state, year, office, election type, and round.
- Organized transformations into **three dbt models: staging, intermediate, and mart**, with one row per electoral zone, year, and round, and an explicit data contract.
- Implemented **27 data quality tests**, covering uniqueness, accepted values, reconciliation of eligible voters with turnout and abstention, and row-by-row comparison with the source.
- Built a **Power BI** dashboard with DAX measures checked against SQL analyses and reference totals.

## Result

The `dbt build` passed all **3 models and 27 tests**, with no warnings or errors. The mart's **76 rows** cover 19 zones for each year and round combination, with reproduction verified in a separate dataset.

The analysis found that the Federal District's runoff abstention rate fell from **18.92% to 16.72%** between 2018 and 2022, a reduction of **2.20 percentage points**. Within the 2022 runoff, zone-level rates ranged from 14.95% to 18.60%.

The repository includes SQL models, tests, documentation, reproduction instructions, and the Power BI project in **PBIP** format, with a PBIR report and TMDL model. Screenshots make the dashboard accessible without authentication.

## Scope and limitations

The project uses a source already published in BigQuery; custom ingestion, orchestration, and automatic refresh are left for a future version. Findings are descriptive and do not attribute causes to changes in participation. Individual zones are not compared across years because territorial continuity has not been verified.

An independent project with no institutional affiliation with the TSE.
