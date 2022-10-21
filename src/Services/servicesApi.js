const STAR_WARS_API = 'https://swapi.dev/api/planets';

const getPlantesStarwars = async () => {
  const response = await fetch(STAR_WARS_API);
  const json = await response.json();
  return response.ok && Promise.resolve(json);
};

export default getPlantesStarwars;
