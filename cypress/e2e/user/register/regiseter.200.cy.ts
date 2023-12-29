import { faker } from '@faker-js/faker';
import { CreateUserDto, RegiseterRes } from '../../../../sdk/myApi';
interface IResponse {
  email: string;
  username: string;
  password: string;
}

describe('hh', () => {
  it('test regiseter is successfuly', () => {
    const baseUrl = Cypress.config('baseUrl');
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.name.fullName();
    const body: CreateUserDto = { email, password, username };

    cy.request<RegiseterRes>('POST', `${baseUrl}/user/sign`, body).then(
      (res) => {
        console.log('res', res);
        expect(res.body.user.email).to.exist;
        expect(res.body.user.password).exist;
        expect(res.body.user.username).exist;
        expect(res.body.user.username).to.equal(body.username);
        expect(res.body.user.username).to.be.string;
      },
    );
  });
});
