/* 
 * Gera um código de cupom dinâmico para uso em testes automatizados.
 * Combina um nome base com um número aleatório, evitando duplicidade
 * no cadastro de cupons durante a execução dos testes.
 */

function gerarCodigoCupom(nomeBase = 'cupom') {
  // Gera um número aleatório entre 0 e 999
  const numero = Math.floor(Math.random() * 1000);
  // Retorna o código do cupom concatenando o nome base com o número gerado - Exemplo: cupom123
  return `${nomeBase}${numero}`;
}

module.exports = { gerarCodigoCupom };
