import React from 'react';

const FavoritesList = ({ favorites, removeCityFromFavorites, sortFavoritesByTemperature }) => {
  return (
    <div>
      <button onClick={sortFavoritesByTemperature} className="btn btn-outline-primary mb-3">Sort by Temperature</button>
      <ul className="list-group">
        {favorites.map(city => (
          <li key={city.name} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{city.name}</strong><br />
              Temperature: {city.temperature}°C, Weather: {city.condition}
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => removeCityFromFavorites(city.name)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
