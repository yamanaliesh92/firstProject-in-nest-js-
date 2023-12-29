import { faker } from '@faker-js/faker';
interface IResponeError {
  statusCode: number;
  message: string[];
  error: string;
}

describe('ff', () => {
  it('register with 400', () => {
    const baseUrl = Cypress.config('baseUrl');
    const email = faker.internet.email();
    const password = faker.internet.password();
    const body = { email, password };
    cy.request<IResponeError>({
      method: 'POST',
      url: `${baseUrl}/user/sign`,
      body: body,
      failOnStatusCode: false,
    }).then((res) => {
      console.log('Res', res);
      expect(res.status).to.eq(400);
      expect(res.statusText).to.eq('Bad Request');
      expect(res.body.statusCode).to.exist;
      expect(res.body.message).to.include('username must be a string');
    });
  });
});
