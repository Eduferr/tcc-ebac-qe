// Importa a função expect da biblioteca Chai para asserções
const { expect } = require('chai');

// ======================================================
// Helper de validação de contrato de Cupom
// ======================================================

// Função responsável por validar se o objeto "cupom" está de acordo com o schema esperado
function validarContratoCupom(cupom, schema) {
    // Percorre todos os campos definidos no schema
    Object.keys(schema).forEach((campo) => {
        // Verifica se o campo existe no objeto retornado pela API
        expect(cupom).to.have.property(campo);
        // Verifica se o tipo do campo corresponde ao tipo esperado no schema
        expect(typeof cupom[campo]).to.eq(schema[campo]);
    });
}

// Exporta a função para uso nos steps e validações de contrato
module.exports = { validarContratoCupom };