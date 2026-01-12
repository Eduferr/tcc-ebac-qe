class CarrinhoPage {

    // =========================
    // Busca / navegação
    // =========================
    searchInput() {
        return cy.get('input[placeholder="Enter your search ..."]', { timeout: 20000 }).eq(1);
    }

    searchButton() {
        return cy.get('.search .button-group', { timeout: 20000 });
    }

    // =========================
    // Configuração do produto
    // =========================
    sizeOption(tamanho) {
        return cy.get(`.button-variable-item-${tamanho}`, { timeout: 20000 });
    }

    colorOption(cor) {
        return cy.get(`.button-variable-item-${cor}`, { timeout: 20000 });
    }

    quantityInput() {
        return cy.get('[name="quantity"]', { timeout: 20000 });
    }

    // =========================
    // Ações de carrinho
    // =========================
    addToCartButton() {
        return cy.get('.single_add_to_cart_button', { timeout: 20000 });
    }

    viewCartButton() {
        return cy.get('.woocommerce-message a.wc-forward', { timeout: 20000 });
    }

    cartUrl() {
        return '/carrinho';
    }


    checkoutButton() {
        return cy.get('.checkout-button', { timeout: 20000 });
    }

    // Wrapper semântico (AJAX-safe)
    noticeWrapper() {
        return cy.get('.woocommerce-notices-wrapper', { timeout: 20000 });
    }

    // ERRO → sempre <ul><li>
    couponErrorItem() {
        return this.noticeWrapper()
            .find('ul.woocommerce-error > li');
    }

    // SUCESSO → sempre <div>
    couponSuccessMessage() {
        return this.noticeWrapper()
            .find('div.woocommerce-message');
    }

    // Valor exibido na mensagem (único!)
    couponErrorAmount() {
        return this.couponErrorItem()
            .find('span.woocommerce-Price-amount.amount');
    }


    // =========================
    // Mensagens / feedback
    // =========================
    successMessage() {
        return cy.get('.woocommerce-notices-wrapper .woocommerce-message', { timeout: 20000 });
    }

    errorMessage() {
        return cy.get('.woocommerce-notices-wrapper .woocommerce-error', { timeout: 20000 });
    }

    // Mensagem genérica (sucesso ou erro) para validar aplicação de cupom
    noticeMessage() {
        return cy.get(
            '.woocommerce-notices-wrapper .woocommerce-message, ' +
            '.woocommerce-notices-wrapper .woocommerce-error',
            { timeout: 20000 }
        );
    }


    // =========================
    // Valores e cupons
    // =========================
    valorTotalCarrinho() {
        return cy.get('tr.order-total .woocommerce-Price-amount.amount', { timeout: 20000 });
    }

    couponContainer() {
        return cy.get('td.actions .coupon', { timeout: 20000 });
    }

    couponInput() {
        return this.couponContainer()
            .find('input[name="coupon_code"]');
    }

    applyCouponButton() {
        return this.couponContainer()
            .find('input[name="apply_coupon"]');
    }

    // =========================
    // Conteúdo de checkout
    // =========================
    pageTitle() {
        return cy.get('.page-title', { timeout: 20000 });
    }
}
export default new CarrinhoPage();
