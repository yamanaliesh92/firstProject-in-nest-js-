import { faker } from '@faker-js/faker';
import { IResponseError } from 'cypress/e2e/user/login/login.404.cy';
import { CreateUserDto, RegiseterRes } from 'sdk/myApi';
describe('crateInfo with 400', () => {
  it('create', () => {
    const baseUrl = Cypress.config('baseUrl');
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.datatype.string();
    // const workAt = faker.datatype.string();
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
          expect(resInfo.body.statusCode).to.eq(400);
          expect(resInfo.body.error).to.eq('Bad Request');
          expect(resInfo.body.message).to.include('workAt must be a string');
          expect(resInfo.body.message).to.include('workAt should not be empty');
        });
      },
    );
  });
});
