# language: pt

Funcionalidade: Lista de Contatos
    Como um usuário
    Eu quero ver todos os usuários da aplicação na lista de contatos independentemente de ter conversado com eles ou não
    Para que eu possa visualizar e interagir com outros usuários cadastrados.

Cenário: Busca por contatos bem-sucedida
    Dado o usuário "Guilherme" está na página "chats" e no pop up Lista de contatos
    Quando o usuário clicar na barra de pesquisa
    E digitar a sequência de dígitos "Torres"
    Então ve o usuário "Felipe Torres"

Cenário: Busca por contatos mal-sucedida
    Dado o usuário "Guilherme" está na página "chats" e no pop up Lista de contatos
    Quando o usuário clicar na barra de pesquisa
    E digitar a sequência de dígitos "Luan"
    Então ve uma lista vazia com a mensagem "Contato não encontrado"