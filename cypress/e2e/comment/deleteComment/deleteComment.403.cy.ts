import { faker } from '@faker-js/faker';
import { IResponseError } from 'cypress/e2e/user/login/login.404.cy';
import { RegiseterRes, ResponseCreatePost } from 'sdk/myApi';

interface IResponseComment {
  id: number;
  title: number;
}

describe('create with 200', () => {
  it('200', () => {
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
          cy.request<IResponseComment>({
            method: 'POST',
            headers: { auth: resUser.body.token },
            url: `${baseUrl}/comment`,
            body: { title, postId: resPost.body.post.id },
          }).then((resComment) => {
            cy.request<IResponseError>({
              method: 'DELETE',
              url: `${baseUrl}/comment/del/${resComment.body.id}`,
              failOnStatusCode: false,
            }).then((ResDelete) => {
              console.log('Re', ResDelete);
              expect(ResDelete.status).to.eq(403);
              expect(ResDelete.body.error).to.eq('Forbidden');
            });
          });
        });
      },
    );
  });
});
