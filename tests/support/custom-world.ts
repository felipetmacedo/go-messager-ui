import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { BrowserContext, Page, PlaywrightTestOptions } from '@playwright/test';

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

export interface ICustomWorld extends World {
  existingUserEmail: string;
  context?: BrowserContext;
  page?: Page;
  playwrightOptions?: PlaywrightTestOptions;
}

export class CustomWorld extends World implements ICustomWorld {
  context?: BrowserContext;
  page?: Page;
  playwrightOptions?: PlaywrightTestOptions;

  constructor(options: IWorldOptions & CucumberWorldConstructorParams) {
    super(options);
    this.context = undefined;
    this.page = undefined;
    this.playwrightOptions = undefined;
  }
  existingUserEmail!: string;
}

setWorldConstructor(CustomWorld);
