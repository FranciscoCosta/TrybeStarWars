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
    arrayData,
    arrayFilters,
    handleDelete,
    operator,
    handleRemoveAll,
    handleOrder,
  } = useContext(Context);

  return (
    <main>
      <input
        type="text"
        data-testid="name-filter"
        value={ FilterByName }
        onChange={ handleChange }
        placeholder="planets"
      />
      <select data-testid="column-filter" onChange={ handleTypeOfFilter }>
        {arrayData.map((value) => (
          <option value={ value } key={ value }>{value}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ operator }
        onChange={ handleOperator }
      >
        <option label="maior que" value="maior que">
          maior que
        </option>
        <option label="menor que" value="menor que">
          menor que
        </option>
        <option label="igual a" value="igual a">
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
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleRemoveAll }
      >
        Remove all
      </button>
      <select data-testid="column-sort">
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="order-asc">
        ASC
        <input
          type="radio"
          id="order-asc"
          name="order"
          data-testid="column-sort-input-asc"
          value="ASC"
        />
      </label>
      <label htmlFor="order-desc">
        DESC
        <input
          type="radio"
          id="order-desc"
          name="order"
          data-testid="column-sort-input-desc"
          value="DESC"
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleOrder }
      >
        Order

      </button>
      {arrayFilters.map((filter) => (
        <div key={ filter } name={ filter } data-testid="filter">
          <p>
            {`Filter : ${filter.typeOfFilter} ${filter.operator} ${filter.valueFilter}`}

          </p>
          <button
            type="button"
            onClick={ handleDelete }
            value={ filter.typeOfFilter }
            data-testid="button-remove-filter"
          >
            Apagar

          </button>

        </div>
      ))}
    </main>
  );
}

export default Filters;
