# language: pt

Funcionalidade: Forgot password
    Como um usuário
    Eu quero recuperar minha senha
    Para que eu possa logar na minha conta com sucesso


Cenário: Acionamento de "Reset Password"
    Dado o usuário está na tela forgot-password
    Quando o usuário preenche o campo "Email" com "exemplo@gmail.com"
    E seleciona a opção Reset Password
    Então o usuário é redirecionado para a tela reset-password-link

Cenário: Acionamento de "Reset Password" sem preencher Email
    Dado o usuário está na tela forgot-password
    Quando o usuário deixar o campo "Email" vazio
    E selecionar a opção Reset Password
    Então o usuário recebe uma mensagem de erro com "Preencha este campo."

Cenário: Acionamento de "Login"
    Dado o usuário está na tela forgot-password
    Quando o usuário selecionar a opção Log in
    Então o usuário é redirecionado para a tela signin 
