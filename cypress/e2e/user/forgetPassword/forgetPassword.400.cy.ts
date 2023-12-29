import { CreateUserDto, RegiseterRes } from './../../../../sdk/myApi';
import { faker } from '@faker-js/faker';
import { IResponseError } from '../login/login.404.cy';

describe('test forgetPassword with 400', () => {
  it('Bad Request', () => {
    const email = faker.internet.email();
    const baseUrl = Cypress.config('baseUrl');
    const password = faker.internet.password();
    const username = faker.internet.userName();
    const body: CreateUserDto = { email, password, username };

    cy.request<RegiseterRes>('POST', `${baseUrl}/user/sign`, body).then(
      (res) => {
        cy.request<IResponseError>({
          method: 'PATCH',
          url: `${baseUrl}/user/forget`,
          failOnStatusCode: false,
        }).then((ress) => {
          expect(ress.body.error).to.eq('Bad Request');
          expect(ress.body.statusCode).to.exist;
          expect(ress.body.message).to.include('email must be a string');
        });
      },
    );
  });
});
