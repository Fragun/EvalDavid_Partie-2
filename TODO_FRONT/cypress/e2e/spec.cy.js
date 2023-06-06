describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Remplacez l'URL par l'URL de votre application
  });

  it("Ajoute une tâche et la supprime", () => {
    // Ajoute une tâche
    cy.get('[placeholder="Add a todo"]').type("Nouvelle tâche");
    cy.contains("Add").click();

    // Vérifie que la tâche est ajoutée à la liste
    cy.contains("Nouvelle tâche").should("be.visible");

    // Supprime la tâche
    cy.contains("Supprimer").click();

    // Vérifie que la tâche est supprimée de la liste
    cy.contains("Nouvelle tâche").should("not.exist");
  });

  it("Ajoute une tâche et la modifie", () => {
    // Ajoute une tâche
    cy.get('[placeholder="Add a todo"]').type("Todo à modifier");
    cy.contains("Add").click();

    // Clique sur le bouton "Edit"
    cy.contains("Modifier").click();

    // Modifie la valeur de la tâche
    cy.get('[placeholder="Edit a todo"]').clear().type("Todo modifié");

    // Clique sur le bouton "Save"
    cy.contains("Save").click();

    // Vérifie que la tâche est modifiée
    cy.contains("Todo modifié").should("be.visible");
  });

  it("Supprime tous les todos existants", () => {
    // Vérifie qu'il y a des todos dans la liste
    cy.get("ul li").should("exist");

    // Supprime tous les todos un par un
    cy.get("ul li").each(($li) => {
      cy.wrap($li).contains("Supprimer").click();
    });

    // Vérifie que tous les todos ont été supprimés
    cy.get("ul li").should("not.exist");
  });
});
