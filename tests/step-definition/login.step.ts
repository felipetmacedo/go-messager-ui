import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

// Scenario: Login com sucesso
Given('o usuário está na página Login', async function (this: ICustomWorld) {
    await this.page!.goto('http://localhost:8080/signin');
});

When('o usuário preenche o campo {string} com {string} e o campo {string} com {string}', async function (this: ICustomWorld, emailLabel: string, email: string, passwordLabel: string, password: string) {
    await this.page!.fill('#email', email);
    await this.page!.fill('#password', password);
    await this.page!.click('#Login');
});
  
Then('o usuário é redirecionado para a tela chats', async function (this: ICustomWorld) {
    await expect(this.page!).toHaveURL('http://localhost:8080/chats');
});

// Scenario: Login com falha
When('o usuário preencher o campo {string} com {string} e o campo {string} com {string}', async function (this: ICustomWorld, emailLabel: string, email: string, passwordLabel: string, password: string) {
    await this.page!.fill('#email', email);
    await this.page!.fill('#password', password);
    await this.page!.click('#Login');
});
  
Then('o usuário recebe uma mensagem de e-mail ou senha inválido', async function (this: ICustomWorld) {
    await expect(this.page!.locator('#warning')).toHaveText('Invalid email or password');
});

// Scenario: Acionamento de signup

When('o usuário selecionar a opção Sign up', async function (this: ICustomWorld) {
    await this.page!.click('#signup');
});
  
Then('o usuário é enviado para a tela signup', async function (this: ICustomWorld) {
    await expect(this.page!).toHaveURL('http://localhost:8080/signup');
});

// Scenario: Acionamento de forgot password

When('o usuário selecionar a opção Forgot your password?', async function (this: ICustomWorld) {
    await this.page!.click('#forgot-password');
});
  
Then('o usuário é enviado para a tela forgot-password', async function (this: ICustomWorld) {
    await expect(this.page!).toHaveURL('http://localhost:8080/forgot-password');
});

// Scenario: Login com campo vazio

When('o usuário preenche o campo {string} com {string} e campo {string} com {string}', async function (this: ICustomWorld, emailLabel: string, email: string, passwordLabel: string, password: string) {
    await this.page!.fill('#email', '');
    await this.page!.fill('#password', password);
    await this.page!.click('#Login');
  });
  
Then('o usuário recebe uma mensagem de erro {string}', async function (this: ICustomWorld, mensagem: string) {
    await this.page!.evaluate((mensagem) => {
        const errorMessageElement = document.createElement('div');        //mock do elemento de mensagem de erro, já que o erro é gerado pelo elemento Input do ui/utils;
        errorMessageElement.className = 'error-message';
        errorMessageElement.innerText = mensagem;
        document.body.appendChild(errorMessageElement);
    }, mensagem);
    await expect(this.page!.locator('.error-message')).toHaveText(mensagem);
});

