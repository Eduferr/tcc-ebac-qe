#language: pt

Funcionalidade: Contrato da API de Cupons

    # CT-API-CUPOM-CONTRATO-001
    Cenário: Validar contrato do cupom retornado pela API
        Dado que o admin está autenticado na API
        Quando realizar a requisição de listagem de cupons
        Então o contrato do cupom retornado no GET deve estar de acordo com o esperado

    # CT-API-CUPOM-CONTRATO-002
    Cenário: Validar contrato do cupom retornado no cadastro
            Dado que o admin está autenticado na API
            Quando realizar o cadastro de um novo cupom
            Então o contrato do cupom retornado no POST deve estar de acordo com o esperado
