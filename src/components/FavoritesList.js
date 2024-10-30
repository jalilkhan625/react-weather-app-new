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
    return sortOrder === 'asc' ? a.temperature - b.temperature : b.temperature - a.temperature;
  });

  return (
    <div>
      <button onClick={sortFavoritesByTemperature} className="btn btn-outline-primary mb-3 mt-3">
        <FontAwesomeIcon icon={faSort} className="me-2" />
        Sort by Temperature
      </button>
      <div className="row">
        {sortedFavorites.map(city => (
          <div key={city.name} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{city.name}</h5>
                <p className="card-text">
                  Temperature: {city.temperature}°C<br />
                  Weather: {city.condition}<br />
                  Humidity: {city.humidity}%<br />
                  Wind Speed: {city.windSpeed} km/h
                </p>
                <div className="mt-auto text-end"> {/* Added classes for alignment */}
                  <button className="btn btn-danger" onClick={() => removeCityFromFavorites(city.name)}>
                    <FontAwesomeIcon icon={faTrash} className="me-2" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
