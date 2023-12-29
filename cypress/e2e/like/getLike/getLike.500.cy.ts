import { faker } from '@faker-js/faker';
import { IResponseError } from 'cypress/e2e/user/login/login.404.cy';
import { RegiseterRes, ResLike, ResponseCreatePost } from 'sdk/myApi';

describe('getLike with 500', () => {
  it('500', () => {
    const baseUrl = Cypress.config('baseUrl');
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.datatype.string();
    const bodyUser = { email, password, username };
    const title = faker.datatype.string();
    const desc = faker.datatype.string();
    const bodyPost = { title, desc };
    cy.request<RegiseterRes>('POST', `${baseUrl}/user/sign`, bodyUser).then(
      (resUser) => {
        cy.request<ResponseCreatePost>({
          method: 'POST',
          headers: { auth: resUser.body.token },
          url: `${baseUrl}/post`,
          body: bodyPost,
        }).then((resPost) => {
          cy.request({
            method: 'POST',
            headers: { auth: resUser.body.token },
            url: `${baseUrl}/like`,
            body: { postId: resPost.body.post.id },
          }).then((resLike) => {
            cy.request<IResponseError>({
              method: 'GET',
              headers: { auth: resUser.body.token },
              url: `${baseUrl}/like/${4004444444444404}`,
              failOnStatusCode: false,
            }).then((resGetLike) => {
              expect(resGetLike.body.message).to.eq('Internal server error');
              expect(resGetLike.body.statusCode).to.eq(500);
            });
          });
        });
      },
    );
  });
});
