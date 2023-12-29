import { faker } from '@faker-js/faker';
import { CreateUserDto, RegiseterRes } from 'sdk/myApi';

describe('sa', () => {
  it('update user is successfuly', () => {
    const baseUrl = Cypress.config('baseUrl');
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.name.fullName();
    const id = 4;
    const body: CreateUserDto = { email, password, username };
    const dto = { username };
    cy.request<RegiseterRes>('POST', `${baseUrl}/user/sign`, body).then(
      (res) => {
        cy.request({
          method: 'PATCH',
          headers: { auth: res.body.token },
          url: `${baseUrl}/user/update`,
          body: dto,
          failOnStatusCode: false,
        }).then((Ress) => {
          console.log('RRRRRRRRRRrrr', Ress);
          expect(Ress.status).to.eq(200);
        });
      },
    );
  });
});
