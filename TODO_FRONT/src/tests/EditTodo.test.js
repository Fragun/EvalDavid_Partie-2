import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditTodo from "../components/EditTodo";

test("Ne se modifie pas si l'input est vide", () => { 
  const todo = {
    id: 2000,
    content: "Old Todo",
    edit: true,
  };
  const updateTodoMock = jest.fn();
  render(<EditTodo todo={todo} updateTodo={updateTodoMock} />);

  const input = screen.getByPlaceholderText("Edit a todo");
  const saveButton = screen.getByText("Save");

  fireEvent.change(input, { target: { value: "" } }); //remplit l'input avec une chaine vide
  fireEvent.click(saveButton);

  expect(updateTodoMock).not.toHaveBeenCalled(); //on vérifie que la fonction n'a pas était appellée
});

  