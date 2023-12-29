import { faker } from '@faker-js/faker';
import {
  LoginUserDto,
  LoginRes,
  CreateUserDto,
  RegiseterRes,
} from '../../../../sdk/myApi';
describe('login', () => {
  it('test Login is successfuly', () => {
    const baseUrl = Cypress.config('baseUrl');
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.name.fullName();
    const bodyRegister: CreateUserDto = { email, password, username };
    const body: LoginUserDto = { email, password };
    cy.request<RegiseterRes>('POST', `${baseUrl}/user/sign`, bodyRegister).then(
      (res) => {
        cy.request<LoginRes>('POST', `${baseUrl}/user/login`, body).then(
          (Res) => {
            console.log('REs', Res);
            expect(Res.body.token).to.exist;
          },
        );
      },
    );
  });
});
