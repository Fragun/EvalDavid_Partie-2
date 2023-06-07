import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddTodo from "../components/AddTodo";

test("Ajoute une todo lorsque le bouton est cliqué", async () => {
  const addTodoMock = jest.fn(); // création fonction simulée (addTodoMock) à l'aide de jest.fn() pour simuler la fonction addTodo passée en tant que prop.
  render(<AddTodo addTodo={addTodoMock} />); //on render le composant AddTodo avec addTodoMock en tant que prop addTodo.

  const input = screen.getByPlaceholderText("Add a todo"); //selection de l'input avec le placeholder grâce à getByPlaceholderText de React Testing Library
  const addButton = screen.getByText("Add"); // idem pour la selection du bouton
  //fireEvent pour déclancher un événement
  fireEvent.change(input, { target: { value: "Sel Adoucisseur" } }); //on simule que l'utilisateur saisit 'Sel Adoucisseur'
  fireEvent.click(addButton); // déclenchement du clic

  await waitFor(() => {
    //permet d'attendre que les fonctions asynchrones soient effectuées
    expect(addTodoMock).toHaveBeenCalledTimes(1); //vérifie que addTodoMock est appellé une fois
    expect(addTodoMock).toHaveBeenCalledWith(
      expect.objectContaining({ content: "Sel Adoucisseur" })
    );
  }); // vérifie que la fonction est appellé avec un objet contenant la propriété content ayant la valeur "Sel Adoucisseur"
});

test("Ajoute une todo lorsqu'on presse Enter", async () => {
  const addTodoMock = jest.fn();
  render(<AddTodo addTodo={addTodoMock} />);

  const input = screen.getByPlaceholderText("Add a todo");

  fireEvent.change(input, { target: { value: "Patate" } });
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" }); //déclenchement du bouton enter

  await waitFor(() => {
    expect(addTodoMock).toHaveBeenCalledTimes(1);
    expect(addTodoMock).toHaveBeenCalledWith(
      expect.objectContaining({ content: "Patate" })
    );
  });
});

test("Ne doit pas ajouter de todo lorsque l'imput est vide", () => {
  const addTodoMock = jest.fn();
  render(<AddTodo addTodo={addTodoMock} />);
  
  fireEvent.click(screen.getByText("Add")); // on simule le clic sur le bouton

  expect(addTodoMock).not.toHaveBeenCalled(); // vérifie que la fonction n'a pas été appellée
});

test("un message doit apparaitre (Chargement en cours ...) lors de l'ajout d'une todo", async () => {
  const addTodoMock = jest.fn();
  render(<AddTodo addTodo={addTodoMock} />);

  const input = screen.getByPlaceholderText("Add a todo");
  const addButton = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "Carotte" } });
  fireEvent.click(addButton);

  const loadingMessage = screen.getByText("Chargement en cours ...");
  expect(loadingMessage).toBeInTheDocument(); //vérifie la présence du texte 'changement en cours...' dans le DOM

  await waitFor(() => {
    expect(
      screen.queryByText("Chargement en cours ...")
    ).not.toBeInTheDocument(); //Vérifie que le texte disparait du dom
  });
});

test("Un message d'erreur apparait lors d'un problème d'ajout de todo", async () => {
  const addTodoMock = jest.fn(() => {
    throw new Error("Failed to add todo"); // lève un erreur qui simule l'échec d'un ajout de todo
  });
  render(<AddTodo addTodo={addTodoMock} />);

  const input = screen.getByPlaceholderText("Add a todo");
  const addButton = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "Test todo" } });
  fireEvent.click(addButton);

  const errorMessage = await screen.findByText("Une erreur est survenue");
  expect(errorMessage).toBeInTheDocument(); //on vérifie de le message d'erreur aparaisse
});
