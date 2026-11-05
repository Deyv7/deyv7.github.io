---
title: O caminho até um acidente grave
summary: Pipeline bronze, silver e gold no Databricks com Spark e Delta Lake sobre os acidentes nas rodovias federais, com testes de qualidade que param o pipeline, e uma página que conta a análise como uma viagem que termina numa batida.
category: [dados]
cover: ../../assets/projects/acidentes-prf/capa.png
disclaimer: Projeto independente de Deyvid Prado, sem vínculo com a Polícia Rodoviária Federal.
gallery:
  - src: ../../assets/projects/acidentes-prf/mapa.png
    alt: Parada "O lugar" com o mapa do Brasil em quadrados de 0,5 grau coloridos pela comparação com a média e a proporção de graves por UF com intervalo de 95%, do Maranhão ao Distrito Federal
  - src: ../../assets/projects/acidentes-prf/chuva.png
    alt: Parada "O tempo" com chuva caindo sobre a cena e o gráfico da proporção de graves por condição do tempo, com chuva abaixo da média e céu claro acima
  - src: ../../assets/projects/acidentes-prf/contramao.png
    alt: Parada "A causa" com as 12 causas de maior proporção de graves e um carro vermelho vindo pela contramão na estrada embaixo do card
  - src: ../../assets/projects/acidentes-prf/batida.png
    alt: Parada "O impacto" no instante da batida frontal, com os dois carros tortos e estilhaços sobre a estrada, ao lado da proporção de graves por tipo de acidente
  - src: ../../assets/projects/acidentes-prf/explorador.png
    alt: Explorador com os trechos de 10 km ordenados pelo limite inferior do intervalo, com acidentes, graves, proporção, intervalo de 95% e comparação com a média
role: Engenharia e Análise de Dados (projeto individual)
period: nov 2026
status: no-ar
private: false
metrics:
  - { value: "473.813", label: "acidentes analisados de 2019 a 2025" }
  - { value: "152", label: "testes com Spark local" }
  - { value: "13", label: "regras de qualidade rodando no pipeline" }
  - { value: "28,0%", label: "dos acidentes foram graves" }
stack:
  - { name: Databricks, role: "Free Edition com computação serverless, Unity Catalog, volumes e um job de quatro tarefas" }
  - { name: Apache Spark, role: "Leitura, tipagem, deduplicação e agregação com PySpark 4.0.1" }
  - { name: Delta Lake, role: "Camadas bronze, silver e gold, com a bronze acumulativa" }
  - { name: Python, role: "Lógica em funções puras em src/; os notebooks só chamam essas funções" }
  - { name: pytest, role: "152 testes com Spark e Delta locais, rodando num container sem rede" }
  - { name: Docker, role: "Ambiente de testes e execução local igual ao do Databricks" }
  - { name: GSAP, role: "ScrollTrigger fixa a seção e move os cards na horizontal com a rolagem" }
  - { name: Vite, role: "Build da página, que lê os JSON exportados de resultados/" }
  - { name: GitHub Actions, role: "Publicação da página no GitHub Pages a cada mudança" }
links:
  demo: https://deyv7.github.io/acidentes-prf/
  repo: https://github.com/Deyv7/acidentes-prf
related: [abstencao-eleitoral, eleicoes-em-dados]
order: -2
---

## Problema

Quando acontece um acidente numa rodovia federal, o que torna mais provável que ele seja grave? Grave, aqui, é o acidente com pelo menos um morto ou ferido grave.

A fonte da PRF não traz o volume de tráfego, então contar acidentes não mede risco: a BR-101 lidera em número de graves, mas a proporção de graves nela fica abaixo da média. A medida usada é a proporção de graves entre os acidentes de cada recorte, com intervalo de confiança de 95%.

O dado também tem armadilhas: uma quebra na série em abril de 2018, ids escritos em notação científica (`1e+05`), a troca da lista de causas em janeiro de 2021 e um acidente real em Fernando de Noronha que uma caixa simples de coordenadas descartaria.

## Solução

- Montei um pipeline **bronze, silver e gold** em **Delta Lake** no **Databricks Free Edition**, com Unity Catalog, volumes e um job de quatro tarefas. A bronze é acumulativa e a silver usa a ingestão mais recente de cada arquivo.
- Deixei a lógica em funções puras em `src/`, testadas com **152 testes** em Spark local num container. Os notebooks só chamam essas funções, e o código chega ao Databricks como um wheel.
- Escrevi **13 regras de qualidade** que rodam no pipeline. As bloqueantes (id nulo ou repetido, data fora do ano, classificação que contradiz mortos e feridos) param o pipeline; as outras têm tratamento documentado.
- Rodei tudo no Databricks e localmente, e um script compara as duas execuções: os números batem em todas as tabelas.
- Comparei cada recorte com a média pelo **intervalo de 95% de Wilson** e ordenei pelo limite inferior, para um lugar com 3 acidentes e 3 graves não ficar em primeiro. Toda comparação foi repetida só entre acidentes com vítima.
- Fiz uma **página narrada** em que os cards passam na horizontal sobre uma estrada que anoitece, pega chuva e termina numa batida na contramão. Nenhum número é escrito à mão: um exportador lê `resultados/` e grava os JSON da página.

## Resultado

De 2019 a 2025 foram **473.813** acidentes, e **28,0%** deles foram graves. No Maranhão, 45,2%; em São Paulo, 18,5%. Das 24 UFs fora da média, 23 ficam do mesmo lado na conta só com vítima, então a diferença regional não vem só do registro de acidentes leves.

As 12 horas entre 18h e 5h ficam acima da média, e as 12 entre 6h e 17h, abaixo. Na pista simples, 33,3% dos acidentes são graves, contra 23,1% na dupla.

A segunda conta mudou uma conclusão: a ingestão de álcool pelo condutor tem 20,8% de graves entre todos os acidentes, abaixo da média, e 35,2% entre os com vítima, acima dela.

## Escopo e cuidados

Sem volume de tráfego, a proporção mede a gravidade dos acidentes que aconteceram, e não o risco de dirigir num lugar. A análise olha um fator de cada vez e não separa o efeito da noite do efeito da pista simples ou da região; a tabela da gold para um modelo de gravidade já está pronta, sem nenhuma coluna de desfecho.

Projeto independente, sem vínculo com a Polícia Rodoviária Federal.
