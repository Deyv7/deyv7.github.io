---
title: The road to a serious crash
summary: A bronze, silver, and gold pipeline on Databricks with Spark and Delta Lake over crashes on Brazil's federal highways, with quality checks that stop the pipeline, and a page that tells the analysis as a road trip ending in a head-on collision.
category: [dados]
cover: ../../assets/projects/acidentes-prf/capa.png
disclaimer: Independent project by Deyvid Prado, with no affiliation with the Federal Highway Police (PRF).
gallery:
  - src: ../../assets/projects/acidentes-prf/mapa.png
    alt: The "place" stop, with a map of Brazil in 0.5-degree squares colored by comparison with the average and the share of serious crashes by state with 95% intervals, from Maranhão to the Federal District
  - src: ../../assets/projects/acidentes-prf/chuva.png
    alt: The "weather" stop, with rain falling over the scene and a chart of the share of serious crashes by weather condition, with rain below the average and clear sky above it
  - src: ../../assets/projects/acidentes-prf/contramao.png
    alt: The "cause" stop, with the 12 causes with the highest share of serious crashes and a red car coming the wrong way on the road below the card
  - src: ../../assets/projects/acidentes-prf/batida.png
    alt: The "impact" stop at the moment of the head-on crash, with both cars twisted and glass on the road, next to the share of serious crashes by crash type
  - src: ../../assets/projects/acidentes-prf/explorador.png
    alt: Explorer with 10 km road segments ranked by the lower bound of the interval, showing crashes, serious crashes, share, 95% interval, and comparison with the average
role: Data Engineering and Analysis (individual project)
period: Nov 2026
status: no-ar
private: false
metrics:
  - { value: "473,813", label: "crashes analyzed from 2019 to 2025" }
  - { value: "152", label: "tests on local Spark" }
  - { value: "13", label: "quality rules running in the pipeline" }
  - { value: "28.0%", label: "of crashes were serious" }
stack:
  - { name: Databricks, role: "Free Edition with serverless compute, Unity Catalog, volumes, and a four-task job" }
  - { name: Apache Spark, role: "Reading, typing, deduplication, and aggregation with PySpark 4.0.1" }
  - { name: Delta Lake, role: "Bronze, silver, and gold layers, with an append-only bronze" }
  - { name: Python, role: "Logic in pure functions under src/; the notebooks only call them" }
  - { name: pytest, role: "152 tests with local Spark and Delta, running in a container with no network" }
  - { name: Docker, role: "Test and local run environment matching Databricks" }
  - { name: GSAP, role: "ScrollTrigger pins the section and moves the cards sideways as the page scrolls" }
  - { name: Vite, role: "Build of the page, which reads the JSON exported from resultados/" }
  - { name: GitHub Actions, role: "Publishing the page to GitHub Pages on every change" }
links:
  demo: https://deyv7.github.io/acidentes-prf/
  repo: https://github.com/Deyv7/acidentes-prf
related: [abstencao-eleitoral, eleicoes-em-dados]
order: -2
---

## Problem

When a crash happens on a federal highway, what makes it more likely to be serious? Serious here means at least one death or one seriously injured person.

The PRF data has no traffic volume, so counting crashes does not measure risk: BR-101 leads in the number of serious crashes, but its share of serious crashes is below the average. The measure used is the share of serious crashes within each slice, with a 95% confidence interval.

The data also has traps: a break in the series in April 2018, ids written in scientific notation (`1e+05`), a new list of causes in January 2021, and a real crash on Fernando de Noronha that a simple coordinate box would have thrown away.

## Solution

- Built a **bronze, silver, and gold** pipeline in **Delta Lake** on **Databricks Free Edition**, with Unity Catalog, volumes, and a four-task job. The bronze layer is append-only and the silver layer uses the latest ingestion of each file.
- Kept the logic in pure functions under `src/`, covered by **152 tests** on local Spark in a container. The notebooks only call those functions, and the code reaches Databricks as a wheel.
- Wrote **13 quality rules** that run in the pipeline. Blocking rules (null or repeated id, date outside the file's year, classification that contradicts deaths and injuries) stop the pipeline; the others have a documented treatment.
- Ran everything on Databricks and locally, and a script compares both runs: the numbers match in every table.
- Compared each slice with the average using the **95% Wilson interval** and ranked by its lower bound, so a place with 3 crashes and 3 serious ones does not come first. Every comparison was repeated among crashes with victims only.
- Made a **narrated page** where the cards slide sideways over a road that gets dark, gets rain, and ends in a head-on collision. No number is typed by hand: an exporter reads `resultados/` and writes the page's JSON.

## Result

From 2019 to 2025 there were **473,813** crashes, and **28.0%** of them were serious. In Maranhão, 45.2%; in São Paulo, 18.5%. Of the 24 states away from the average, 23 stay on the same side when counting only crashes with victims, so the regional gap does not come only from how minor crashes are recorded.

The 12 hours from 6 p.m. to 5 a.m. are above the average, and the 12 from 6 a.m. to 5 p.m. are below it. On undivided two-way roads, 33.3% of crashes are serious, against 23.1% on divided roads.

The second count changed one conclusion: driver alcohol use has 20.8% serious crashes among all crashes, below the average, and 35.2% among crashes with victims, above it.

## Scope and caveats

Without traffic volume, the share measures how serious the crashes that happened were, not the risk of driving somewhere. The analysis looks at one factor at a time and does not separate the effect of night from the effect of undivided roads or region; the gold table for a severity model is already built, with no outcome columns.

Independent project, with no affiliation with the Federal Highway Police.
