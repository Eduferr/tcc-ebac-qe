import CarrinhoPage from '../pageObjects/CarrinhoPage';

class CarrinhoActions {

    // =========================
    // Ações básicas de navegação e busca
    // =========================
    buscarProduto(nome) {
        CarrinhoPage.searchInput().clear().type(nome);
        CarrinhoPage.searchButton().click();
    }

    // verCarrinho() {
    //     CarrinhoPage.viewCartButton().click();
    // }

    verCarrinho() {
        cy.visit('/carrinho', { failOnStatusCode: false });

        cy.location('pathname', { timeout: 15000 })
            .should('include', '/carrinho');

        // âncora REAL do carrinho
        cy.get('form.woocommerce-cart-form', { timeout: 15000 })
            .should('exist');
    }

    concluirCompra() {
        CarrinhoPage.checkoutButton().click();
    }

    // =========================
    // Ações de seleção e interação
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
    // Fluxos compostos
    // =========================

    // adicionarProdutos(produtos, posicoes) {
    //     posicoes.forEach(({ posicao, quantidade }) => {
    //         if (quantidade <= 0) return;

    //         const produtoAtual = produtos[posicao];

    //         this.buscarProduto(produtoAtual.nome);
    //         this.selecionarCaracteristicas(
    //             produtoAtual.tamanho,
    //             produtoAtual.cor,
    //             quantidade
    //         );
    //         this.adicionarAoCarrinho();
    //     });
    // }

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

            // âncora real de estado
            CarrinhoPage.successMessage().should('be.visible');
        });
    }


    // =========================
    // Validações de regras de negócio
    // =========================

    validarLimiteQuantidade(quantidade) {

        if (quantidade <= 10) {
            // Compra dentro do limite
            CarrinhoPage.successMessage()
                .should('be.visible')
                .and('contain.text', 'foram adicionados no seu carrinho');

            // Mensagem informativa de sucesso
            cy.log(
                `Compra válida: ${quantidade} unidade(s) adicionada(s) ao carrinho dentro do limite permitido.`
            );

        } else {
            //Compra inválida – falha explícita
            throw new Error(
                'Regra de negócio violada: não é permitido inserir mais de 10 unidades do mesmo produto no carrinho.'
            );
        }
    }

    validarLimiteCompra() {
        CarrinhoPage.valorTotalCarrinho().then(($el) => {
            const text = $el.text();

            const valorTotal = Number(
                text
                    .replace(/\s/g, '')
                    .replace('R$', '')
                    .replace(/\./g, '')
                    .replace(',', '.')
            );

            if (Number.isNaN(valorTotal)) {
                throw new Error(
                    `Falha ao converter valor monetário do carrinho: "${text}"`
                );
            }

            CarrinhoPage.pageTitle().then(($title) => {
                const checkoutVisivel =
                    $title.length > 0 && $title.text().includes('Checkout');

                if (valorTotal <= 990) {
                    expect(
                        checkoutVisivel,
                        `Esperado acesso ao Checkout para valor R$ ${valorTotal.toFixed(2)}`
                    ).to.be.true;
                } else {
                    expect(
                        checkoutVisivel,
                        `Regra de negócio violada: sistema permitiu Checkout com valor R$ ${valorTotal.toFixed(2)} (limite R$ 990,00)`
                    ).to.be.false;
                }
            });
        });
    }

    // =========================
    // Cupons de desconto
    // =========================

    // aplicarCupom(cupom) {
    //     CarrinhoPage.couponInput()
    //         .clear()
    //         .type(cupom);

    //     CarrinhoPage.applyCouponButton().click();
    // }


    aplicarCupom(cupom) {

        cy.location('pathname').should('include', '/carrinho');

        CarrinhoPage.couponContainer()
            .should('be.visible')
            .within(() => {

                cy.get('input[name="coupon_code"]')
                    .clear()
                    .type(cupom);

                cy.get('input[name="apply_coupon"]')
                    .should('be.enabled')
                    .click();
            });

    }



    validarAplicacaoCupom(cupom) {

        CarrinhoPage.noticeWrapper()
            .should('exist')
            .within(() => {

                // =========================
                // ERRO DE CUPOM
                // =========================
                cy.get('ul.woocommerce-error > li').then(($li) => {

                    if ($li.length) {

                        // valida estrutura
                        cy.wrap($li)
                            .should('contain.text', 'O valor mínimo do pedido');

                        // valida valor monetário (robusto)
                        cy.wrap($li)
                            .find('span.woocommerce-Price-amount.amount')
                            .invoke('text')
                            .then((valorTexto) => {

                                const valor = Number(
                                    valorTexto
                                        .replace(/\s/g, '')
                                        .replace('R$', '')
                                        .replace(/\./g, '')
                                        .replace(',', '.')
                                );

                                if (cupom === 'techugo10') {
                                    expect(valor).to.eq(200);
                                }

                                if (cupom === 'techugo15') {
                                    expect(valor).to.eq(601);
                                }
                            });

                        return;
                    }
                });

                // =========================
                // SUCESSO DE CUPOM
                // =========================
                cy.get('div.woocommerce-message').then(($msg) => {

                    if ($msg.length) {
                        expect($msg.text())
                            .to.contain('Código de cupom aplicado com sucesso');
                    }
                });

            });
    }




}
export default new CarrinhoActions();
