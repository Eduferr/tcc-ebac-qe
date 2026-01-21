// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// Objeto de configuração central da API
// Centraliza dados sensíveis e reutilizáveis
const API_CONFIG = {
  
  baseUrl: process.env.BASE_URL, // URL base da API (ex: https://api.exemplo.com)
  auth: process.env.BASIC_AUTH  // Credencial de autenticação básica
};

module.exports = { API_CONFIG };
