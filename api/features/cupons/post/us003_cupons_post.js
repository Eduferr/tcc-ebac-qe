// Importa os steps Given, When e Then do Cucumber (BDD)
const { Given, When, Then } = require('@cucumber/cucumber');
// Importa a biblioteca de asserções Chai
const { expect } = require('chai');
// Importa o service responsável pelas chamadas à API de Cupons
const CuponsService = require('../../../services/cupons.service');


// ======================================================
// STEPS - GIVEN (Pré-condições)
// ======================================================

Given('já existe um cupom cadastrado com o nome {string}', async function (codigo) {
    // Cria um cupom com dados válidos para garantir a pré-condição do cenário
    await CuponsService.criarCupomComBody({
      code: codigo,
      amount: '10.00',
      discount_type: 'fixed_product',
      description: 'Cupom previamente cadastrado'
    });
  }
);

// ======================================================
// STEPS - WHEN (Ações)
// ======================================================

When('tentar cadastrar um novo cupom com o mesmo nome {string}', async function (codigo) {
    // Utiliza o tipo de autenticação definido no contexto do cenário
    this.response = await CuponsService.criarCupomComBody(
      {
        code: codigo,
        amount: '15.00',
        discount_type: 'fixed_product'
      },
      this.authType
    );
  }
);

When('realizar o cadastro de um novo cupom com dados inválidos:', async function (dataTable) {
    // Converte a DataTable do Cucumber em objeto chave-valor para simular violações de regras de negócio
    this.response = await CuponsService.criarCupomComRegrasDeNegocio(
      dataTable.rowsHash()
    );
  }
);

// ======================================================
// STEPS - THEN (Validações / Asserções)
// ======================================================

Then('a API deve retornar o cupom criado com sucesso', function () {
  // Status HTTP esperado para criação bem-sucedida
  expect(this.response.status).to.eq(201);
});

Then('o cadastro de cupom deve ser bloqueado por autenticação inválida', function () {
  // A API pode retornar erro de autenticação ou erro interno
    expect([401, 500]).to.include(this.response.status);
  }
);

Then( 'a API deve retornar erro informando que o nome do cupom já existe', function () {
    // A API pode retornar erro de validação ou conflito
    expect([400, 409]).to.include(this.response.status);
  }
);

Then('a API deve retornar erro de validação no cadastro de cupom', function () {
    // A API pode retornar erro de validação semântica ou de regra de negócio
    expect([400, 422]).to.include(this.response.status);
  }
);