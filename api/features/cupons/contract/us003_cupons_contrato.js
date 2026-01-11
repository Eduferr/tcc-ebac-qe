// Importa o step Then do Cucumber (BDD)
const { Given, When, Then } = require('@cucumber/cucumber');
// Importa o expect do Chai para asserções
const { expect } = require('chai');
// Importa o helper responsável por validar o contrato do cupom
const { validarContratoCupom } = require('../../../helpers/contratoCupom.helper');
// Importa o schema esperado do cupom (JSON Schema)
const { cupomSchema } = require('../../../schemas/cupom.schema');

let response; // Variável para armazenar a resposta da API
let authType; // Variável para armazenar o tipo de autenticação utilizado no cenário

// ================================
// STEPS - GIVEN (Pré-condições)
// ================================

Given('que o admin realiza a requisição com autenticação {word}', function (tipoAuth) {
    // Armazena o tipo de autenticação em variável local
    authType = tipoAuth;

    // Armazena também no contexto do cenário (this),
    // permitindo reutilização em outros steps
    this.authType = tipoAuth;
  }
);

Given('que o admin está autenticado na API', function () {
  // Define o tipo de autenticação como válida no contexto do cenário
  this.authType = 'valida';
});

// ================================
// STEPS - WHEN (Ações)
// ================================

When('realizar a requisição de listagem de cupons', async function () {
  // Chama o service de listagem passando o tipo de autenticação
  response = await CuponsService.listarCupons(this.authType);

  // Armazena a resposta no contexto do cenário
  this.response = response;
});

When('realizar o cadastro de um novo cupom', async function () {
  // Chama o service de criação de cupom passando o tipo de autenticação
  response = await CuponsService.criarCupom(this.authType);

  // Armazena a resposta no contexto do cenário
  this.response = response;
});

// ======================================================
// STEPS - THEN (Validações / Asserções)
// ======================================================

Then('o contrato do cupom retornado no GET deve estar de acordo com o esperado', function () {
    // Valida o status HTTP esperado para listagem de cupons
    expect(this.response.status).to.eq(200);

    // Valida o contrato do primeiro item retornado na lista
    // (estrutura, tipos e campos obrigatórios)
    validarContratoCupom(this.response.body[0], cupomSchema);
  }
);

Then('o contrato do cupom retornado no POST deve estar de acordo com o esperado', function () {
    // Valida o status HTTP esperado para criação de cupom
    expect(this.response.status).to.eq(201);

    // Valida o contrato do cupom criado
    validarContratoCupom(this.response.body, cupomSchema);
  }
);
