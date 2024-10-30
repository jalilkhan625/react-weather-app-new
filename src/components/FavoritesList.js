import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faTrash } from '@fortawesome/free-solid-svg-icons';

const FavoritesList = ({ favorites, removeCityFromFavorites }) => {
  const [sortOrder, setSortOrder] = useState('asc'); // Initialize sort order state

  const sortFavoritesByTemperature = () => {
    // Toggle between ascending and descending sort order
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Sort favorites based on current sort order
  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.temperature - b.temperature; // Sort by ascending temperature
    } else {
      return b.temperature - a.temperature; // Sort by descending temperature
    }
  });

  return (
    <div>
      <button onClick={sortFavoritesByTemperature} className="btn btn-outline-primary mb-3">
        <FontAwesomeIcon icon={faSort} className="me-2" />
        Sort by Temperature
      </button>
      <div className="row">
        {sortedFavorites.map(city => (
          <div key={city.name} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{city.name}</h5>
                <p className="card-text">
                  Temperature: {city.temperature}°C<br />
                  Weather: {city.condition}
                </p>
                <button className="btn btn-danger" onClick={() => removeCityFromFavorites(city.name)}>
                  <FontAwesomeIcon icon={faTrash} className="me-2" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
