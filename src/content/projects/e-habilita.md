---
title: E-Habilita
summary: Plataforma que liga alunos a instrutores de direção autônomos. Publicada em fase beta, com pagamento guardado até a aula acontecer, GPS ao vivo durante a aula e checagem de antecedentes do instrutor.
category: [software, dados, ia]
cover: ../../assets/projects/e-habilita/logo-capa.png
gallery:
  - src: ../../assets/projects/e-habilita/hero.jpg
    alt: Página inicial, com a busca de instrutores por bairro ou cidade
  - src: ../../assets/projects/e-habilita/como-funciona.jpg
    alt: Como funciona em três passos, da busca pelo bairro até a aula com rota ao vivo
  - src: ../../assets/projects/e-habilita/instrutores.jpg
    alt: Lista de instrutores com carro, avaliação e preço por hora (nomes e fotos ocultados)
  - src: ../../assets/projects/e-habilita/para-instrutores.jpg
    alt: Área para instrutores, com calculadora de ganhos após a taxa de processamento
  - src: ../../assets/projects/e-habilita/duvidas.jpg
    alt: Dúvidas frequentes sobre CNH, pagamento, cancelamento e LADV
role: Fundador e Dev Full-Stack
period: 2024 — atual
status: no-ar
private: true
metrics:
  - { value: "~20", label: "tabelas PostgreSQL usadas pelo código" }
  - { value: "40", label: "rotas de API na aplicação web" }
  - { value: "Web + app", label: "Next.js no navegador, Expo no celular" }
  - { value: "73", label: "testes automatizados rodando no CI" }
stack:
  - { name: Next.js 16 + React 19, role: "Aplicação web com App Router, rotas de API e painéis de aluno, instrutor e administração" }
  - { name: Expo / React Native, role: "App mobile com câmera, GPS, mapas e notificações, sobre o mesmo Supabase" }
  - { name: Supabase + PostgreSQL, role: "Auth, Storage, Realtime e RLS, com funções SQL para o saque e a liberação de saldo" }
  - { name: MercadoPago, role: "Checkout e webhook com assinatura conferida, sem processar o mesmo pagamento duas vezes" }
  - { name: TensorFlow.js (BlazeFace), role: "Detecção de rosto na foto de perfil do instrutor" }
  - { name: TypeScript, role: "Tipagem de ponta a ponta na web e no app" }
  - { name: Tailwind CSS v4, role: "Interface da aplicação web" }
  - { name: Sentry, role: "Monitoramento de erros na web, no app e no serviço de IA" }
  - { name: GitHub Actions, role: "Testes e checagem de tipos em todo PR, e deploy na Vercel" }
links:
  demo: https://e-habilita.com.br
related: [ai-ehabilita]
order: 2
---

## Problema

Conectar quem quer tirar a habilitação a um instrutor de trânsito envolve quatro coisas ao mesmo tempo: **confiança** (quem é esse instrutor?), **agenda**, **pagamento** e **acompanhamento da aula**. Resolver só uma delas não basta.

## Solução

Fundei a plataforma e escrevi a maior parte do código. No repositório web, 497 dos 578 commits da branch principal são meus.

- **Pagamento guardado até a aula:** integrei o Mercado Pago. O webhook confere a assinatura do cabeçalho, ignora pagamento que já foi processado e consulta o pagamento na API antes de registrar. O valor entra como pendente na carteira do instrutor e só é liberado depois da aula. As contas da taxa são feitas em centavos inteiros.
- **Aula:** início e fim são confirmados com códigos de 4 dígitos, e a conclusão exige pelo menos 30 minutos de aula. O app do instrutor transmite o GPS ao vivo pelo Supabase Realtime, e a família acompanha por um link, sem precisar de conta.
- **Saque:** o débito roda numa função SQL que trava a linha da carteira, para dois pedidos ao mesmo tempo não usarem o mesmo saldo.
- **Confiança:** a foto do instrutor só é aceita quando o BlazeFace encontra um rosto com 97% de confiança ou mais. A certidão de antecedentes passa pelo serviço de IA, que confere o código na API do TJDFT.
- **Dados:** cerca de 20 tabelas no PostgreSQL do Supabase, com políticas de RLS e funções SQL chamadas pela API.
- **Segurança e testes:** revisei a autorização das rotas que usam a chave de serviço do Supabase e as políticas de RLS das tabelas com dados sensíveis. Os 73 testes cobrem a autorização das rotas sensíveis e a recuperação de senha, e rodam no CI com a checagem de tipos.
- **Canais:** site em Next.js com painéis de aluno, instrutor e administração, e app em Expo.

## Resultado

A plataforma está publicada em e-habilita.com.br, em fase beta e ainda sem usuários, com os erros monitorados pelo Sentry. O app ainda não está na Play Store. A checagem de antecedentes e o chat de suporte rodam num serviço de IA separado, descrito no projeto relacionado.

Os próximos passos são juntar numa regra só as duas formas de concluir a aula, limitar as tentativas do código da aula e levar para o banco as contas de saldo que ainda são feitas na aplicação.
