import { faker } from '@faker-js/faker';
import { IResponseError } from '../user/login/login.404.cy';

describe('F', () => {
  it('update must be return 403', () => {
    const username = faker.name.firstName();
    const baseUrl = Cypress.config('baseUrl');
    const dto = { username };
    cy.request<IResponseError>({
      method: 'PATCH',
      url: `${baseUrl}/user/update`,
      body: dto,
      failOnStatusCode: false,
    }).then((res) => {
      console.log('RRRRRRRRRRRrrr', res);
      expect(res.body.statusCode).to.eq(403);
      expect(res.body.error).to.eq('Forbidden');
      expect(res.body.message).to.eq('Forbidden resource');
    });
  });
});
