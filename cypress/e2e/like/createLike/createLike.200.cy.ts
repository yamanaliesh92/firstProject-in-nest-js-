import { faker } from '@faker-js/faker';
import { RegiseterRes, ResLike, ResponseCreatePost } from 'sdk/myApi';

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
          cy.request<ResLike>({
            method: 'POST',
            headers: { auth: resUser.body.token },
            url: `${baseUrl}/like`,
            body: { postId: resPost.body.post.id },
          }).then((resLike) => {
            console.log('r', resLike);
          });
        });
      },
    );
  });
});
