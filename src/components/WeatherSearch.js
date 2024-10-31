import React, { useState } from 'react';
import './WeatherSearch.css';

const WeatherSearch = ({ fetchWeatherData }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city) {
      fetchWeatherData(city);
    } else {
      alert('Per favore, inserisci un nome di città.'); // Alert message in Italian
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 col-lg-4"> {/* Adjust the column size as needed */}
        <div className="input-group mb-3">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="form-control search-input"
            placeholder="Inserisci il nome di una città" // Placeholder in Italian
          />
          <button onClick={handleSearch} className="btn btn-primary search-button">
            Cerca {/* Button text in Italian */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherSearch;
