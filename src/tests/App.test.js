import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from '@testing-library/user-event'

test("Testing elements on page ", async () => {
  render(<App />);

  const nameFilter = screen.getByTestId("name-filter");
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

  btnExcluir.forEach((e) => {
    userEvent.click(e)
  })
  

});