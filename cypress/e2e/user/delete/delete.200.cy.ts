import { RegiseterRes } from '../../../../sdk/myApi';
import { faker } from '@faker-js/faker';
describe('delete', () => {
  it('delete user is successfuly', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.datatype.string();
    const id = 44;
    const body = { password, email, username };
    const baseUrl = Cypress.config('baseUrl');
    cy.request<RegiseterRes>('POST', `${baseUrl}/user/sign`, body).then(
      (Res) => {
        cy.request({
          method: 'Delete',
          headers: { auth: Res.body.token },
          url: `${baseUrl}/user/del/${id}`,
        }).then((res) => {
          console.log('Resdlete', res);
        });
      },
    );
  });
});
