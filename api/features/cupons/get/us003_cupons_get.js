// Importa os steps Given, When e Then do Cucumber (BDD)
const { Given, When, Then } = require('@cucumber/cucumber');
// Importa a biblioteca de asserções Chai
const { expect } = require('chai');
// Importa o service responsável pelas chamadas à API de Cupons
const CuponsService = require('../../../services/cupons.service');


// ======================================================
// STEPS - GIVEN (Pré-condições)
// ======================================================

Given('existe um cupom previamente cadastrado', async function () {
  // Realiza a criação de um cupom com autenticação válida
  const res = await CuponsService.criarCupom('valida');
  this.cupomId = res.body.id;
});

// ======================================================
// STEPS - WHEN (Ações)
// ======================================================

When('realizar a requisição de consulta de cupom por ID', async function () {
    // Chama o service passando o ID do cupom e o tipo de autenticação
    this.response = await CuponsService.buscarCupomPorId(
      this.cupomId,
      this.authType
    );
  }
);

// ======================================================
// STEPS - THEN (Validações / Asserções)
// ======================================================

Then('a API deve retornar a lista de cupons com sucesso', function () {
  // Valida o status HTTP de sucesso
  expect(this.response.status).to.eq(200);
  // Valida que o corpo da resposta é uma lista (array)
  expect(this.response.body).to.be.an('array');
});

Then('a API deve retornar os dados do cupom consultado com sucesso', function () {
    // Valida o status HTTP esperado
    expect(this.response.status).to.eq(200);
    // Valida que o ID retornado corresponde ao cupom criado previamente
    expect(this.response.body.id).to.eq(this.cupomId);
  }
);

Then('o acesso à listagem de cupons deve ser bloqueado', function () {
  // Valida que a API retorna erro de autenticação ou erro interno
  expect([401, 500]).to.include(this.response.status);
});
