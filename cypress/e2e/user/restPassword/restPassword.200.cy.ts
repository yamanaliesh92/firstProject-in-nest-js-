import { CreateUserDto, RegiseterRes } from '../../../../sdk/myApi';
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
describe('test Password with 200', () => {
  it('test 200', () => {
    const email = faker.internet.email();
    const baseUrl = Cypress.config('baseUrl');
    const password = faker.internet.password();
    const newPassword = faker.datatype.json();
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
          const secret = ress.body.result.secret.value;
          const bodyRestPassword = { newPassword, secret, email };
          cy.request('PATCH', `${baseUrl}/user/rest`, bodyRestPassword).then(
            (resRestPasswor) => {
              expect(resRestPasswor.body).to.eq('change Password is done');
            },
          );
        });
      },
    );
  });
});
