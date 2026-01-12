import CarrinhoPage from '../pageObjects/CarrinhoPage';

class CarrinhoActions {

  // =========================
  // Ações básicas
  // =========================
  buscarProduto(nome) {
    CarrinhoPage.searchInput().clear().type(nome);
    CarrinhoPage.searchButton().click();
  }

  verCarrinho() {
    cy.visit('/carrinho', { failOnStatusCode: false });

    cy.location('pathname', { timeout: 15000 })
      .should('include', '/carrinho');

    cy.get('form.woocommerce-cart-form', { timeout: 15000 })
      .should('exist');
  }

  concluirCompra() {
    CarrinhoPage.checkoutButton().click();
  }

  // =========================
  // Seleção de produto
  // =========================
  selecionarCaracteristicas(tamanho, cor, quantidade) {
    CarrinhoPage.sizeOption(tamanho).click();
    CarrinhoPage.colorOption(cor).click();
    CarrinhoPage.quantityInput().clear().type(String(quantidade));
  }

  adicionarAoCarrinho() {
    CarrinhoPage.addToCartButton().click();
  }

  selecionarProdutoComQuantidade(produto, quantidade) {
    produto.quantidade = quantidade;

    this.selecionarCaracteristicas(
      produto.tamanho,
      produto.cor,
      quantidade
    );
  }

  // =========================
  // Fluxo de múltiplos produtos
  // =========================
  adicionarProdutos(produtos, posicoes) {
    cy.wrap(posicoes).each(({ posicao, quantidade }) => {
      if (quantidade <= 0) return;

      const produtoAtual = produtos[posicao];

      this.buscarProduto(produtoAtual.nome);
      this.selecionarCaracteristicas(
        produtoAtual.tamanho,
        produtoAtual.cor,
        quantidade
      );
      this.adicionarAoCarrinho();

      CarrinhoPage.successMessage()
        .should('be.visible');
    });
  }

  // =========================
  // Regras de negócio
  // =========================
  validarLimiteQuantidade(quantidade) {
    if (quantidade <= 10) {
      CarrinhoPage.successMessage()
        .should('be.visible')
        .and('contain.text', 'foram adicionados no seu carrinho');
    } else {
      throw new Error(
        'Regra de negócio violada: mais de 10 unidades.'
      );
    }
  }

  validarLimiteCompra() {
    CarrinhoPage.valorTotalCarrinho()
      .invoke('text')
      .then((text) => {

        const valorTotal = Number(
          text.replace(/\D/g, '') / 100
        );

        CarrinhoPage.pageTitle().then(($title) => {
          const checkoutVisivel =
            $title.length > 0 &&
            $title.text().includes('Checkout');

          if (valorTotal <= 990) {
            expect(checkoutVisivel).to.be.true;
          } else {
            expect(checkoutVisivel).to.be.false;
          }
        });
      });
  }

  // =========================
  // CUPOM — PARTE CRÍTICA
  // =========================
  aplicarCupom(cupom) {

    cy.intercept('POST', '**wc-ajax=apply_coupon**')
      .as('applyCoupon');

    CarrinhoPage.couponContainer()
      .should('be.visible')
      .within(() => {
        cy.get('input[name="coupon_code"]')
          .clear()
          .type(cupom);

        cy.get('input[name="apply_coupon"]')
          .click();
      });

    // 🔒 sincronização REAL com o backend
    cy.wait('@applyCoupon');
  }

  validarAplicacaoCupom(cupom) {

    // 🔒 força o Cypress a reavaliar o DOM
    cy.get('body').should('be.visible');

    // 🔒 ERRO DE CUPOM
    cy.get('ul.woocommerce-error > li', { timeout: 15000 })
      .then(($li) => {
        if ($li.length) {
          cy.wrap($li)
            .should('contain.text', 'valor mínimo do pedido');
          return;
        }
      });

    // 🔒 SUCESSO DE CUPOM
    cy.get('div.woocommerce-message', { timeout: 15000 })
      .then(($msg) => {
        if ($msg.length) {
          expect($msg.text())
            .to.contain('Código de cupom aplicado com sucesso');
        }
      });
  }
}

export default new CarrinhoActions();
