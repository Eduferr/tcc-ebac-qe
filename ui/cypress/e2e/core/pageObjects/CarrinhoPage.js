class CarrinhoPage {

    // =========================
    // Busca / navegação
    // =========================
    searchInput() {
        return cy.get('input[placeholder="Enter your search ..."]').eq(1);
    }

    searchButton() {
        return cy.get('.search .button-group');
    }

    // =========================
    // Configuração do produto
    // =========================
    sizeOption(tamanho) {
        return cy.get(`.button-variable-item-${tamanho}`);
    }

    colorOption(cor) {
        return cy.get(`.button-variable-item-${cor}`);
    }

    quantityInput() {
        return cy.get('[name="quantity"]');
    }

    // =========================
    // Ações de carrinho
    // =========================
    addToCartButton() {
        return cy.get('.single_add_to_cart_button'{ timeout: 10000 });
    }

    // viewCartButton() {
    //     return cy.get('.woocommerce-message > .button');
    // }

    checkoutButton() {
        return cy.get('.checkout-button button alt wc-forward' { timeout: 10000 });
    }

    // =========================
    // Mensagens / feedback
    // =========================
    successMessage() {
        return cy.get('.woocommerce .woocommerce-notices-wrapper > .woocommerce-message'{ timeout: 10000 });
    }

    errorMessage() {
        return cy.get('.woocommerce .woocommerce-notices-wrapper > .woocommerce-error'{ timeout: 10000 });
    }

    // Mensagem genérica (sucesso ou erro) para validar aplicação de cupom
    // noticeMessage() {
    //     return cy.get(
    //         '.woocommerce .woocommerce-notices-wrapper > .woocommerce-message, ' +
    //         '.woocommerce .woocommerce-notices-wrapper > .woocommerce-error',
    //         { timeout: 5000 }
    //     );
    // }

    noticeMessage() {
        return cy.get(
            '.woocommerce .woocommerce-notices-wrapper',
            { timeout: 10000 }
        );
    }



    // =========================
    // Valores e cupons
    // =========================
    valorTotalCarrinho() {
        return cy.get('tr.order-total .woocommerce-Price-amount.amount');
    }

    couponInput() {
        return cy.get(
            'form.woocommerce-cart-form input#coupon_code',
            { timeout: 10000 }
        );
    }

    applyCouponButton() {
        return cy.get('[name="apply_coupon"]');
    }

    // =========================
    // Conteúdo de checkout
    // =========================
    pageTitle() {
        return cy.get('.page-title');
    }

}
export default new CarrinhoPage();
