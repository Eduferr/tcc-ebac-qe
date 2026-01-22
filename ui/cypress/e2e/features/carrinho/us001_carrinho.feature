#language: pt

Funcionalidade: Carrinho de Compras

    Contexto:
        Dado que o usuário acessa a página de produtos

    # CT-CARRINHO-001
    # CT-CARRINHO-002
    Esquema do Cenário: Validar limite de compra de um produto | <descricao>
        Quando adiciona um produto ao carrinho com quantidade <quantidade>
        Então o sistema deve validar o limite de quantidade
    Exemplos:
        | descricao                             | quantidade |
        | Até 10 unidades - Compra válida       | 10         |
        | Mais de 10 unidades - Compra inválida | 11         |

    # # CT-CARRINHO-003
    # # CT-CARRINHO-004
    Esquema do Cenário: Validar limite de valor total do carrinho | <descricao>
        Quando adiciona produtos ao carrinho com quantidades <q1>, <q2>, <q3>
        E acessa o carrinho
        E tenta finalizar a compra
        Então o sistema deve validar o limite de compra do carrinho
    Exemplos:
        | descricao                             | q1 | q2 | q3 |
        | Até R$ 990,00 - Compra válida         | 4  | 6  | 5  |
        | Acima de R$ 990,00 - Compra inválida  | 4  | 7  | 4  |


    # # CT-CARRINHO-005
    # # CT-CARRINHO-006
    # # CT-CARRINHO-007
    Esquema do Cenário: Validar aplicação de cupom 10% no carrinho | <descricao>
        Quando adiciona produtos ao carrinho com quantidades <q1>, <q2>, <q3>
        E acessa o carrinho
        E aplica o cupom de desconto "techugo10"
        Então o sistema deve validar a aplicação do cupom "techugo10"
    Exemplos:
        | descricao                                 | q1 | q2 | q3 |
        | Inválido para valor abaixo de R$ 200      | 1  | 1  | 1  |
        | Válido para Valor entre R$ 200 e 600      | 2  | 2  | 2  |
        | Inválido para valor acima de R$ 600       | 3  | 3  | 4  |


    # CT-CARRINHO-008
    # CT-CARRINHO-009
    Esquema do Cenário: Validar aplicação de cupom 15% no carrinho | <descricao>
        Quando adiciona produtos ao carrinho com quantidades <q1>, <q2>, <q3>
        E acessa o carrinho
        E aplica o cupom de desconto "techugo15"
        Então o sistema deve validar a aplicação do cupom "techugo15"
    Exemplos:
        | descricao                                         | q1 | q2 | q3 |
        | Inválido para valor igual ou menor que R$600      | 3  | 3  | 3  |
        | Válido para valor acima de R$ 600                 | 3  | 3  | 4  |