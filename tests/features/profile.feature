#language: pt

Funcionalidade: Perfil pessoal

Cenário: Editar foto do perfil pessoal com sucesso
  Dado o usuário está no modal Meu Perfil
  Quando o usuário aciona o botão Anexar arquivo
  E o usuário anexa um arquivo “.jpg”
  E o usuário aciona o botão salvar
  Então o usuário visualiza sua nova foto de perfil na página Meu perfil

Cenário: Anexando foto ao perfil pessoal sem salvar
  Dado o usuário está no modal Meu Perfil
  Quando o usuário aciona o botão Anexar arquivo
  E o usuário anexa um arquivo “.jpg”
  E o usuário aciona o botão x
  Então o usuário visualiza sua foto de perfil inalterada na página Meu perfil

Cenário: Edição de nome de usuário com sucesso
  Dado o usuário está no modal Meu Perfil
  Quando o usuário aciona caixa de texto 
  E o usuário digita “Novo nome”
  E o usuário aciona o botão salvar
  Então o nome de usuário atualizado é exibido na página chats

Cenário: Edição de nome de usuário sem salvar
  Dado o usuário está no modal Meu Perfil
  Quando o usuário aciona caixa de texto 
  E o usuário digita “Novo nome”
  E o usuário aciona o botão x
  Então o usuário visualiza seu nome de perfil inalterado na página chats


Cenário: Visualizar informações do perfil pessoal
  Dado o usuário está na página chats
  Quando o usuário aciona o botão Meu Perfil
  Então o modal Meu Perfil é aberto
  E visualiza as informações pessoais, incluindo: nome do usuário e foto de perfil

