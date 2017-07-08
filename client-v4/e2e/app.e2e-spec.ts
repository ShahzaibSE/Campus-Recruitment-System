import { ClientV4Page } from './app.po';

describe('client-v4 App', () => {
  let page: ClientV4Page;

  beforeEach(() => {
    page = new ClientV4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
