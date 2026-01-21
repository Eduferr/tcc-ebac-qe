// ======================================================
// Arquivo orquestrador de testes de performance (k6)
// ------------------------------------------------------
// Responsável apenas por importar e registrar todos os cenários de performance do projeto.
//
// Vantagens desta abordagem:
// - Compatível com grafana/k6-action (CI/CD)
// - Centraliza a execução dos testes de performance
// - Facilita manutenção e escalabilidade
// - Evita erros ao tentar executar múltiplos arquivos diretamente no GitHub Actions
// ======================================================

// Importação dos cenários
import './run.us005_login.js';
import './run.us005_produto.get.js';

// ------------------------------------------------------
// Função default obrigatória do k6
// Os cenários reais são definidos nos arquivos importados
// ------------------------------------------------------
export default function () {
  // Execução controlada exclusivamente via scenarios
}
