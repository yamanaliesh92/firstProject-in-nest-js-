import { faker } from '@faker-js/faker';
import { IResponseError } from 'cypress/e2e/user/login/login.404.cy';
import { RegiseterRes, ResLike, ResponseCreatePost } from 'sdk/myApi';

describe('deleteLike with 500', () => {
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
              method: 'DELETE',
              headers: { auth: resUser.body.token },
              url: `${baseUrl}/like/${500011}`,
              failOnStatusCode: false,
            }).then((resDeleteLiek) => {
              expect(resDeleteLiek.body.statusCode).to.eq(404),
                expect(resDeleteLiek.body.error).to.eq('Not Found');
            });
          });
        });
      },
    );
  });
});
