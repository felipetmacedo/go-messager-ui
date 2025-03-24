import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../support/custom-world";

// Aumenta o tempo limite padrão para 20 segundos
setDefaultTimeout(20000);

Given(
  "o usuário {string} está na página {string}",
  async function (this: ICustomWorld, usuario: string, pagina: string) {
    await this.page!.goto(`http://localhost:8080/${pagina}`);
  }
);

Given("possui chats ativos", async function (this: ICustomWorld) {
  // Simula a resposta da API com chats ativos
  await this.page!.route("**/api/chats", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          id: "chat_1",
          name: "Chat 1",
          lastMessage: "Última mensagem do Chat 1",
        },
        {
          id: "chat_2",
          name: "Chat 2",
          lastMessage: "Última mensagem do Chat 2",
        },
      ]),
    });
  });
});

Given(
  "não há chats ativos para esse usuário",
  async function (this: ICustomWorld) {
    // Simula a resposta da API sem chats ativos
    await this.page!.route("**/api/chats", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });
  }
);

When(
  "está na página {string}",
  async function (this: ICustomWorld, pagina: string) {
    await this.page!.goto(`http://localhost:8080/${pagina}`);
  }
);

Then(
  "o usuário vê os chats na lista em ordem de mensagem mais recente",
  async function (this: ICustomWorld) {
    const chatList = this.page!.locator(".chat-list-item");
    await expect(chatList).toHaveCount(2);
    await expect(chatList.nth(0)).toContainText("Última mensagem do Chat 1");
    await expect(chatList.nth(1)).toContainText("Última mensagem do Chat 2");
  }
);

Then(
  "o usuário vê a mensagem {string}",
  async function (this: ICustomWorld, mensagem: string) {
    const emptyMessage = this.page!.locator(".empty-chat-message");
    await expect(emptyMessage).toHaveText(mensagem);
  }
);

When(
  "clica no chat {string}",
  async function (this: ICustomWorld, chatId: string) {
    const chatItem = this.page!.locator(`.chat-list-item[data-id="${chatId}"]`);
    await chatItem.click();
  }
);

Then(
  "o usuário entra no detalhamento da conversa do {string}",
  async function (this: ICustomWorld, chatId: string) {
    await expect(this.page!).toHaveURL(new RegExp(`/chat/${chatId}$`));
  }
);
