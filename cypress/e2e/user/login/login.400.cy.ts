import { faker } from '@faker-js/faker';
import { IResponseError } from './login.404.cy';

describe('FF', () => {
  it('login must be return 400', () => {
    const baseUrl = Cypress.config('baseUrl');
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.name.firstName();
    const body = { email, password, username };
    const bodyLogin = { email, password: undefined };
    cy.request('POST', `${baseUrl}/user/sign`, body).then((res) => {
      cy.request<IResponseError>({
        method: 'POST',
        url: `${baseUrl}/user/login`,
        body: bodyLogin,
        failOnStatusCode: false,
      }).then((Res) => {
        expect(Res.body.error).to.eq('Bad Request');
        expect(Res.body.message).to.include('password must be a string');
      });
    });
  });
});
