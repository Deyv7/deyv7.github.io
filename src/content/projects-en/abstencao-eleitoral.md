---
title: What explains abstention
summary: Abstention in the first round of Brazil's 2022 election across all 5,570 municipalities, analyzed with regression, machine learning, and spatial dependence, and told on a three.js page where each municipality is a point.
category: [dados]
cover: ../../assets/projects/abstencao-eleitoral/capa.png
disclaimer: Independent project by Deyvid Prado, with no institutional affiliation with the TSE or IBGE.
gallery:
  - src: ../../assets/projects/abstencao-eleitoral/picos.png
    alt: Perspective map of Brazil where each municipality is a point and its height shows the abstention rate, with the three highest peaks labeled
  - src: ../../assets/projects/abstencao-eleitoral/painel-estado.png
    alt: Rio Grande do Norte panel opened by clicking a municipality, showing the state rate, its rank among the 27 federative units, and the distribution of its municipalities
  - src: ../../assets/projects/abstencao-eleitoral/escolaridade.png
    alt: Scatter plot of each municipality's abstention against the share of voters who are illiterate or can only read and write, colored by region
  - src: ../../assets/projects/abstencao-eleitoral/vizinhos.png
    alt: Map with the average regression error of each municipality's 8 nearest neighbors, showing regional patches that cross state borders
role: Data Analysis and Data Science (individual project)
period: Nov 2026
status: no-ar
private: false
metrics:
  - { value: "5,570", label: "municipalities analyzed" }
  - { value: "27", label: "data tests passed" }
  - { value: "43%", label: "of the variation explained by the regression" }
  - { value: "0.48", label: "Moran's I on the model errors" }
stack:
  - { name: BigQuery, role: "Extraction of TSE and IBGE tables through Base dos Dados, with a dry run and a byte cap on every query" }
  - { name: Python, role: "Pipeline for extraction, features, analysis, and exporting the page data" }
  - { name: Pandas, role: "Aggregating electoral zones into municipalities and computing the features" }
  - { name: pytest, role: "Tests for filters, source reconciliation, coverage, and each municipality's position on the map" }
  - { name: statsmodels, role: "Linear regression with standard errors clustered by state" }
  - { name: scikit-learn, role: "Random forest and gradient boosting validated with whole states held out of training" }
  - { name: Streamlit, role: "App with a map, regression effects, and municipality search" }
  - { name: three.js, role: "Narrated page where the 5,570 points become a map, a relief, and charts" }
  - { name: GSAP, role: "Scene transitions driven by scrolling" }
  - { name: GitHub Actions, role: "Publishing the page to GitHub Pages on every change" }
links:
  demo: https://deyv7.github.io/abstencao-eleitoral/
  repo: https://github.com/Deyv7/abstencao-eleitoral
related: [eleicoes-em-dados]
order: -1
---

## Problem

In the first round of 2022, **20.79%** of eligible voters did not vote for president. Across municipalities the rate ranged from 8.82% in Bela Vista do Piauí (PI) to 40.56% in Rio Vermelho (MG). I wanted to know which municipal characteristics go along with that difference and how much of it the data can explain.

The source repeats eligible voters and turnout for each office and mixes in supplementary elections. Summed without a filter, the 2022 first round gives 778,687,320 eligible voters; with the office, round, and election type filter, 155,758,656.

## Solution

- I extracted voting by electoral zone, voter profile, GDP, population, and area for 2018 and 2022 from **BigQuery** (Base dos Dados). Every query runs a dry run first and has a byte cap. The whole project ran 34 jobs in the sandbox, with no billing.
- I wrote **27 tests** with pytest: extraction filter, uniqueness, municipality coverage, reconciliation with the source's municipal table, and whether each municipality's point falls inside its state outline, checked against the IBGE mesh.
- I fit a **linear regression** with standard errors clustered by state, because the errors of municipalities in the same state are correlated. With HC3, which assumes independent municipalities, four variables would have p < 0.05; with clustered errors, none of them does.
- I trained **random forest and gradient boosting** models and validated them by holding each whole state out of training, to measure accuracy on a state the model never saw.
- I measured the **spatial dependence** of the errors with Moran's I, using the 8 nearest neighbors and 999 permutations.
- I built a **narrated page in three.js**. Each municipality is a point, and as the page scrolls the points form the map, rise into a relief, and turn into charts. Clicking a point opens the state with its rate, its rank among the 27 federative units, and how much each municipality weighs in the total.

## Results

The regression explains **43%** of the variation between municipalities. The strongest association is schooling: from the 1st to the 3rd quartile of voters who are illiterate or can only read and write, abstention rises 3.5 points, holding the rest equal. With the same characteristics, the Northeast has 4.6 points less than the Southeast.

The tree model misses by **3.1 points** on average in a state it did not see in training, against 3.8 for always guessing the mean. The gain is modest: almost 70% of the variation stays unexplained in that setting.

The regression errors have a Moran's I of **0.48**; shuffling them 999 times, the highest value was 0.02. Neighbors in different states also miss together, which points to a regional pattern the variables do not measure.

## Scope and caveats

The results measure association between municipal characteristics and abstention. None of them shows cause, and the data describes municipalities, not individual voters. The project uses tables already published by Base dos Dados, without ingesting the original TSE files. Fernando de Noronha falls outside IBGE's simplified mesh and has its own label.

Independent project, with no institutional affiliation with the TSE or IBGE.
