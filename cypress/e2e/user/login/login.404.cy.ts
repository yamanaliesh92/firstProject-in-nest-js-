import { faker } from '@faker-js/faker';

export interface IResponseError {
  message: string[];
  statusCode: number;
  error: string;
}

describe('FF', () => {
  it('login must be return 404', () => {
    const baseUrl = Cypress.config('baseUrl');
    const email = faker.internet.email();
    const password = faker.internet.password();
    const body = { email, password };
    cy.request<IResponseError>({
      method: 'POST',
      url: `${baseUrl}/user/login`,
      body: body,
      failOnStatusCode: false,
    }).then((res) => {
      console.log('res', res);
      expect(res.status).to.exist;
      expect(res.body.statusCode).to.eq(500);
      expect(res.body.message).to.eq('Internal server error');
    });
  });
});
