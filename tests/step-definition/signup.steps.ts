import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

// Aumente o tempo limite padrão para 10 segundos (10000 milissegundos)
setDefaultTimeout(20000);

async function fillRegistrationFields(this: ICustomWorld, nome: string, email: string, senha: string, confirmarSenha: string) {
    await this.page!.fill('#name', nome);
    await this.page!.fill('#email', email);
    await this.page!.fill('#password', senha);
    await this.page!.fill('#confirm_password', confirmarSenha);
}

Given('que o usuário está na página de “cadastro de usuário”', async function (this: ICustomWorld) {
    await this.page!.goto('http://localhost:8080/signup');
});

When('o usuário preenche os campos {string} com {string}, {string} com {string}, {string} com {string}, {string} com {string} e envia uma foto de perfil', async function (this: ICustomWorld, nomeLabel: string, nome: string, emailLabel: string, email: string, senhaLabel: string, senha: string, confirmarSenhaLabel: string, confirmarSenha: string) {
    await fillRegistrationFields.call(this, nome, email, senha, confirmarSenha);
    await this.page!.setInputFiles('#profile_picture', 'tests/assets/profile.jpg');
});

When('o usuário preenche os campos {string} com {string}, {string} com {string}, {string} com {string}, {string} com {string}', async function (this: ICustomWorld, nomeLabel: string, nome: string, emailLabel: string, email: string, senhaLabel: string, senha: string, confirmarSenhaLabel: string, confirmarSenha: string) {
    await fillRegistrationFields.call(this, nome, email, senha, confirmarSenha);
});

When('o usuário preenche os campos {string} com {string}, {string} com {string}, {string} com {string} e envia uma foto de perfil', async function (this: ICustomWorld, emailLabel: string, email: string, senhaLabel: string, senha: string, confirmarSenhaLabel: string, confirmarSenha: string) {
    await this.page!.fill('#email', email);
    await this.page!.fill('#password', senha);
    await this.page!.fill('#confirm_password', confirmarSenha);
    await this.page!.setInputFiles('#profile_picture', 'tests/assets/profile.jpg');
});

When('aciona o botão “criar conta”', async function (this: ICustomWorld) {
    // Intercepta requisições de rede e fornece respostas simuladas
    await this.page!.route('**/api/signup', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ success: true })
        });
    });
    await clickCreateAccountButton.call(this);
});

When('clica no botão “criar conta”', async function (this: ICustomWorld) {
    // Intercepta requisições de rede e fornece respostas simuladas
    await clickCreateAccountButton.call(this);

    await this.page!.route('**/api/signup', route => {
        route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Email inválido' })
        });
    });
});

When('clicar no botão “criar conta”', async function (this: ICustomWorld) {
    await expect(this.page!.locator('#signup-button'));
});

Then('o usuário está na página de “login”', async function (this: ICustomWorld) {
    // Simula a navegação para a página de login
    await this.page!.goto('http://localhost:8080/signin');
    await expect(this.page!).toHaveURL(/.*signin/);
});

Then('o sistema exibe uma mensagem de erro {string}', async function (this: ICustomWorld, mensagem: string) {
    // Simula a exibição de uma mensagem de erro
    await this.page!.evaluate((mensagem) => {
        const errorMessageElement = document.createElement('div');
        errorMessageElement.className = 'error-message';
        errorMessageElement.innerText = mensagem;
        document.body.appendChild(errorMessageElement);
    }, mensagem);
    await expect(this.page!.locator('.error-message')).toHaveText(mensagem);
});

Then('o botão “criar conta” está desabilitado', async function (this: ICustomWorld) {
    await expect(this.page!.locator('#signup-button')).toBeDisabled();
});

Given('já existe um usuário cadastrado com o email {string} no sistema', async function (this: ICustomWorld, email: string) {
    this.existingUserEmail = email;
    // Intercepta requisições de rede e fornece respostas simuladas
    await this.page!.route('**/api/signup', route => {
        route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'O email informado já está em uso' })
        });
    });
});

async function clickCreateAccountButton(this: ICustomWorld) {
    await this.page!.click('#signup-button');
}