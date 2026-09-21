---
title: NovaCasa People Analytics Case Study
summary: An analysis of 603 departures at a retail chain found that 48% occurred within the first 90 days, leading to a Power BI dashboard and 3 recommendations for HR.
category: [dados]
cover: ../../assets/projects/novacasa-people-analytics/logo-novacasa.png
gallery:
  - src: ../../assets/projects/novacasa-people-analytics/dashboard-power-bi.png
    alt: Power BI dashboard showing total departures, early turnover, retention curve, departures by state, reasons, and monthly trends
  - src: ../../assets/projects/novacasa-people-analytics/painel-operacional.png
    alt: Operational dashboard with dismissals for cause, average tenure, and rankings by reason and state
  - src: ../../assets/projects/novacasa-people-analytics/insights.png
    alt: Analytical insights section with the main findings from the case study
role: Data Analyst (individual case study)
period: Apr 2026
status: concluido
private: false
metrics:
  - { value: "603", label: "employee departures analyzed" }
  - { value: "48%", label: "of departures in the first 90 days" }
  - { value: "371 days", label: "average employee tenure" }
  - { value: "5", label: "analytical views built with DAX" }
stack:
  - { name: Python, role: "Cleaning the employee departure dataset" }
  - { name: Pandas, role: "Exploratory analysis of tenure, departure reasons, and trends over time" }
  - { name: Power BI, role: "Interactive dashboard for HR leadership" }
  - { name: DAX, role: "Measures for 5 views: reasons, volume by state, monthly trends, retention curve, and dismissals for cause" }
links:
  repo: https://github.com/deyv7/Case-People-Analytics-NovaCasa
  pdf: https://github.com/deyv7/Case-People-Analytics-NovaCasa/blob/main/NovaCasa_PeopleAnalytics.pdf
order: 1
---

## Problem

A retail chain was losing employees and needed to understand why: the reasons for leaving, where departures were concentrated, and at what point in their employment people left.

## Solution

- I cleaned and explored a dataset of **603 employee departures** using Python and Pandas.
- I built the Power BI model and wrote DAX measures for five views: **departure reasons, volume by state, monthly trends, retention curve, and dismissals for cause**.
- I organized the dashboard as a narrative, moving from the overall picture to the specific breakdowns that explain the problem.

## Result

The analysis showed that **48% of departures occurred within the first 90 days**, even though average tenure was 371 days. The issue was concentrated at the start of employment rather than later on.

This finding led to **3 recommendations** delivered to HR leadership. The `.pbix` file and PDF report are publicly available in the repository.
