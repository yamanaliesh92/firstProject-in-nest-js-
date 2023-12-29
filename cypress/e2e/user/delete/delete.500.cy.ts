import { IResponseError } from './../login/login.404.cy';
import { RegiseterRes } from './../../../../sdk/myApi';
import { faker } from '@faker-js/faker';

describe('s', () => {
  it('delete must be return 500', () => {
    const id = 4444;
    const baseUrl = Cypress.config('baseUrl');
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.name.firstName();
    const body = { email, password, username };
    cy.request<RegiseterRes>({
      method: 'POST',
      url: `${baseUrl}/user/sign`,
      body: body,
    }).then((res) => {
      cy.request<IResponseError>({
        method: 'DELETE',
        headers: { auth: res.body.token },
        url: `${baseUrl}/user/del/${id}`,
        failOnStatusCode: false,
      }).then((Ress) => {
        console.log('REEEEEEee', Ress);
        expect(Ress.body.error).to.eq('Internal Server Error');
        expect(Ress.body.message).to.eq('no affected in databus');
        expect(Ress.body.statusCode).to.eq(500);
      });
    });
  });
});
