import { faker } from '@faker-js/faker';
import { IResponseError } from 'cypress/e2e/user/login/login.404.cy';
describe('crateInfo with 403', () => {
  it('create', () => {
    const baseUrl = Cypress.config('baseUrl');

    const workAt = faker.datatype.string();
    const livesIn = faker.datatype.string();
    const country = faker.datatype.string();
    const relationShip = faker.datatype.string();
    const bodyInfo = { workAt, country, relationShip, livesIn };

    cy.request<IResponseError>({
      method: 'POST',

      url: `${baseUrl}/info`,
      body: bodyInfo,
      failOnStatusCode: false,
    }).then((resInfo) => {
      console.log('RESINFO', resInfo);
      expect(resInfo.body.statusCode).to.eq(403);
      expect(resInfo.body.error).to.eq('Forbidden');
      expect(resInfo.body.message).to.eq('Forbidden resource');
    });
  });
});
