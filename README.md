# TCC-EBAC-QE – Projeto de Qualidade de Software

## 📌 Visão Geral

Este repositório contém o **Trabalho de Conclusão de Curso (TCC)** do curso **Engenheiro de Qualidade de Software (QE)** da **EBAC**.  
O projeto tem como objetivo demonstrar, de forma prática e estruturada, a aplicação de **testes automatizados funcionais e não funcionais**, contemplando diferentes camadas de teste (**UI, API, Mobile e Performance**), integradas a um fluxo de **Integração Contínua (CI/CD)** com **GitHub Actions**.

O sistema testado é um **e-commerce fictício (EBAC Shop)**, no qual foram definidas histórias de usuário, critérios de aceitação e alguns cenários de teste escritos em **BDD (Behavior Driven Development)**, utilizando Gherkin.

---

## 🎯 Objetivos do Projeto

- Aplicar conceitos de **Qualidade de Software** na prática
- Implementar **testes automatizados** em múltiplas camadas
- Utilizar **BDD com Cucumber/Gherkin**
- Organizar um projeto escalável e manutenível
- Executar testes em ambiente **local e CI/CD**
- Gerar **relatórios automatizados**
- Consolidar conhecimentos adquiridos ao longo do curso EBAC

---

## 🧪 Tipos de Testes Implementados

- Testes de Interface (UI)
- Testes de API
- Testes Mobile
- Testes de Performance
- Testes Integrados ao CI/CD

---

## 🛠️ Tecnologias e Ferramentas Utilizadas
```bash
| Camada / Finalidade  | Tecnologias                                                      |
| -------------------- | ---------------------------------------------------------------- |
| UI e Mobile      | Cypress · Cucumber · Mocha · Chai · Faker / @faker-js/faker · dotenv |
| API              | Supertest · Cucumber · Chai · Schemas de contrato · Faker · Node. js |
| Performance      | k6 · Testes de carga                                                 |
| Mobile           | Cypress · Cucumber                                                   |
| Relatórios       | Allure Reports (UI, API, Mobile) · Relatórios HTML do k6             |
| DevOps e Apoio   | GitHub Actions · Allure Commandline · Rimraf · HTML · CSS            |
```
---

## 📁 Estrutura do Projeto
```bash
TCC-EBAC-QE
├── .github
│
├── allure
│
├── api
│
├── mobile
│
├── performance
│
├── ui_cypress
│
├── node_modules
│
├── .env
├── .env.example
├── .gitignore
├── cucumber.js
├── cypress.config.js
├── wdio.conf.js
├── package.json
├── package-lock.json
└── README.md
```
---

## 🧩 Camadas de Teste

### 🔹 Testes de API (Supertest + Cucumber)

- Estrutura baseada em **features**
- Separação por tipo de operação (GET, POST, Contract)
- Validação de contrato via **schemas**
- Serviços reutilizáveis
- Geração dinâmica de dados
- Independência da camada de UI

---

### 🔹 Testes de UI (Cypress + Cucumber)

- Escritos em **BDD (Gherkin)**
- Padrão **Page Objects + Actions**
- Uso de `fixtures` para dados de teste
- Testes de login e carrinho
- Boa legibilidade e reutilização de código
- Relatórios gerados com **Allure**

---

### 🔹 Testes Mobile (Cypress + Cucumber)

- Estrutura preparada para testes mobile
- Execução realizada apenas em ambiente local
- Relatórios via **Allure**
- Não integrado ao CI/CD devido à instabilidade do aplicativo

---

### 🔹 Testes de Performance (k6)

- Cenários de:
  - Login
  - Consulta de produtos
- Configurações independentes por cenário
- Relatórios HTML gerados pelo k6
- Avaliação de tempo de resposta e estabilidade básica

---

## 🔄 Integração Contínua (CI/CD)

O projeto utiliza **GitHub Actions** para:

- Execução automática dos testes de:
  - UI
  - API
  - Performance
- Geração automática de relatórios
- Publicação de evidências
- Identificação de falhas específicas do ambiente de CI

> ⚠️ Observação:  
> Alguns testes de UI apresentaram divergência entre ambiente local e GitHub Actions, especialmente nos fluxos de carrinho, evidenciando a importância da validação em múltiplos ambientes.

---

## 📊 Relatórios

- **Allure Reports**
  - UI
  - API
  - Mobile
- **Relatórios HTML do k6**
  - Performance

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos

- Node.js (versão recomendada: 20 ou superior)

---

## ✍️ Assinatura do QA

**Eduardo Ferreira**
🌐 [LinkedIn – Eduardo Ferreira](https://www.linkedin.com/in/edufgs/)  
📅 Projeto desenvolvido para fins educacionais e de prática em automação de testes.

---