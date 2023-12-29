import { faker } from '@faker-js/faker';
import { IResponseError } from 'cypress/e2e/user/login/login.404.cy';
import { RegiseterRes, ResLike, ResponseCreatePost } from 'sdk/myApi';

describe('getLike with 403', () => {
  it('403', () => {
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
              url: `${baseUrl}/like/${resLike.body.id}`,
              failOnStatusCode: false,
            }).then((resGetLike) => {
              expect(resGetLike.body.statusCode).to.eq(403);
              expect(resGetLike.body.error).to.eq('Forbidden');
            });
          });
        });
      },
    );
  });
});
