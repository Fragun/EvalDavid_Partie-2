describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Supprime tous les todos si existants", () => {
    // Vérifie qu'il y a des todos dans la liste
    cy.get("ul li").should("exist").then(($li) => {
   
      // Supprime tous les todos présents dans la liste
      cy.get("ul li").each(($li) => {
        cy.wrap($li).contains("Supprimer").click();
      });
    })

    // Vérifie que tous les todos ont été supprimés
    cy.get("ul li").should("not.exist");
  });

  it("Ajoute une tâche et la supprime", () => {
    // Ajoute une tâche
    cy.get('[placeholder="Add a todo"]').type("Mettre du sel");
    cy.contains("Add").click();

    // Vérifie que la tâche est ajoutée à la liste
    cy.contains("Mettre du sel").should("be.visible");

    cy.wait(1000);

    // Supprime la tâche
    cy.contains("Supprimer").click();

    // Vérifie que la tâche est supprimée de la liste
    cy.contains("Mettre du sel").should("not.exist");
  });

  it("Ajoute une tâche et la modifie", () => {
    // Ajoute une tâche
    cy.get('[placeholder="Add a todo"]').type("Todo à modifier");
    // Clique sur le bouton "Add"
    cy.contains("Add").click();
    cy.wait(1000);
    // Clique sur le bouton "Modifier"
    cy.contains("Modifier").click();

    // Modifie la valeur de la tâche
    cy.get('[placeholder="Edit a todo"]').clear().type("Todo modifié");

    // Clique sur le bouton "Save"
    cy.contains("Save").click();

    // Vérifie que la tâche est modifiée
    cy.contains("Todo modifié").should("be.visible");
  });
});
