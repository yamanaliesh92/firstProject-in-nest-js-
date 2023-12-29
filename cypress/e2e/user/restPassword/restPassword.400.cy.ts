import { CreateUserDto, RegiseterRes } from '../../../../sdk/myApi';
import { faker } from '@faker-js/faker';
import { IResponseError } from '../login/login.404.cy';

interface ISecret {
  value: string;
}
export interface IRespone {
  result: {
    email: string;
    secret: ISecret;
  };
}
describe('test restPassword with 400', () => {
  it('test 400', () => {
    const email = faker.internet.email();
    const baseUrl = Cypress.config('baseUrl');
    const password = faker.internet.password();
    const newPassword = faker.internet.password();
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
          const bodyRestPassword = { newPassword, email };
          cy.request<IResponseError>({
            method: 'PATCH',
            url: `${baseUrl}/user/rest`,
            body: bodyRestPassword,
            failOnStatusCode: false,
          }).then((resRestPasswor) => {
            expect(resRestPasswor.body.error).to.eq('Bad Request');
            expect(resRestPasswor.body.statusCode).to.exist;
            expect(resRestPasswor.body.message).to.include(
              'secret must be a string',
            );
          });
        });
      },
    );
  });
});
