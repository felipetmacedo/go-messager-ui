import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

let initialImageUrl: string = '';

/** 🔹 Cenário: Visualizar informações do perfil pessoal */
Given('o usuário está na página chats', async function (this: ICustomWorld) {
    await this.page!.goto('http://localhost:8080/signin');
    await this.page!.fill('#email', 'teste@teste.com');
    await this.page!.fill('#password', '12345678');
    await this.page!.click('#Login');
    await this.page!.waitForURL('/chats');
});

When('o usuário aciona o botão Meu Perfil', async function (this: ICustomWorld) {
    await this.page!.click('#user-profile-button');
});

Then('o modal Meu Perfil é aberto', async function (this: ICustomWorld) {
    await expect(this.page!.locator('#UserProfileModal')).toBeVisible();
});

Then('visualiza as informações pessoais, incluindo: nome do usuário e foto de perfil', async function (this: ICustomWorld) {
    const username = await this.page!.textContent('.profile-username');
    const profilePhoto = await this.page!.getAttribute('img[alt="User Photo"]', 'src');

    expect(username).toBeTruthy();
    expect(profilePhoto).toBeTruthy();
});


/** 🔹 Cenário: Editar foto do perfil pessoal com sucesso */
Given('o usuário está no modal Meu Perfil', async function (this: ICustomWorld) {
    await this.page!.goto('http://localhost:8080/signin');
    await this.page!.fill('#email', 'teste@teste.com');
    await this.page!.fill('#password', '12345678');
    await this.page!.click('#Login');
    await this.page!.waitForURL('/chats');
    await this.page!.click('#user-profile-button');
});

When('o usuário aciona o botão Anexar arquivo', async function (this: ICustomWorld) {
    await this.page!.click('#ProfilePicture');
});

When('o usuário anexa um arquivo ".jpg"', async function (this: ICustomWorld) {
    await this.page!.setInputFiles('#ProfilePicture', 'tests/assets/profile.jpg');
});

When('o usuário aciona o botão salvar', async function (this: ICustomWorld) {
    await this.page!.click('#SaveButton');
});

Then('o usuário visualiza sua nova foto de perfil na página Meu perfil', async function (this: ICustomWorld) {
    const newImageUrl = await this.page!.getAttribute('img[alt="User Photo"]', 'src');
    expect(newImageUrl).toContain('profile.jpg');
});


/** 🔹 Cenário: Anexando foto ao perfil pessoal sem salvar */
When('o usuário aciona o botão x', async function (this: ICustomWorld) {
    await this.page!.click('#CancelButton');
});

When('o usuário visualiza sua foto de perfil na página Meu perfil', async function (this: ICustomWorld) {
    initialImageUrl = (await this.page!.getAttribute('img[alt="User Photo"]', 'src'))!;
});

Then('o usuário visualiza sua foto de perfil inalterada na página Meu perfil', async function (this: ICustomWorld) {
    const currentImageUrl = await this.page!.getAttribute('img[alt="User Photo"]', 'src');
    expect(currentImageUrl).toBe(initialImageUrl);
});


/** 🔹 Cenário: Edição de nome de usuário com sucesso */
When('o usuário aciona caixa de texto', async function (this: ICustomWorld) {
    await this.page!.click('input[name="username"]');
});

When('o usuário digita "Novo nome"', async function (this: ICustomWorld) {
    await this.page!.fill('input[name="username"]', 'Novo nome');
});

Then('o nome de usuário atualizado é exibido na página chats', async function (this: ICustomWorld) {
    await this.page!.click('#SaveButton');
    await this.page!.waitForURL('/chats');
    const displayedName = await this.page!.textContent('.chat-username');
    expect(displayedName).toBe('Novo nome');
});


/** 🔹 Cenário: Edição de nome de usuário sem salvar */
Then('o usuário visualiza seu nome de perfil inalterado na página chats', async function (this: ICustomWorld) {
    await this.page!.click('#CancelButton');
    const displayedName = await this.page!.textContent('.chat-username');
    expect(displayedName).not.toBe('Novo nome');
});
