import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

// Scenario: Acionamento de "Log in"
Given('o usuário está na tela reset-password-link', async function (this: ICustomWorld) {
    await this.page!.goto('http://localhost:8080/reset-password-link');
});

When('o usuário seleciona a opção Log in', async function (this: ICustomWorld) {
    await this.page!.click('#Login');
});

Then('o usuário é enviado para a tela signin', async function (this: ICustomWorld) {
    await expect(this.page!).toHaveURL('http://localhost:8080/signin');
});

//Scenario: Acionamento de "Try Again"
When('o usuário selecionar a opção Try Again', async function (this: ICustomWorld) {
    await this.page!.click('#forgotpassword');
});

Then('o usuário é redirecionado para a tela forgot-password', async function (this: ICustomWorld) {
    await expect(this.page!).toHaveURL('http://localhost:8080/forgot-password');
});