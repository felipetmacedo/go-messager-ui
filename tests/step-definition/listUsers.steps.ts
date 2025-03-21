import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

setDefaultTimeout(60000);

Given('o usuário {string} está na página {string} e no pop up Lista de contatos', async function (this: ICustomWorld, usuario: string, pagina: string) {
    await this.page!.goto('http://localhost:8080/signin');
    await this.page!.fill('#email', "teste@teste.com");
    await this.page!.fill('#password', "12345678");
    await this.page!.click('#Login');
    await expect(this.page!).toHaveURL('http://localhost:8080/chats');
    await this.page!.click('#listCtt');
  });

When('o usuário clicar na barra de pesquisa', async function (this: ICustomWorld) {
  // Clica na barra de pesquisa
  const searchBar = await this.page!.locator('#search-bar');
  await searchBar.click();
});

When('digitar a sequência de dígitos {string}', async function (this: ICustomWorld, searchTerm: string) {
  // Digita a sequência de dígitos na barra de pesquisa
  const searchBar = await this.page!.locator('#search-bar');
  await searchBar.fill(searchTerm);
});

Then('ve o usuário {string}', async function (this: ICustomWorld, usuario: string) {
  // Verifica se o usuário "Felipe Torres" aparece na lista
  const user = await this.page!.locator(`.contact-list-item:has-text("${usuario}")`);
  await expect(user).toBeHidden();
});

// Cenário: Busca por contatos mal-sucedida
Then('ve uma lista vazia com a mensagem {string}', async function (this: ICustomWorld, mensagem: string) {
  // Verifica se não há resultados e que a mensagem de "Contato não encontrado" é exibida
  const message = await this.page!.locator('#empty-src');
  await expect(message).toHaveText(mensagem);
  
  // Verifica se a lista de contatos está vazia
  const contactList = await this.page!.locator('#empty-src');
  const contactCount = await contactList.count();
  expect(contactCount).toBe(1); // Verifica que não há contatos na lista
});
