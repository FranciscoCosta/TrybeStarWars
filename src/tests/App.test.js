import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("Testing filter rendering ", async () => {
  render(<App />);

  const input = screen.getAllByRole("textbox");
  const select = screen.getAllByRole("combobox")
  const placeholder = screen.getByPlaceholderText(/planets/i);
  const nameFilter = screen.getByTestId("name-filter");
  const columnFilter = screen.getByTestId("column-filter");
  const comparisonFilter = screen.getByTestId("comparison-filter");
  const valueFilter = screen.getByTestId("value-filter");
  const buttonFilter = screen.getByTestId("button-filter");
  const botaoFilter = screen.getByRole("button", {
    name: /Filter/i,
  });
  expect(input).toBeInTheDocument();
  expect(select).toBeInTheDocument();
  expect(placeholder).toBeInTheDocument();
  expect(nameFilter).toBeInTheDocument();
  expect(columnFilter).toBeInTheDocument();
  expect(comparisonFilter).toBeInTheDocument();
  expect(valueFilter).toBeInTheDocument();
  expect(buttonFilter).toBeInTheDocument();
  expect(botaoFilter).toBeInTheDocument();
  expect(input.length).toBe(1);
  expect(select.length).toBe(2);

  const inputPlanet = screen.getByPlaceholderText('planets');
  const buttonFiltro = screen.getByRole('button', {
    name: /filter/i,
  });

});
