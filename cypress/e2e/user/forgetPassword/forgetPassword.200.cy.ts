import { CreateUserDto, RegiseterRes } from './../../../../sdk/myApi';
import { faker } from '@faker-js/faker';

interface ISecret {
  value: string;
}
export interface IRespone {
  result: {
    email: string;
    secret: ISecret;
  };
}
describe('test forgetPassword with 200', () => {
  it('test 200', () => {
    const email = faker.internet.email();
    const baseUrl = Cypress.config('baseUrl');
    const password = faker.internet.password();
    const username = faker.internet.userName();
    const body: CreateUserDto = { email, password, username };
    const bodyForgetPassword = { email };
    cy.request<RegiseterRes>('POST', `${baseUrl}/user/sign`, body).then(
      (res) => {
        cy.request<IRespone>(
          'PATCH',
          `${baseUrl}/user/forget`,
          bodyForgetPassword,
        ).then((ress) => {
          console.log('Rrs', ress);
          expect(ress.body.result.email).to.eq(email);
          expect(ress.body.result.secret).to.exist;
        });
      },
    );
  });
});
