import { faker } from '@faker-js/faker';
import { IResponseError } from 'cypress/e2e/user/login/login.404.cy';
import { RegiseterRes, ResLike, ResponseCreatePost } from 'sdk/myApi';

describe('createComment with 400', () => {
  it('Bad Request ', () => {
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
          cy.request<IResponseError>({
            method: 'POST',
            headers: { auth: resUser.body.token },
            url: `${baseUrl}/comment`,
            body: { postId: resPost.body.post.id },
            failOnStatusCode: false,
          }).then((resComment) => {
            expect(resComment.body.statusCode).to.eq(400);
            expect(resComment.body.error).to.eq('Bad Request');
            expect(resComment.body.message).to.include(
              'title should not be empty',
            );
          });
        });
      },
    );
  });
});
