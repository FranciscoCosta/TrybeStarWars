import React, { useContext } from 'react';
import { Context } from '../Context/Context';

function Filters() {
  const { planetFilter, handleChange } = useContext(Context);
  return (
    <main>
      <input
        type="text"
        data-testid="name-filter"
        value={ planetFilter }
        onChange={ handleChange }
      />
    </main>
  );
}

export default Filters;
