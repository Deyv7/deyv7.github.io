---
title: O que explica a abstenção
summary: A abstenção do 1º turno de 2022 nos 5.570 municípios do Brasil, analisada com regressão, aprendizado de máquina e dependência espacial, e contada numa página em three.js em que cada município é um ponto.
category: [dados]
cover: ../../assets/projects/abstencao-eleitoral/capa.png
disclaimer: Projeto independente de Deyvid Prado, sem vínculo institucional com o TSE ou o IBGE.
gallery:
  - src: ../../assets/projects/abstencao-eleitoral/picos.png
    alt: Mapa do Brasil em perspectiva em que cada município é um ponto e a altura mostra a taxa de abstenção, com os três maiores picos identificados
  - src: ../../assets/projects/abstencao-eleitoral/painel-estado.png
    alt: Painel do Rio Grande do Norte aberto ao clicar num município, com a taxa do estado, a posição entre as 27 unidades da federação e a distribuição dos municípios
  - src: ../../assets/projects/abstencao-eleitoral/escolaridade.png
    alt: Gráfico de dispersão com a abstenção de cada município contra a parte do eleitorado analfabeta ou que só lê e escreve, colorido por região
  - src: ../../assets/projects/abstencao-eleitoral/vizinhos.png
    alt: Mapa com a média do erro da regressão nos 8 vizinhos mais próximos de cada município, mostrando manchas regionais que atravessam as divisas
role: Análise de Dados e Ciência de Dados (projeto individual)
period: nov 2026
status: no-ar
private: false
metrics:
  - { value: "5.570", label: "municípios analisados" }
  - { value: "27", label: "testes de dados aprovados" }
  - { value: "43%", label: "da variação explicada pela regressão" }
  - { value: "0,48", label: "de I de Moran nos erros do modelo" }
stack:
  - { name: BigQuery, role: "Extração das tabelas do TSE e do IBGE pela Base dos Dados, com dry run e teto de bytes em cada consulta" }
  - { name: Python, role: "Pipeline de extração, variáveis, análise e exportação dos dados da página" }
  - { name: Pandas, role: "Agregação das zonas por município e cálculo das variáveis" }
  - { name: pytest, role: "Testes de filtro, conciliação com a fonte, cobertura e posição de cada município no mapa" }
  - { name: statsmodels, role: "Regressão linear com erro padrão agrupado por estado" }
  - { name: scikit-learn, role: "Random forest e gradient boosting validados com o estado inteiro fora do treino" }
  - { name: Streamlit, role: "App com mapa, efeitos da regressão e busca por município" }
  - { name: three.js, role: "Página narrada em que os 5.570 pontos viram mapa, relevo e gráficos" }
  - { name: GSAP, role: "Transições da cena controladas pela rolagem" }
  - { name: GitHub Actions, role: "Publicação da página no GitHub Pages a cada mudança" }
links:
  demo: https://deyv7.github.io/abstencao-eleitoral/
  repo: https://github.com/Deyv7/abstencao-eleitoral
related: [acidentes-prf, eleicoes-em-dados]
order: -1
---

## Problema

No 1º turno de 2022, **20,79%** dos eleitores aptos não votaram para presidente. Entre municípios a taxa foi de 8,82% em Bela Vista do Piauí (PI) a 40,56% em Rio Vermelho (MG). Quis saber que características do município acompanham essa diferença e até onde os dados conseguem explicá-la.

A fonte repete aptos e comparecimento para cada cargo e mistura eleições suplementares. Somando sem filtro, o 1º turno de 2022 dá 778.687.320 aptos; com o filtro de cargo, turno e tipo de eleição, 155.758.656.

## Solução

- Extraí do **BigQuery** (Base dos Dados) votação por zona, perfil do eleitorado, PIB, população e área de 2018 e 2022. Cada consulta passa por dry run e tem teto de bytes. O projeto inteiro rodou 34 jobs no sandbox, sem faturamento.
- Escrevi **27 testes** com pytest: filtro da extração, unicidade, cobertura dos municípios, conciliação com a tabela municipal da fonte e se o ponto de cada município cai dentro do contorno do seu estado, conferido com a malha do IBGE.
- Ajustei uma **regressão linear** com erro padrão agrupado por estado, porque os erros de municípios do mesmo estado são correlacionados. Com o HC3, que supõe municípios independentes, quatro variáveis teriam p < 0,05; com o erro agrupado, nenhuma delas tem.
- Treinei **random forest e gradient boosting** e validei deixando cada estado inteiro fora do treino, para medir o acerto num estado que o modelo nunca viu.
- Medi a **dependência espacial** dos erros com o I de Moran, usando os 8 vizinhos mais próximos e 999 permutações.
- Montei uma **página narrada em three.js**. Cada município é um ponto, e conforme a página rola os pontos formam o mapa, ganham relevo e viram gráficos. Clicar num ponto abre o estado com a taxa, a posição entre as 27 unidades da federação e o peso de cada município na conta.

## Resultado

A regressão explica **43%** da variação entre municípios. A associação mais forte é a escolaridade: do 1º ao 3º quartil de eleitores analfabetos ou que só leem e escrevem, a abstenção sobe 3,5 pontos, com o resto igual. Com as mesmas características, o Nordeste tem 4,6 pontos a menos que o Sudeste.

O modelo de árvores erra em média **3,1 pontos** num estado que não viu no treino, contra 3,8 de quem chuta a média. O ganho é modesto: quase 70% da variação fica sem explicação nesse cenário.

Os erros da regressão têm I de Moran de **0,48**; embaralhando 999 vezes, o maior valor foi 0,02. Vizinhos de estados diferentes também erram juntos, o que aponta um padrão regional que as variáveis não medem.

## Escopo e cuidados

Os resultados medem associação entre características do município e abstenção. Nenhum deles mostra causa, e o dado é do município, não do eleitor. O projeto usa tabelas já publicadas pela Base dos Dados, sem ingestão dos arquivos originais do TSE.

Projeto independente, sem vínculo institucional com o TSE ou o IBGE.
