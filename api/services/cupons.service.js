// Importa a biblioteca Supertest para realização de requisições HTTP
const request = require('supertest');
// Importa as configurações da API (baseUrl e credenciais)
const { API_CONFIG } = require('../config/api.config');
// Importa utilitário para geração de códigos de cupom dinâmicos
const { gerarCodigoCupom } = require('../utils/random');

// ======================================================
// Service responsável pelas operações da API de Cupons
// ======================================================

class CuponsService {
  // --------------------------------------------------
  // Monta os headers de acordo com o tipo de autenticação
  // --------------------------------------------------
  static getHeaders(tipoAuth = 'valida') {
    // Simula autenticação inválida
    if (tipoAuth === 'invalida') {
      return { Authorization: 'Basic token_invalido' };
    }

    // Simula requisição sem autenticação
    if (tipoAuth === 'sem_auth') {
      return {};
    }

    // Autenticação válida (padrão)
    return {
      Authorization: `Basic ${API_CONFIG.auth}`,
      accept: 'application/json'
    };
  }

  // --------------------------------------------------
  // GET /coupons - Lista todos os cupons
  // --------------------------------------------------
  static listarCupons(tipoAuth = 'valida') {
    return request(API_CONFIG.baseUrl)
      .get('/wp-json/wc/v3/coupons')
      .set(this.getHeaders(tipoAuth));
  }

  // --------------------------------------------------
  // GET /coupons/{id} - Consulta cupom por ID
  // --------------------------------------------------
  static buscarCupomPorId(id, tipoAuth = 'valida') {
    return request(API_CONFIG.baseUrl)
      .get(`/wp-json/wc/v3/coupons/${id}`)
      .set(this.getHeaders(tipoAuth));
  }

  // --------------------------------------------------
  // POST /coupons - Cria um cupom com dados padrão
  // --------------------------------------------------
  static criarCupom(tipoAuth = 'valida') {
    return request(API_CONFIG.baseUrl)
      .post('/wp-json/wc/v3/coupons')
      .set(this.getHeaders(tipoAuth))
      .send({
        code: gerarCodigoCupom('cupomEdu'),
        amount: '10.00',
        discount_type: 'fixed_product',
        description: 'Cupom criado via teste automatizado'
      });
  }

  // --------------------------------------------------
  // POST /coupons - Cria um cupom com body customizado
  // --------------------------------------------------
  static criarCupomComBody(body, tipoAuth = 'valida') {
    return request(API_CONFIG.baseUrl)
      .post('/wp-json/wc/v3/coupons')
      .set(this.getHeaders(tipoAuth))
      .send(body);
  }

  // --------------------------------------------------
  // POST /coupons - Cria cupom baseado em regras de negócio
  // --------------------------------------------------
  static criarCupomComRegrasDeNegocio(data) {
    const body = {};

    // Gera código dinâmico quando indicado pela DataTable
    if (data.code === 'DINAMICO') {
      body.code = gerarCodigoCupom('cupomEduFerr');
    }

    // Preenche os campos conforme informado no cenário
    if (data.amount) body.amount = data.amount;
    if (data.discount_type) body.discount_type = data.discount_type;
    if (data.description) body.description = data.description;

    // Reutiliza o método de criação com body customizado
    return this.criarCupomComBody(body);
  }
}
module.exports = CuponsService;
