class CarrinhoPage {

    // =========================
    // Busca / navegação
    // =========================
    searchInput() {
        return cy.get('input[placeholder="Enter your search ..."]', { timeout: 5000 }).eq(1);
    }

    searchButton() {
        return cy.get('.search .button-group', { timeout: 5000 });
    }

    // =========================
    // Configuração do produto
    // =========================
    sizeOption(tamanho) {
        return cy.get(`.button-variable-item-${tamanho}`, { timeout: 5000 });
    }

    colorOption(cor) {
        return cy.get(`.button-variable-item-${cor}`, { timeout: 5000 });
    }

    quantityInput() {
        return cy.get('[name="quantity"]', { timeout: 5000 });
    }

    // =========================
    // Ações de carrinho
    // =========================
    addToCartButton() {
        return cy.get('.single_add_to_cart_button', { timeout: 5000 });
    }

    viewCartButton() {
        //return cy.get('.woocommerce-message > .button', { timeout: 5000 });
        cy.visit('/carrinho');
    }

    checkoutButton() {
        return cy.get('.checkout-button', { timeout: 5000 });
    }

    // =========================
    // Mensagens / feedback
    // =========================
    successMessage() {
        return cy.get('.woocommerce-message', { timeout: 5000 });
    }

    errorMessage() {
        return cy.get('.woocommerce-error', { timeout: 5000 });
    }

    // Mensagem genérica (sucesso ou erro) para validar aplicação de cupom
    noticeMessage() {
        return cy.get('.woocommerce-message, .woocommerce-error', { timeout: 5000 });
    }

    // =========================
    // Valores e cupons
    // =========================
    valorTotalCarrinho() {
        return cy.get('tr.order-total .woocommerce-Price-amount.amount', { timeout: 5000 });
    }

    couponInput() {
        return cy.get('#coupon_code', { timeout: 5000 });
    }

    applyCouponButton() {
        return cy.get('[name="apply_coupon"]', { timeout: 5000 });
    }

    // =========================
    // Conteúdo de checkout
    // =========================
    pageTitle() {
        return cy.get('.page-title', { timeout: 5000 });
    }
}
export default new CarrinhoPage();
