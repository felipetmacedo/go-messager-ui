# language: pt

Funcionalidade: Reset Password Link

Cenário: Acionamento de "Login"
    Dado o usuário está na tela reset-password-link
    Quando o usuário seleciona a opção Log in
    Então o usuário é redirecionado para a tela signin

Cenário: Acionamento de "Try Again"
    Dado o usuário está na tela reset-password-link
    Quando o usuário selecionar a opção Try Again
    Então o usuário é redirecionado para a tela forgot-password
    
 