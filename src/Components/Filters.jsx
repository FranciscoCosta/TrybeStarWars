import React, { useContext } from 'react';
import { Context } from '../Context/Context';

function Filters() {
  const {
    FilterByName,
    handleChange,
    handleTypeOfFilter,
    handleOperator,
    handleValueFilter,
    handleFilters,
    valueFilter,
  } = useContext(Context);

  return (
    <main>
      <input
        type="text"
        data-testid="name-filter"
        value={ FilterByName }
        onChange={ handleChange }
      />

      <select data-testid="column-filter" onChange={ handleTypeOfFilter }>
        <option label="population" value="population">
          population
        </option>
        <option label="orbital_period" value="orbital_period">
          orbital_period
        </option>
        <option label="diameter" value="diameter">
          diameter
        </option>
        <option label="rotation_period" value="rotation_period">
          rotation_period
        </option>
        <option label="surface_water" value="surface_water">
          surface_water
        </option>
      </select>
      <select data-testid="comparison-filter" onChange={ handleOperator }>
        <option label="maior que" value="maior que">
          maior que
        </option>
        <option label="menor que" value="menor que">
          menor que
        </option>
        <option label="diameter" value="igual a">
          igual a
        </option>
      </select>
      <input
        type="number"
        name="number"
        value={ valueFilter }
        data-testid="value-filter"
        onChange={ handleValueFilter }
      />
      <button type="button" data-testid="button-filter" onClick={ handleFilters }>
        Filter
      </button>
    </main>
  );
}

export default Filters;
