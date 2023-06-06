import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App"; 

test("Ajoute et supprime une todo", async () => {
  render(<App />);

  // Verify initial state
  expect(screen.queryByText("Aucune todo pour le moment")).toBeInTheDocument();

  // Add a new todo
  fireEvent.change(screen.getByPlaceholderText("Add a todo"), {
    target: { value: "New Todo" },
  });
  fireEvent.click(screen.getByText("Add"));

  // Verify the new todo is added
  await waitFor(() => { 
    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  // Delete the todo
  fireEvent.click(screen.getByText("Supprimer"));

  // Verify the todo is deleted
  await waitFor(() => { 
    expect(screen.queryByText("New Todo")).not.toBeInTheDocument();   
  });
});
 