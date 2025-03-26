# language: pt

Funcionalidade: Cadastro de usuário
  Como um usuário não cadastrado
  Eu quero me cadastrar no sistema
  Para que eu possa enviar e receber mensagens

  Cenário: Cadastro de usuário com sucesso
    Dado que o usuário está na página de “cadastro de usuário”
    Quando o usuário preenche os campos "nome" com "Rafael Alves", "email" com "teste2000@email.com", "senha" com "senhaSegura123", "confirmar senha" com "senhaSegura123" e envia uma foto de perfil
    E aciona o botão “criar conta”
    Então o usuário está na página de “login”

  Cenário: Cadastro de usuário mal sucedido (email inválido)
    Dado que o usuário está na página de “cadastro de usuário”
    Quando o usuário preenche os campos "name" com "Rafael Alves", "email" com "exampleemail", "senha" com "senhaSegura123", "confirmar senha" com "senhaSegura123" e envia uma foto de perfil
    E clica no botão “criar conta”
    Então o sistema exibe uma mensagem de erro "Email inválido. Por favor, insira um email válido."

  Cenário: Cadastro com email já cadastrado
    Dado que o usuário está na página de “cadastro de usuário”
    E já existe um usuário cadastrado com o email "example@email.com" no sistema
    Quando o usuário preenche os campos "nome" com "Rafael Alves", "email" com "example@email.com", "senha" com "senhaSegura123", "confirmar senha" com "senhaSegura123" e envia uma foto de perfil
    E clica no botão “criar conta”
    Então o sistema exibe uma mensagem de erro "O email informado já está em uso"

  Cenário: Cadastro com senha fraca
    Dado que o usuário está na página de “cadastro de usuário”
    Quando o usuário preenche os campos "nome" com "Rafael Alves", "email" com "example@email.com", "senha" com "1234", "confirmar senha" com "1234" e envia uma foto de perfil
    E clica no botão “criar conta”
    Então o sistema exibe uma mensagem de erro "Senha não cumpre os requisitos de segurança."

  Cenário: Cadastro com senha e senha de confirmação diferentes
    Dado que o usuário está na página de “cadastro de usuário”
    Quando o usuário preenche os campos "nome" com "Rafael Alves", "email" com "example@email.com", "senha" com "senhaSegura12", "confirmar senha" com "snhaSegura" e envia uma foto de perfil
    Então o botão “criar conta” está desabilitado

  Cenário: Cadastro sem preencher todos os campos
    Dado que o usuário está na página de “cadastro de usuário”
    Quando o usuário preenche os campos "email" com "example@email.com", "senha" com "senhaSegura12.", "confirmar senha" com "senhaSegura12." e envia uma foto de perfil
    Então o botão “criar conta” está desabilitado

  Cenário: Cadastro de usuário sem foto de perfil
    Dado que o usuário está na página de “cadastro de usuário”
    Quando o usuário preenche os campos "nome" com "Rafael Alves", "email" com "example@email.com", "senha" com "senhaSegura123.", "confirmar senha" com "senhaSegura123."
    E clica no botão “criar conta”
    Então o usuário está na página de “login”