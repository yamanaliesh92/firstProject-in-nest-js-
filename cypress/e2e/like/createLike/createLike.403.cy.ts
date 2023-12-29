import { faker } from '@faker-js/faker';
import { IResponseError } from 'cypress/e2e/user/login/login.404.cy';
import { ResponseCreatePost } from 'sdk/myApi';

describe('createLike with 404', () => {
  it('404', () => {
    const baseUrl = Cypress.config('baseUrl');
    const title = faker.datatype.string();
    const desc = faker.datatype.string();
    const bodyPost = { title, desc };
    cy.request<ResponseCreatePost>({
      method: 'POST',
      url: `${baseUrl}/post`,
      body: bodyPost,
      failOnStatusCode: false,
    }).then((resPost) => {
      cy.request<IResponseError>({
        method: 'POST',
        url: `${baseUrl}/like`,
        body: { postId: 1 },
        failOnStatusCode: false,
      }).then((resLike) => {
        expect(resLike.body.statusCode).to.eq(403);
        expect(resLike.body.error).to.eq('Forbidden');
      });
    });
  });
});
