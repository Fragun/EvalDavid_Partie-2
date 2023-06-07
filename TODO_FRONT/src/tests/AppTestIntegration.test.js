import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

test("Ajoute et supprime une todo", async () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText("Add a todo"), {
    target: { value: "Nouvelle tâche" },
  });
  fireEvent.click(screen.getByText("Add"));

  await waitFor(() => {
    expect(screen.getByText("Nouvelle tâche")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Supprimer"));

  await waitFor(() => {
    expect(screen.queryByText("Nouvelle tâche")).not.toBeInTheDocument(); 
  });
});
