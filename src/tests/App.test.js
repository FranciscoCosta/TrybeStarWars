import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from '@testing-library/user-event';

test("Testing elements on page ", async () => {
  render(<App />);

  const nameFilter = screen.getByTestId("name-filter");
  const columnFilter = screen.getByTestId("column-filter");
  const comparisonFilter = screen.getByTestId("comparison-filter");
  const valueFilter = screen.getByTestId("value-filter");
  const buttonFilter = screen.getByTestId("button-filter");
  const buttonRemoveFilters = screen.getByTestId("button-remove-filters");
  const columnSort = screen.getByTestId("column-sort");
  const columnSortInputAsc = screen.getByTestId("column-sort-input-asc");
  const columnSortInputDesc = screen.getByTestId("column-sort-input-desc");
  const columnSortButton = screen.getByTestId("column-sort-button");
  // const table = screen.getByTestId("tabel-1");

  expect(nameFilter).toBeInTheDocument();
  expect(comparisonFilter).toBeInTheDocument();
  expect(valueFilter).toBeInTheDocument();
  expect(buttonFilter).toBeInTheDocument();
  expect(buttonRemoveFilters).toBeInTheDocument();
  expect(columnSort).toBeInTheDocument();
  expect(columnSortInputAsc).toBeInTheDocument();
  expect(columnSortInputDesc).toBeInTheDocument();
  expect(columnSortButton).toBeInTheDocument();
  expect(columnFilter).toBeInTheDocument();
  
  // expect(table).toBeInTheDocument();


});

test('If addding filter -> button remove apears', async () => {
  render(<App />);

  
  userEvent.click(screen.getByTestId('button-filter'));
  await screen.findByTestId('filter');
  const btnExcluir = screen.getByRole('button', {
    name: /Apagar/i
  })
  expect(btnExcluir).toBeInTheDocument();

  userEvent.click(btnExcluir);
  
});

it('If it fetch data and get elements', async () => {
  render(<App />);
  const planetTat = await screen.findByText(/tatooine/i, {}, {timeout: 4000});
  expect(planetTat).toBeInTheDocument();

});

it("If select and filters are working", async () => {
  render(<App />);
  const espera  = await screen.findByText(/tatooine/i, {}, {timeout: 4000});
  expect(espera).toBeInTheDocument();

  const nameFilter = screen.getByTestId("name-filter");
  const columnFilter = screen.getByTestId("column-filter");
  const comparisonFilter = screen.getByTestId("comparison-filter");
  const valueFilter = screen.getByTestId("value-filter");
  const buttonFilter = screen.getByTestId("button-filter");
  const buttonRemoveFilters = screen.getByTestId("button-remove-filters");
  const columnSortButton = screen.getByTestId("column-sort-button");

  userEvent.selectOptions(columnFilter, "diameter");
  userEvent.selectOptions(comparisonFilter, "maior que");
  userEvent.type(valueFilter, "100");
  userEvent.click(buttonFilter);

  userEvent.selectOptions(columnFilter, "population");
  userEvent.selectOptions(comparisonFilter, "menor que");
  userEvent.type(valueFilter, "1000");
  userEvent.click(buttonFilter);

  userEvent.selectOptions(columnFilter, "surface_water");
  userEvent.selectOptions(comparisonFilter, "igual a");
  userEvent.type(valueFilter, "300");
  userEvent.click(buttonFilter);

  userEvent.type(nameFilter, "Tat");
  userEvent.click(buttonRemoveFilters);
  userEvent.click(columnSortButton);

})