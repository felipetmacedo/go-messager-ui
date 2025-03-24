import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

// Aumenta o tempo limite padrão para 20 segundos
setDefaultTimeout(20000);

Given('o usuário {string} está na página {string} com chats disponíveis', async function (this: ICustomWorld, usuario: string, pagina: string) {
    await this.page!.goto(`http://localhost:8080/${pagina}`);
    // Simula a resposta da API com chats disponíveis
    await this.page!.route('**/api/chats', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([
                { id: 'chat_1', name: 'Chat 1', lastMessage: 'Mensagem do Chat 1' },
                { id: 'chat_2', name: 'Chat 2', lastMessage: 'Mensagem do Chat 2' },
                { id: 'chat_3', name: 'Chat 3', lastMessage: 'Mensagem do Chat 3' }
            ])
        });
    });
});

When('o usuário pesquisa por {string}', async function (this: ICustomWorld, termo: string) {
    const searchInput = this.page!.locator('.chat-search-input');
    await searchInput.fill(termo);
    await searchInput.press('Enter');
});

Then('o usuário vê apenas os chats que correspondem ao termo {string}', async function (this: ICustomWorld, termo: string) {
    const chatList = this.page!.locator('.chat-list-item');
    const visibleChats = await chatList.allTextContents();
    visibleChats.forEach(chat => {
        expect(chat.toLowerCase()).toContain(termo.toLowerCase());
    });
});

Then('o usuário vê a mensagem {string} quando nenhum chat corresponde ao termo', async function (this: ICustomWorld, mensagem: string) {
    const emptyMessage = this.page!.locator('.empty-chat-message');
    await expect(emptyMessage).toHaveText(mensagem);
});