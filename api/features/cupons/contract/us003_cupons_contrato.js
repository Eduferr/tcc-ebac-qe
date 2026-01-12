// Imports do Cucumber (BDD)
const { Given, When, Then } = require('@cucumber/cucumber');
// Biblioteca de asserções
const { expect } = require('chai');
// Camada de serviço (requisições HTTP)
const CuponsService = require('../../services/cupons.service');
// Helpers e Schemas de contrato
const { validarContratoCupom } = require('../../../helpers/contratoCupom.helper');
const { cupomSchema } = require('../../../schemas/cupom.schema');

// ------------------------------------------------------
// Variáveis de apoio (escopo do cenário)
// ------------------------------------------------------
let response;

// ======================================================
// STEPS - GIVEN (Pré-condições)
// ======================================================

Given( 'que o admin realiza a requisição com autenticação {word}', function (tipoAuth) {
    // Armazena no contexto do cenário (this)
    // Essencial para compartilhamento entre steps
    this.authType = tipoAuth;
  }
);

/**
 * Define autenticação válida como padrão
 * Utilizado em cenários positivos
 */
Given('que o admin está autenticado na API', function () {
  this.authType = 'valida';
});

// ======================================================
// STEPS - WHEN (Ações)
// ======================================================

/**
 * Executa a requisição GET de listagem de cupons
 */
When('realizar a requisição de listagem de cupons', async function () {
  // Executa a chamada à API responsável por listar os cupons (método GET)
  // A requisição utiliza o tipo de autenticação definido previamente no Given
  response = await CuponsService.listarCupons(this.authType);
  // Armazena a resposta no contexto do cenário
  this.response = response;
});


When('realizar o cadastro de um novo cupom', async function () {
  // Executa a chamada à API responsável por criar um novo cupom (POST)
  // A requisição é feita utilizando o tipo de autenticação definido no Given
  response = await CuponsService.criarCupom(this.authType);
  // Armazena a resposta no contexto do cenário
  this.response = response;
});

// ======================================================
// STEPS - THEN (Validações / Asserções)
// ======================================================

Then('o contrato do cupom retornado no GET deve estar de acordo com o esperado', function () {
    // Valida status HTTP
    expect(this.response.status).to.eq(200);
    // Valida o contrato do primeiro item retornado
    validarContratoCupom(this.response.body[0], cupomSchema);
  }
);

Then('o contrato do cupom retornado no POST deve estar de acordo com o esperado', function () {
    // Valida status HTTP
    expect(this.response.status).to.eq(201);
    // Valida o contrato do cupom criado
    validarContratoCupom(this.response.body, cupomSchema);
  }
);
