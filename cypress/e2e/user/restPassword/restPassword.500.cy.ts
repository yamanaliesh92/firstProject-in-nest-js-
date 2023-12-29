import { faker } from '@faker-js/faker';
import { IResponseError } from '../login/login.404.cy';

describe('restPassword with 500', () => {
  it('500', () => {
    const email = 'sss@gamil.com';
    const password = faker.internet.password();
    const secret = faker.datatype.string();

    const baseUrl = Cypress.config('baseUrl');
    const body = { email, password, secret };

    cy.request<IResponseError>({
      method: 'PATCH',
      url: `${baseUrl}/user/rest`,
      failOnStatusCode: false,
      body: body,
    }).then((resRestPasswor) => {
      console.log('r', resRestPasswor);
      expect(resRestPasswor.body.statusCode).to.eq(500);
      expect(resRestPasswor.body.message).to.eq('Internal server error');
    });
  });
});
