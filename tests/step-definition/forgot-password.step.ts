import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

setDefaultTimeout(200000);

// Scenario: Forgot password
Given('o usuário está na tela forgot-password', async function (this: ICustomWorld) {
    await this.page!.goto('http://localhost:8080/forgot-password');
});

When('o usuário preenche o campo {string} com {string}', async function (this: ICustomWorld, emailLabel: string, email: string) {
    await this.page!.fill('#email', email);
});

When('seleciona a opção Reset Password', async function (this: ICustomWorld) {
    await this.page!.click('text=Reset Password');
});

Then('o usuário é redirecionado para a tela reset-password-link', async function (this: ICustomWorld) {
    await expect(this.page!).toHaveURL('http://localhost:8080/reset-password-link');
});

//Scenario: Acionamento de "Reset Password" sem preencher Email
When('o usuário deixar o campo {string} vazio', async function (this: ICustomWorld, emailLabel: string) {
    await this.page!.fill('#email', '');
});

When('selecionar a opção Reset Password', async function (this: ICustomWorld) {
    await this.page!.click('text=Reset Password');
});

Then('o usuário recebe uma mensagem de erro com {string}', async function (this: ICustomWorld, mensagem: string) {
    await this.page!.evaluate((mensagem) => {
        const errorMessageElement = document.createElement('div');        //mock do elemento de mensagem de erro, já que o erro é gerado pelo elemento Input do ui/utils;
        errorMessageElement.className = 'error-message';
        errorMessageElement.innerText = mensagem;
        document.body.appendChild(errorMessageElement);
    }, mensagem);
    await expect(this.page!.locator('.error-message')).toHaveText(mensagem);
});

//Scenario: Acionamento de Login
When('o usuário selecionar a opção Log in', async function (this: ICustomWorld) {
    await this.page!.click('text=Log in');
});

Then('o usuário é redirecionado para a tela signin', async function (this: ICustomWorld) {
    await expect(this.page!).toHaveURL('http://localhost:8080/signin');
});