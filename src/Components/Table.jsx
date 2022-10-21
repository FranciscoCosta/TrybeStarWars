import React, { useContext } from 'react';
import { Context } from '../Context/Context';
import Loading from './Loading';

function Table() {
  const { isLoading, planetsFilterName } = useContext(Context);
  if (isLoading) return <Loading />;
  return (
    <div className="Display">
      <table data-testid="tabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {(!isLoading) && planetsFilterName.map((planet) => (
            <tr
              key={ planet.name }
            >
              <td className="td" data-testid="planet-name">
                { planet.name }
              </td>
              <td className="cell">{ planet.rotation_period }</td>
              <td className="cell">{ planet.orbital_period }</td>
              <td className="cell">{ planet.diameter }</td>
              <td className="cell">{ planet.climate }</td>
              <td className="cell">{ planet.gravity }</td>
              <td className="cell">{ planet.terrain }</td>
              <td className="cell">{ planet.surface_water }</td>
              <td className="cell">{ planet.population }</td>
              <td className="cell-films">
                {planet.films.map((url) => (
                  <span key={ url }>
                    <a href={ url }>{url }</a>
                  </span>
                ))}
              </td>
              <td className="cell">{ planet.created }</td>
              <td className="cell">{ planet.edited }</td>
              <td className="cell-planetUrl">
                <a href={ planet.url }>{ planet.url }</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
