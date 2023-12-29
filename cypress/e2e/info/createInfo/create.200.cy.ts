import { faker } from '@faker-js/faker';
import {
  CreateInfoDto,
  CreateInfoRes,
  CreateUserDto,
  RegiseterRes,
} from 'sdk/myApi';
describe('crateInfo with 200', () => {
  it('create', () => {
    const baseUrl = Cypress.config('baseUrl');
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.datatype.string();
    const workAt = faker.datatype.string();
    const livesIn = faker.datatype.string();
    const country = faker.datatype.string();
    const relationShip = faker.datatype.string();
    const bodyInfo: CreateInfoDto = { workAt, country, relationShip, livesIn };
    const boby: CreateUserDto = { email, password, username };
    cy.request<RegiseterRes>('POST', `${baseUrl}/user/sign`, boby).then(
      (res) => {
        cy.request<CreateInfoRes>({
          method: 'POST',
          headers: { auth: res.body.token },
          url: `${baseUrl}/info`,
          body: bodyInfo,
        }).then((resInfo) => {
          console.log('RESINFO', resInfo);
          expect(resInfo.body.info.workAt).to.be.exist;
          expect(resInfo.body.info.livesIn).to.be.eq(livesIn);
          expect(resInfo.body.info.workAt).to.be.eq(workAt);
          expect(resInfo.body.info.country).to.be.eq(country);
          expect(resInfo.body.info.relationShip).to.be.eq(relationShip);
        });
      },
    );
  });
});
