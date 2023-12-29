import { IResponseError } from './../login/login.404.cy';
describe('rr', () => {
  it('delete with forbidden', () => {
    const baseUrl = Cypress.config('baseUrl');
    const id = 9;
    cy.request<IResponseError>({
      method: 'DELETE',
      url: `${baseUrl}/user/del/${id}`,
      failOnStatusCode: false,
    }).then((Res) => {
      console.log('REs', Res);
      expect(Res.body.statusCode).to.eq(403);
      expect(Res.body.error).to.eq('Forbidden');
    });
  });
});
