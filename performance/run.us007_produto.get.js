import produtoScenario from './scenarios/us006_produto.get.js';
import { produtoOptions } from './config/produto.options.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.4/index.js';

export const options = produtoOptions;

// CT-PERF-PRODUTO-001
export default function () {
  produtoScenario();
}

export function handleSummary(data) {
  return {
    'performance/reports/produto/produto-report.html': htmlReport(data),
    'performance/reports/produto/produto-summary.json': JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
