import { CheckInPage } from './app.po';

describe('check-in App', () => {
  let page: CheckInPage;

  beforeEach(() => {
    page = new CheckInPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
