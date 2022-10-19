import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import getPlantesStarwars from '../Services/servicesApi';

export const Context = createContext();

function Provider({ children }) {
  const [planets, setplanets] = useState([]);
  const [planetFilter, setPlanetFilter] = useState('');

  useEffect(() => {
    const getData = async () => {
      const data = await getPlantesStarwars();
      const { results } = data;
      results.map((planet) => delete planet.residents);
      setplanets(results);
    };
    getData();
  }, []);

  Provider.propTypes = {
    children: PropTypes.element,
  };
  Provider.defaultProps = {
    children: <>default</>,
  };

  const handleChange = ({ target: { value } }) => {
    setPlanetFilter(value);
  };

  const context = useMemo(() => ({
    planetFilter, planets, handleChange }), [planetFilter, planets]);

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}

export default Provider;
