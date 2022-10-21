import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import getPlantesStarwars from '../Services/servicesApi';

export const Context = createContext();

function Provider({ children }) {
  const [planets, setplanets] = useState([]);
  const [planetsFilterName, setplanetsFilterName] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [FilterByName, setFilterByName] = useState('');
  const [operator, setoperator] = useState('maior que');
  const [valueFilter, setvalueFilter] = useState(0);
  const [typeOfFilter, settypeOfFilter] = useState('population');
  const [arrayFilters, setfilterArray] = useState([]);
  const [arrayData, setarrayData] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [collum, setCollum] = useState('population');
  const [sort, setsort] = useState('ASC');
  const [orderSort, setorderSort] = useState({});
  useEffect(() => {
    const getData = async () => {
      const data = await getPlantesStarwars();
      const { results } = data;
      results.map((planet) => delete planet.residents);
      setplanets(results);
      setplanetsFilterName(results);
      setisLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const newPlanets = planets.filter(
      (planet) => planet.name.toLowerCase().includes(FilterByName.toLowerCase()),
    );
    setplanetsFilterName(newPlanets);
  }, [FilterByName]);

  useEffect(() => {
    const unknowArray = planetsFilterName.filter(
      (e) => e[collum] === 'unknown',
    );
    const knowArray = planetsFilterName.filter((e) => e[collum] !== 'unknown');
    if (orderSort.sort === 'ASC') {
      const arrayNew = knowArray.sort(
        (a, b) => a[orderSort.collum] - b[orderSort.collum],
      );
      setplanetsFilterName([...arrayNew, ...unknowArray]);
      setsort('DESC');
    }
    if (orderSort.sort === 'DESC') {
      const arrayNew = knowArray.sort(
        (a, b) => b[orderSort.collum] - a[orderSort.collum],
      );
      setplanetsFilterName([...arrayNew, ...unknowArray]);
      setsort('ASC');
    }
  }, [orderSort]);

  const filtering = () => {
    arrayFilters.forEach((filter) => {
      if (filter.operator === 'maior que') {
        const filterValue = planetsFilterName.filter(
          (par) => Number(par[filter.typeOfFilter]) > Number(filter.valueFilter),
        );
        setplanetsFilterName(filterValue);
      }
      if (filter.operator === 'menor que') {
        const filterValue = planetsFilterName.filter(
          (par) => Number(par[filter.typeOfFilter]) < Number(filter.valueFilter),
        );
        setplanetsFilterName(filterValue);
      }
      if (operator === 'igual a') {
        const filterValue = planetsFilterName.filter(
          (par) => par[filter.typeOfFilter] === valueFilter,
        );
        setplanetsFilterName(filterValue);
      }
    });
  };
  useEffect(() => {
    settypeOfFilter(arrayData[0]);
    filtering();
  }, [arrayFilters]);

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

  const handleCollum = ({ target: { value } }) => {
    setCollum(value);
  };

  const handleSort = ({ target: { value } }) => {
    setsort(value);
  };

  const handleRemoveAll = () => {
    setfilterArray([]);
    setarrayData([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setplanetsFilterName(planets);
  };

  const handleFilters = () => {
    const objFilter = {
      typeOfFilter,
      operator,
      valueFilter,
    };
    const newObjFilter = [...arrayFilters, objFilter];
    setfilterArray(newObjFilter);
    const addFilter = arrayData.filter((param) => param !== typeOfFilter);
    setarrayData(addFilter);
    console.log(arrayData);
  };

  const handleDelete = (event) => {
    const type = event.target.value;
    const newArray = [...arrayData, type];
    setarrayData(newArray);
    const teste = arrayFilters.filter((filtro) => filtro.typeOfFilter !== type);
    setplanetsFilterName(planets);
    setfilterArray(teste);
  };

  const handleOrder = () => {
    const order = {
      collum,
      sort,
    };
    setorderSort(order);
  };

  const context = useMemo(
    () => ({
      FilterByName,
      planets,
      isLoading,
      typeOfFilter,
      operator,
      valueFilter,
      arrayData,
      arrayFilters,
      planetsFilterName,
      collum,
      sort,
      handleCollum,
      handleSort,
      handleChange,
      handleTypeOfFilter,
      handleOperator,
      handleValueFilter,
      handleFilters,
      handleDelete,
      handleRemoveAll,
      handleOrder,
    }),
    [
      FilterByName,
      planetsFilterName,
      planets,
      isLoading,
      typeOfFilter,
      operator,
      valueFilter,
      arrayData,
      collum,
      sort,
    ],
  );

  Provider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}

export default Provider;
