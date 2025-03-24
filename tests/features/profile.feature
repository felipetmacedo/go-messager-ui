#language: pt

Funcionalidade: Perfil pessoal

Cenário: Editar foto do perfil pessoal com sucesso
  Dado o usuário “Victor Mendonça” está no modal “Meu Perfil”
  Quando o usuário “Victor Mendonça” aciona o botão “Anexar arquivo”
  E o usuário “Victor Mendonça” anexa um arquivo “.jpg”
  E o usuário “Victor Mendonça” aciona o botão “salvar”
  Então o usuário “Victor Mendonça” visualiza sua nova foto de perfil na página “Meu perfil”

Cenário: Anexando foto ao perfil pessoal sem salvar
  Dado o usuário “Victor Mendonça” está no modal “Meu Perfil”
  Quando o usuário “Victor Mendonça” aciona o botão “Anexar arquivo”
  E o usuário “Victor Mendonça” anexa um arquivo “.jpg”
  E o usuário “Victor Mendonça” aciona o botão “x”
  Então o usuário “Victor Mendonça” visualiza sua foto de perfil inalterada na página “Meu perfil”

Cenário: Edição de nome de usuário com sucesso
  Dado o usuário “Victor Mendonça” está no modal “Meu Perfil”
  Quando o usuário “Victor Mendonça” aciona caixa de texto 
  E o usuário “Victor Mendonça” digita “Novo nome”
  E o usuário “Victor Mendonça” aciona o botão “salvar”
  Então o nome de usuário atualizado é exibido na página “Meu Perfil”

Cenário: Edição de nome de usuário sem salvar
  Dado o usuário “Victor Mendonça” está no modal “Meu Perfil”
  Quando o usuário “Victor Mendonça” aciona caixa de texto 
  E o usuário “Victor Mendonça” digita “Novo nome”
  E o usuário “Victor Mendonça” aciona o botão “x”
  Então o usuário “Victor Mendonça” visualiza seu nome de perfil inalterado na página “chats”


Cenário: Visualizar informações do perfil pessoal
  Dado o usuário “Victor Mendonça” está na página “chats”
  Quando o usuário aciona o botão “Meu Perfil”
  Então o modal “Meu Perfil” é aberto
  E visualiza as informações pessoais, incluindo: nome do usuário e foto de perfil

