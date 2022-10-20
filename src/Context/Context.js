import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import getPlantesStarwars from '../Services/servicesApi';

export const Context = createContext();

function Provider({ children }) {
  const [planets, setplanets] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [FilterByName, setFilterByName] = useState('');
  const [nameFilter, setnameFilter] = useState([]);
  const [typeOfFilter, settypeOfFilter] = useState('population');
  const [operator, setoperator] = useState('maior que');
  const [valueFilter, setvalueFilter] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = await getPlantesStarwars();
      const { results } = data;
      results.map((planet) => delete planet.residents);
      setplanets(results);
      setnameFilter(results);
      setisLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const newData = planets.filter((planet) => (
      planet.name.toLowerCase().includes(FilterByName.toLowerCase())));
    setnameFilter(newData);
  }, [FilterByName]);

  const handleTypeOfFilter = ({ target: { value } }) => {
    settypeOfFilter(value);
  };
  const handleOperator = ({ target: { value } }) => {
    setoperator(value);
  };
  const handleValueFilter = ({ target: { value } }) => {
    setvalueFilter(value);
  };

  const handleChange = ({ target: { value } }) => {
    setFilterByName(value);
  };
  const handleFilters = () => {
    if (operator === 'maior que') {
      const filterValue = nameFilter.filter(
        (x) => Number(x[typeOfFilter]) > Number(valueFilter),
      );
      setnameFilter(filterValue);
    }
    if (operator === 'menor que') {
      const filterValue = nameFilter.filter(
        (x) => Number(x[typeOfFilter]) < Number(valueFilter),
      );
      setnameFilter(filterValue);
    }
    if (operator === 'igual a') {
      const filterValue = nameFilter.filter(
        (x) => x[typeOfFilter] === valueFilter,
      );
      setnameFilter(filterValue);
    }
  };

  const context = useMemo(
    () => ({
      FilterByName,
      planets,
      isLoading,
      nameFilter,
      typeOfFilter,
      operator,
      valueFilter,
      handleChange,
      handleTypeOfFilter,
      handleOperator,
      handleValueFilter,
      handleFilters,
    }),
    [
      FilterByName,
      planets,
      isLoading,
      nameFilter,
      typeOfFilter,
      operator,
      valueFilter,
    ],
  );

  Provider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}

export default Provider;
