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

// Cenário de carga para autenticação (login)
import './run.login.js';

// Cenário de carga para consulta de produtos
import './run.produto.get.js';