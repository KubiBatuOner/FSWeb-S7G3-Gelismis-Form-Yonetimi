//arrange
describe("My First Test", function () {
  //act
  it("Does not do much", function () {
    //assert
    expect(true).to.equal(true);
  });
});

describe("Second test", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Testlerden geçti mi?", function () {
    cy.get('[data-cy="buton"]').should("be.disabled");
    cy.get('[data-cy="isim"]').type("kubilay");
    cy.get('[data-cy="email"]').type("a@a.com");
    cy.get('[data-cy="sifre"]').type("123qewe");
    cy.get('[data-cy="kosul"]').check();
    cy.get("[data-cy=buton]").click();
    cy.get('[data-cy="form-submit"]').submit();
  });
});
