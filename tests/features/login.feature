# language: pt

Funcionalidade: Login
    Como um usuário
    Eu quero logar na minha conta
    Para que eu possa utilizar as funcionalidades do site

Cenário: Login feito com sucesso
    Dado o usuário está na página Login
    Quando o usuário preenche o campo "Email" com "teste@teste.com" e o campo "Password" com "12345678"
    Então o usuário é redirecionado para a tela chats

Cenário: Login incorreto
    Dado o usuário está na página Login
    Quando o usuário preencher o campo "Email" com "blabla345@hotmail.com" e o campo "Password" com "1234"
    Então o usuário recebe uma mensagem de e-mail ou senha inválido

Cenário: Acionamento de "Sign up"
    Dado o usuário está na página Login
    Quando o usuário selecionar a opção Sign up
    Então o usuário é enviado para a tela signup

Cenário: Acionamento de "Forgot your password?"
    Dado o usuário está na página Login
    Quando o usuário selecionar a opção Forgot your password?
    Então o usuário é enviado para a tela forgot-password

Cenário: Login com campo não preenchido
    Dado o usuário está na página Login
    Quando o usuário preenche o campo "Email" com "" e campo "Password" com "1234" 
    Então o usuário recebe uma mensagem de erro "Preencha este campo."
