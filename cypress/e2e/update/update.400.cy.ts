import { faker } from '@faker-js/faker';
import { IResponseError } from '../user/login/login.404.cy';
import { CreateUserDto, RegiseterRes } from './../../../sdk/myApi';

describe('sa', () => {
  it('update must be return 400', () => {
    const baseUrl = Cypress.config('baseUrl');
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.name.fullName();

    const body: CreateUserDto = { email, password, username };

    cy.request<RegiseterRes>('POST', `${baseUrl}/user/sign`, body).then(
      (REs) => {
        cy.request<IResponseError>({
          method: 'PATCH',
          headers: { auth: REs.body.token },
          url: `${baseUrl}/user/update`,

          failOnStatusCode: false,
        }).then((res) => {
          expect(res.status).to.eq(400);
          expect(res.statusText).to.eq('Bad Request');
          expect(res.body.statusCode).to.exist;
          expect(res.body.message).to.include('username must be a string');
        });
      },
    );
  });
});
