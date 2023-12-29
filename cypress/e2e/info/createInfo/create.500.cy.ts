import { faker } from '@faker-js/faker';
import { IResponseError } from 'cypress/e2e/user/login/login.404.cy';
import {
  CreateInfoDto,
  CreateInfoRes,
  CreateUserDto,
  RegiseterRes,
} from 'sdk/myApi';
describe('crateInfo with 500', () => {
  it('create info', () => {
    const baseUrl = Cypress.config('baseUrl');
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.datatype.string();
    const workAt = faker.datatype.string();
    const livesIn = faker.datatype.string();
    const country = faker.datatype.string();
    const relationShip = faker.datatype.string();
    const bodyInfo = { country, relationShip, livesIn };
    const boby: CreateUserDto = { email, password, username };
    cy.request<RegiseterRes>('POST', `${baseUrl}/user/sign`, boby).then(
      (res) => {
        cy.request<IResponseError>({
          method: 'POST',
          headers: { auth: res.body.token },
          url: `${baseUrl}/info`,
          body: bodyInfo,
          failOnStatusCode: false,
        }).then((resInfo) => {
          console.log('RESINFO', resInfo);
        });
      },
    );
  });
});
